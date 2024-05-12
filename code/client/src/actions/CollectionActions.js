import { READ_COLLECTIONS_LOADING, READ_COLLECTIONS_SUCCESS, READ_COLLECTIONS_FAILURE } from './Types';

export const readCollections = (force) => (dispatch, getState) => {
    var items = getState().collections.items;
    var timestamp = getState().collections.timestamp;
    var currenttimestamp = new Date().getTime();//refresh every 25 seconds, for example
    if (items && items.length > 0 && force !== true && timestamp !== 0 && timestamp + 25*1000 >= currenttimestamp) {
        dispatch({
            type: READ_COLLECTIONS_SUCCESS,
            payload: { items: items, timestamp: currenttimestamp }
        });
    }
    else {
        dispatch({
            type: READ_COLLECTIONS_LOADING
        });

        fetch(`http://${window.location.hostname}:30990/mongo/collections`)
        .then(res => res.json())
        .then(data => {
            var collections = [];
            for (var i = 0; i<data.length; i++) {
                var collection = data[i];
                collections.push({ id: collection.id,
                                   name: collection.name, 
                                   description: collection.description });
            }
            return dispatch({
                type: READ_COLLECTIONS_SUCCESS,
                payload: { items: collections, timestamp: currenttimestamp }
            });
        })
        .catch(error => {
            dispatch({
                type: READ_COLLECTIONS_FAILURE,
                error: error
            });
        });
    }
}