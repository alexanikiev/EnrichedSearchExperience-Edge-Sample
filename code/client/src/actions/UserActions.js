import { READ_USERS_LOADING, READ_USERS_SUCCESS, READ_USERS_FAILURE } from './Types';

export const readUsers = (force) => (dispatch, getState) => {
    var items = getState().users.items;
    var timestamp = getState().users.timestamp;
    var currenttimestamp = new Date().getTime();//refresh every 25 seconds, for example
    if (items && items.length > 0 && force !== true && timestamp !== 0 && timestamp + 25*1000 >= currenttimestamp) {
        dispatch({
            type: READ_USERS_SUCCESS,
            payload: { items: items, timestamp: currenttimestamp }
        });
    }
    else {
        dispatch({
            type: READ_USERS_LOADING
        });

        fetch(`http://${window.location.hostname}:30990/mongo/users`)
        .then(response => response.json())
        .then(data => {
            var users = [];
            for (var i = 0; i < data.length; i++) {
                var user = data[i];
                users.push({ _id: user._id, 
                             id: user.id, 
                             name: user.name, 
                             description: user.description, 
                             settings: user.settings });
            }
            return dispatch({
                type: READ_USERS_SUCCESS,
                payload: { items: users, timestamp: currenttimestamp }
            });
        })
        .catch(error => {
            dispatch({
                type: READ_USERS_FAILURE,
                error: error
            });
        });
    }
}