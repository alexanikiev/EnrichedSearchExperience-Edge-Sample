import { READ_TEXTSEARCHRESULTS_LOADING, READ_TEXTSEARCHRESULTS_SUCCESS, READ_TEXTSEARCHRESULTS_FAILURE } from './Types';

export const readTextSearchResults = (search, _collections, _tags) => (dispatch, getState) => {
    var query = getState().textsearchresults.query;
    var collections = getState().textsearchresults.collections;
    var tags = getState().textsearchresults.tags;
    var items = getState().textsearchresults.items;
    var timestamp = getState().textsearchresults.timestamp;
    var currenttimestamp = new Date().getTime();
    var scores = new Map();
    if (search !== '') {
        dispatch({
            type: READ_TEXTSEARCHRESULTS_LOADING
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

                    //result._source.name
                    //result._source.content
                    //result._source.tags
                    //result._source.collections

                    //result.highlight.content

                    results.push(result._source.name);
                    scores.set(result._source.name, result._score);
                }
            }
            return fetch(`http://${window.location.hostname}:30990/sql/search`,
                {
                    method: 'post',
                    body: JSON.stringify({ search: search, 
                                           documents: results,
                                           collections: _collections, 
                                           tags: _tags }),
                    headers: new Headers({
                        "Content-Type": "application/json"
                    })
                }
            );
        })
        .then(response => response.json())
        .then(data => {
            var results = [];
            if (data !== undefined && 
                data.length > 0) {
                for (var i = 0; i < data.length; i++) {
                    var record = data[i];
                    let score = scores.get(record.file);
                    results.push({ id: record.id,
                                   name: record.file, 
                                   description: record.document, 
                                   document: record.document,
                                   file: record.file,  
                                   subject: record.subject,
                                   predicate: record.relation,
                                   object: record.argument,
                                   line: record.line,
                                   collections: [], 
                                   tags: [],
                                   score: score !== undefined ? score : 0 });
                }
            }
            return dispatch({
            type: READ_TEXTSEARCHRESULTS_SUCCESS,
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
                type: READ_TEXTSEARCHRESULTS_FAILURE,
                error: error
            });
        });
    }
    else {
        dispatch({
            type: READ_TEXTSEARCHRESULTS_SUCCESS,
            payload: { query: query, collections: collections, tags: tags, items: items }
        });
    }
}