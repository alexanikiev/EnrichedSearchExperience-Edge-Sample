import { READ_DOCSEARCHRESULTS_LOADING, READ_DOCSEARCHRESULTS_SUCCESS, READ_DOCSEARCHRESULTS_FAILURE } from './Types';

export const readDocSearchResults = (search, _collections, _tags) => (dispatch, getState) => {
    var query = getState().docsearchresults.query;
    var collections = getState().docsearchresults.collections;
    var tags = getState().docsearchresults.tags;
    var items = getState().docsearchresults.items;
    var timestamp = getState().docsearchresults.timestamp;
    var currenttimestamp = new Date().getTime();
    if (search !== '') {
        dispatch({
            type: READ_DOCSEARCHRESULTS_LOADING
        });

        fetch(`http://${window.location.hostname}:30990/elasticsearch/search`,
            {
                method: 'post',
                body: JSON.stringify({ search: search, 
                                       collections: _collections, 
                                       tags: _tags }),
                headers: new Headers({
                    "Content-Type": "application/json"
                })
            }
        )
        .then(response => response.json())
        .then(data => {
            var results = [];
            if (data !== undefined &&  
                data.body !== undefined && 
                data.body.hits !== undefined && 
                data.body.hits.hits !== undefined &&
                data.body.hits.hits.length > 0) {
                for (var i = 0; i < data.body.hits.hits.length; i++) {
                    var result = data.body.hits.hits[i];

                    //result._index = ese
                    //result._type = _doc
                    //result._id
                    //result._score

                    //result._source.id
                    //result._source.name
                    //result._source.content
                    //result._source.tags
                    //result._source.collections

                    //result.highlight.content

                    results.push({ id: result._source.id,
                                   name: result._source.name, 
                                   description: result._source.content,
                                   tags: result._source.tags,
                                   collections: result._source.collections,
                                   highlights: result.highlight.content,
                                   score: result._score });
                }
            }
            return dispatch({
            type: READ_DOCSEARCHRESULTS_SUCCESS,
            payload: { 
                       query: '',
                       collections: ["coll1", "coll2"], 
                       tags: ["tag1", "tag2"], 
                       items: results, 
                       timestamp: currenttimestamp 
                     }
            });
        })
        .catch(error => {
            dispatch({
                type: READ_DOCSEARCHRESULTS_FAILURE,
                error: error
            });
        });
    }
    else {
        dispatch({
            type: READ_DOCSEARCHRESULTS_SUCCESS,
            payload: { query: query, collections: collections, tags: tags, items: items }
        });
    }
}