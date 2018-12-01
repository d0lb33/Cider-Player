import { UPDATE_PAGE, DISMISS_ALERT, CREATE_ALERT, UPDATE_SUBPAGE, UPDATE_SUB_PAGE_ROUTE } from '../actions/types';
import { SUBPAGENAMES } from '../consts';
const initialState = {
    currentPage: {},
    currentSubPage: SUBPAGENAMES.SONGS,
    showAlert: false,
    subPageRouting: [{ page: SUBPAGENAMES.SONGS, viewName: "Songs" }]
}

export default (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_PAGE:
            return {
                ...state,
                currentPage: action.payload
            }
        case UPDATE_SUBPAGE:
            return {
                ...state,
                currentSubPage: action.payload
            }
        case UPDATE_SUB_PAGE_ROUTE:
            return {
                ...state,
                subPageRouting: action.payload
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