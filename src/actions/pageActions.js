import { UPDATE_PAGE, CREATE_ALERT, DISMISS_ALERT, UPDATE_SUBPAGE, UPDATE_SUB_PAGE_ROUTE} from './types';

export const updatePage = (pageEnum) => dispatch => {
    dispatch({
        type: UPDATE_PAGE,
        payload: pageEnum,
    });
}

export const updateSubPage = (subPageEnum) => dispatch => {
    dispatch({
        type: UPDATE_SUBPAGE,
        payload: subPageEnum,
    });
}

/**
 * 
 * @param {Array[Object]} NewRouteArray Pass the new route array.
 */
export const updateSubPageRouting = (NewRouteArray) => dispatch => {
    dispatch({
        type: UPDATE_SUB_PAGE_ROUTE,
        payload: NewRouteArray,
    });
}

export const createAlert = (props) => dispatch => {
    dispatch({
        type: CREATE_ALERT,
        payload: props,
        showAlert: true
    });
}

export const dismissAlert = (props) => dispatch => {
    dispatch({
        type: DISMISS_ALERT,
        showAlert: false
    })
}