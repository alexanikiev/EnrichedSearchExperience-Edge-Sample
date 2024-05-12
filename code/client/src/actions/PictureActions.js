import { READ_PICTURES_LOADING, READ_PICTURES_SUCCESS, READ_PICTURES_FAILURE } from './Types';

export const readPictures = (force) => (dispatch, getState) => {
    var items = getState().pictures.items;
    var timestamp = getState().pictures.timestamp;
    var currenttimestamp = new Date().getTime();//refresh every 25 seconds, for example
    if (items && items.length > 0 && force !== true && timestamp !== 0 && timestamp + 25*1000 >= currenttimestamp) {
        dispatch({
            type: READ_PICTURES_SUCCESS,
            payload: { items: items, timestamp: currenttimestamp }
        });
    }
    else {
        dispatch({
            type: READ_PICTURES_LOADING
        });

        fetch(`http://${window.location.hostname}:30990/mongo/pictures`)
        .then(response => response.json())
        .then(data => {
            var pictures = [];
            for (var i = 0; i < data.length; i++) {
                var picture = data[i];
                pictures.push({ id: picture.id, 
                                name: picture.name, 
                                description: picture.description, 
                                tags: picture.tags, 
                                collections: picture.collections });
            }
            return dispatch({
                type: READ_PICTURES_SUCCESS,
                payload: { items: pictures, timestamp: currenttimestamp }
            });
        })
        .catch(error => {
            dispatch({
                type: READ_PICTURES_FAILURE,
                error: error
            });
        });
    }
}