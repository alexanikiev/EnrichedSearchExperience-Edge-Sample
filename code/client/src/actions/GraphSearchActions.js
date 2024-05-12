import { READ_GRAPHSEARCHRESULTS_LOADING, READ_GRAPHSEARCHRESULTS_SUCCESS, READ_GRAPHSEARCHRESULTS_FAILURE } from './Types';

export const readGraphSearchResults = (search, subjectlen, predicatelen, objectlen, _collections, _tags) => (dispatch, getState) => {
    var query = getState().graphsearchresults.query;
    var collections = getState().graphsearchresults.collections;
    var tags = getState().graphsearchresults.tags;
    var items = getState().graphsearchresults.items;
    var timestamp = getState().graphsearchresults.timestamp;
    var currenttimestamp = new Date().getTime();
    if (search !== '') {
        dispatch({
            type: READ_GRAPHSEARCHRESULTS_LOADING
        });

        fetch(`http://${window.location.hostname}:30990/fuseki/searchpost`,
            {
                method: 'post',
                body: JSON.stringify({ search: search,
                                       subjectlen: subjectlen, 
                                       predicatelen: predicatelen, 
                                       objectlen: objectlen, 
                                       collections: _collections, 
                                       tags: _tags }),
                headers: new Headers({
                    "Content-Type": "application/json"
                })
            }
        )
        .then(response => response.json())
        .then(/*text*/ data => {
            /*
            var data = JSON.parse(text);
            var results = [];
            if (data !== undefined && 
                data.results !== undefined && 
                data.results.bindings !== undefined && 
                data.results.bindings.length > 0) {
                for (var i = 0; i < data.results.bindings.length; i++) {
                    var record = data.results.bindings[i];
                    results.push({ name: "test", 
                                   description: "test", 
                                   subject: record.subject.value,
                                   predicate: record.predicate.value,
                                   object: record.object.value,
                                   linenum: 0,
                                   collections: [], 
                                   tags: [] });
                }
            }
            */
            var results = [];
            if (data !== undefined && data.triples !== undefined && data.triples.length > 0) {
                for (var i = 0; i < data.triples.length; i++) {
                    var record = data.triples[i];
                    results.push({ name: "test", 
                                   description: "test", 
                                   subject: record.subject,
                                   predicate: record.predicate,
                                   object: record.object,
                                   linenum: 0,
                                   collections: [], 
                                   tags: [] });
                }
            }
            return dispatch({
            type: READ_GRAPHSEARCHRESULTS_SUCCESS,
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
                type: READ_GRAPHSEARCHRESULTS_FAILURE,
                error: error
            });
        });
    }
    else {
        dispatch({
            type: READ_GRAPHSEARCHRESULTS_SUCCESS,
            payload: { query: query, collections: collections, tags: tags, items: items }
        });
    }
}