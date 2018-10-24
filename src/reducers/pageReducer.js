import { UPDATE_PAGE } from '../actions/types';

const initialState = {
    currentPage : {},
}

export default (state = initialState, action) => {
    switch(action.type){
        case UPDATE_PAGE:
            return {
                ...state,
                currentPage: action.payload
            }
        default: 
            return state;
    }
}