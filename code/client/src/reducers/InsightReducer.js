import { READ_INSIGHTS_LOADING, READ_INSIGHTS_SUCCESS, READ_INSIGHTS_FAILURE } from '../actions/Types';

const initialState = {
    loading: false,
    items: [],
    error: null,
    timestamp: 0
};

export default function(state = initialState, action) {
    switch(action.type) {
        case READ_INSIGHTS_LOADING: 
            return {
                ...state,
                loading: true,
                items: [],
                error: null
            };
        case READ_INSIGHTS_SUCCESS:
            return {
                ...state,
                loading: false,
                items: action.payload.items,
                error: null,
                timestamp: action.payload.timestamp
            };
        case READ_INSIGHTS_FAILURE:
            return {
                ...state,
                loading: false,
                items: [],
                error: action.error
            };
        default:
            return state;
    }
}