import { READ_HOME_LOADING, READ_HOME_SUCCESS, READ_HOME_FAILURE } from '../actions/Types';

const initialState = {
    loading: false,
    items1: [],
    items2: [],
    error: null,
    timestamp: 0
};

export default function(state = initialState, action) {
    switch(action.type) {
        case READ_HOME_LOADING: 
            return {
                ...state,
                loading: true,
                items1: [],
                items2: [],
                error: null
            };
        case READ_HOME_SUCCESS:
            return {
                ...state,
                loading: false,
                items1: action.payload.items1,
                items2: action.payload.items2,
                error: null,
                timestamp: action.payload.timestamp
            };
        case READ_HOME_FAILURE:
            return {
                ...state,
                loading: false,
                items1: [],
                items2: [],
                error: action.error
            };
        default:
            return state;
    }
}