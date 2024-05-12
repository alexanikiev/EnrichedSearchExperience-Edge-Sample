import { READ_DOCSEARCHRESULTS_LOADING, READ_DOCSEARCHRESULTS_SUCCESS, READ_DOCSEARCHRESULTS_FAILURE } from '../actions/Types';

const initialState = {
    loading: false,
    query: '',
    collections: [],
    tags: [],
    items: [],
    error: null,
    timestamp: 0
};

export default function(state = initialState, action) {
    switch(action.type) {
        case READ_DOCSEARCHRESULTS_LOADING: 
            return {
                ...state,
                loading: true,
                query: '',
                collections: [],
                tags: [],
                items: [],
                error: null
            };
        case READ_DOCSEARCHRESULTS_SUCCESS:
            return {
                ...state,
                loading: false,
                query: action.payload.query,
                collections: action.payload.collections,
                tags: action.payload.tags,
                items: action.payload.items,
                error: null,
                timestamp: action.payload.timestamp
            };
        case READ_DOCSEARCHRESULTS_FAILURE:
            return {
                ...state,
                loading: false,
                query: '',
                collections: [],
                tags: [],
                items: [],
                error: action.error
            };
        default:
            return state;
    }
}