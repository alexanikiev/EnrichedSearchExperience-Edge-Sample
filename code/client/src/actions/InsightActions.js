import { READ_INSIGHTS_LOADING, READ_INSIGHTS_SUCCESS, READ_INSIGHTS_FAILURE } from './Types';

export const readInsights = (force) => (dispatch, getState) => {
    var items = getState().insights.items;
    var timestamp = getState().insights.timestamp;
    var currenttimestamp = new Date().getTime();//refresh every 25 seconds, for example
    if (items && items.length > 0 && force !== true && timestamp !== 0 && timestamp + 25*1000 >= currenttimestamp) {
        dispatch({
            type: READ_INSIGHTS_SUCCESS,
            payload: { items: items, timestamp: currenttimestamp }
        });
    }
    else {
        dispatch({
            type: READ_INSIGHTS_LOADING
        });

        fetch(`http://${window.location.hostname}:30990/mongo/insights`)
        .then(response => response.json())
        .then(data => {
            var insights = [];
            for (var i = 0; i < data.length; i++) {
                var insight = data[i];
                insights.push({ id: insight.id, 
                                name: insight.name, 
                                description: insight.description,
                                notes: insight.notes,  
                                tags: insight.tags, 
                                hierarchies: insight.hierarchies });
            }
            return dispatch({
                type: READ_INSIGHTS_SUCCESS,
                payload: { items: insights, timestamp: currenttimestamp }
            });
        })
        .catch(error => {
            dispatch({
                type: READ_INSIGHTS_FAILURE,
                error: error
            });
        });
    }
}