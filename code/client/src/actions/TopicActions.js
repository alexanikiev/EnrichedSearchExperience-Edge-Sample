import { READ_TOPICS_LOADING, READ_TOPICS_SUCCESS, READ_TOPICS_FAILURE } from './Types';

export const readTopics = (force) => (dispatch, getState) => {
    var items = getState().topics.items;
    var timestamp = getState().topics.timestamp;
    var currenttimestamp = new Date().getTime();//refresh every 25 seconds, for example
    if (items && items.length > 0 && force !== true && timestamp !== 0 && timestamp + 25*1000 >= currenttimestamp) {
        dispatch({
            type: READ_TOPICS_SUCCESS,
            payload: { items: items, timestamp: currenttimestamp }
        });
    }
    else {
        dispatch({
            type: READ_TOPICS_LOADING
        });

        fetch(`http://${window.location.hostname}:30990/mongo/topics`)
        .then(response => response.json())
        .then(data => {
            var topics = [];
            for (var i = 0; i < data.length; i++) {
                var topic = data[i];
                topics.push({ id: topic.id, 
                              name: topic.name, 
                              description: topic.description, 
                              tags: topic.tags, 
                              hierarchies: topic.hierarchies });
            }
            return dispatch({
                type: READ_TOPICS_SUCCESS,
                payload: { items: topics, timestamp: currenttimestamp }
            });
        })
        .catch(error => {
            dispatch({
                type: READ_TOPICS_FAILURE,
                error: error
            });
        });
    }
}