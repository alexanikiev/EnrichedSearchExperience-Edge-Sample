import { READ_VIDEOS_LOADING, READ_VIDEOS_SUCCESS, READ_VIDEOS_FAILURE } from './Types';

export const readVideos = (force) => (dispatch, getState) => {
    var items = getState().videos.items;
    var timestamp = getState().videos.timestamp;
    var currenttimestamp = new Date().getTime();//refresh every 25 seconds, for example
    if (items && items.length > 0 && force !== true && timestamp !== 0 && timestamp + 25*1000 >= currenttimestamp) {
        dispatch({
            type: READ_VIDEOS_SUCCESS,
            payload: { items: items, timestamp: currenttimestamp }
        });
    }
    else {
        dispatch({
            type: READ_VIDEOS_LOADING
        });

        fetch(`http://${window.location.hostname}:30990/mongo/videos`)
        .then(response => response.json())
        .then(data => {
            var videos = [];
            for (var i = 0; i < data.length; i++) {
                var video = data[i];
                videos.push({ id: video.id, 
                                name: video.name, 
                                description: video.description, 
                                tags: video.tags, 
                                collections: video.collections });
            }
            return dispatch({
                type: READ_VIDEOS_SUCCESS,
                payload: { items: videos, timestamp: currenttimestamp }
            });
        })
        .catch(error => {
            dispatch({
                type: READ_VIDEOS_FAILURE,
                error: error
            });
        });
    }
}