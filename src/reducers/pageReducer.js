import { UPDATE_PAGE, DISMISS_ALERT, CREATE_ALERT } from '../actions/types';

const initialState = {
    currentPage: {},
    showAlert:false
}

export default (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_PAGE:
            return {
                ...state,
                currentPage: action.payload
            }
        case CREATE_ALERT:
            return {
                ...state,
                showAlert: action.showAlert,
                alertProps: action.payload
            }
        case DISMISS_ALERT:
            return {
                ...state,
                showAlert: action.showAlert,
            }
        default:
            return state;
    }
}