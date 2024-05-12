import { READ_ENTITIES_LOADING, READ_ENTITIES_SUCCESS, READ_ENTITIES_FAILURE } from './Types';

export const readEntities = (force) => (dispatch, getState) => {
    var items = getState().entities.items;
    var timestamp = getState().entities.timestamp;
    var currenttimestamp = new Date().getTime();//refresh every 25 seconds, for example
    if (items && items.length > 0 && force !== true && timestamp !== 0 && timestamp + 25*1000 >= currenttimestamp) {
        dispatch({
            type: READ_ENTITIES_SUCCESS,
            payload: { items: items, timestamp: currenttimestamp }
        });
    }
    else {
        dispatch({
            type: READ_ENTITIES_LOADING
        });

        fetch(`http://${window.location.hostname}:30990/mongo/entities`)
        .then(response => response.json())
        .then(data => {
            var entities = [];
            for (var i = 0; i < data.length; i++) {
                var entity = data[i];
                entities.push({ id: entity.id, 
                                name: entity.name, 
                                description: entity.description, 
                                tags: entity.tags, 
                                hierarchies: entity.hierarchies });
            }
            return dispatch({
                type: READ_ENTITIES_SUCCESS,
                payload: { items: entities, timestamp: currenttimestamp }
            });
        })
        .catch(error => {
            dispatch({
                type: READ_ENTITIES_FAILURE,
                error: error
            });
        });
    }
}