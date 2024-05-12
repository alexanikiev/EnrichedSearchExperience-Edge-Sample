import { READ_USERS_LOADING, READ_USERS_SUCCESS, READ_USERS_FAILURE } from '../actions/Types';

const initialState = {
    loading: false,
    items: [],
    error: null,
    timestamp: 0
};

export default function(state = initialState, action) {
    switch(action.type) {
        case READ_USERS_LOADING: 
            return {
                ...state,
                loading: true,
                items: [],
                error: null
            };
        case READ_USERS_SUCCESS:
            return {
                ...state,
                loading: false,
                items: action.payload.items,
                error: null,
                timestamp: action.payload.timestamp
            };
        case READ_USERS_FAILURE:
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