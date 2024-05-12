import { READ_HIERARCHIES_LOADING, READ_HIERARCHIES_SUCCESS, READ_HIERARCHIES_FAILURE } from './Types';

export const readHierarchies = (force) => (dispatch, getState) => {
    var items = getState().hierarchies.items;
    var timestamp = getState().hierarchies.timestamp;
    var currenttimestamp = new Date().getTime();//refresh every 25 seconds, for example
    if (items && items.length > 0 && force !== true && timestamp !== 0 && timestamp + 25*1000 >= currenttimestamp) {
        dispatch({
            type: READ_HIERARCHIES_SUCCESS,
            payload: { items: items, timestamp: currenttimestamp }
        });
    }
    else {
        dispatch({
            type: READ_HIERARCHIES_LOADING
        });

        fetch(`http://${window.location.hostname}:30990/mongo/hierarchies`)
        .then(res => res.json())
        .then(data => {
            var hierarchies = [];
            for (var i = 0; i<data.length; i++) {
                var hierarchy = data[i];
                hierarchies.push({ id: hierarchy.id, 
                                   name: hierarchy.name, 
                                   description: hierarchy.description,
                                   children: hierarchy.children });
            }
            return dispatch({
                type: READ_HIERARCHIES_SUCCESS,
                payload: { items: hierarchies, timestamp: currenttimestamp }
            });
        })
        .catch(error => {
            dispatch({
                type: READ_HIERARCHIES_FAILURE,
                error: error
            });
        });
    }
}