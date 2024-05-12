import { READ_HOME_LOADING, READ_HOME_SUCCESS, READ_HOME_FAILURE } from './Types';


export const readHome = (force) => (dispatch, getState) => {
    var items1 = getState().collections.items;
    var items2 = getState().hierarchies.items;
    var timestamp = Math.max(getState().collections.timestamp, getState().hierarchies.timestamp);
    var currenttimestamp = new Date().getTime();//refresh every 25 seconds, for example
    if (items1 && items1.length > 0 && items2 && items2.length > 0 && force !== true && timestamp !== 0 && timestamp + 25*1000 >= currenttimestamp) {
        dispatch({
            type: READ_HOME_SUCCESS,
            payload: { items1, items2, timestamp: currenttimestamp }
        });
    }
    else {
        dispatch({
            type: READ_HOME_LOADING
        });

        items1 = [];
        items2 = [];

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
            items1 = collections;
            return fetch(`http://${window.location.hostname}:30990/mongo/hierarchies`);
        })
        .then(res => res.json())
        .then(data => {
            var hierarchies = [];
            for (var i = 0; i<data.length; i++) {
                var hierarchy = data[i];
                hierarchies.push({ id: hierarchy.id, 
                                   name: hierarchy.name, 
                                   description: hierarchy.description });
            }
            items2 = hierarchies;
            return dispatch({
                type: READ_HOME_SUCCESS,
                payload: { items1, items2, timestamp: currenttimestamp }
            });
        })
        .catch(error => {
            dispatch({
                type: READ_HOME_FAILURE,
                error: error
            });
        });
    }
}