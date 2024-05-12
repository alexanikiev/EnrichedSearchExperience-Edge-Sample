import { READ_DOCUMENTS_LOADING, READ_DOCUMENTS_SUCCESS, READ_DOCUMENTS_FAILURE } from './Types';

export const readDocuments = (force) => (dispatch, getState) => {
    var items = getState().documents.items;
    var timestamp = getState().documents.timestamp;
    var currenttimestamp = new Date().getTime();//refresh every 25 seconds, for example
    if (items && items.length > 0 && force !== true && timestamp !== 0 && timestamp + 25*1000 >= currenttimestamp) {
        dispatch({
            type: READ_DOCUMENTS_SUCCESS,
            payload: { items: items, timestamp: currenttimestamp }
        });
    }
    else {
        dispatch({
            type: READ_DOCUMENTS_LOADING
        });

        fetch(`http://${window.location.hostname}:30990/mongo/documents`)
        .then(response => response.json())
        .then(data => {
            var documents = [];
            for (var i = 0; i<data.length; i++) {
                var document = data[i];
                documents.push({ id: document.id,
                                 name: document.name, 
                                 description: document.description, 
                                 tags: document.tags, 
                                 collections: document.collections });
            }
            return dispatch({
                type: READ_DOCUMENTS_SUCCESS,
                payload: { items: documents, timestamp: currenttimestamp }
            });
        })
        .catch(error => {
            dispatch({
                type: READ_DOCUMENTS_FAILURE,
                error: error
            });
        });
    }
}