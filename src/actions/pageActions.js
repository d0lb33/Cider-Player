import { UPDATE_PAGE, CREATE_ALERT, DISMISS_ALERT, UPDATE_SUBPAGE} from './types';

export const updatePage = (pageEnum) => dispatch => {
    dispatch({
        type: UPDATE_PAGE,
        payload: pageEnum,
    });
}

export const updateSubPage = (subPageEnum) => dispatch => {
    console.log(subPageEnum)
    dispatch({
        type: UPDATE_SUBPAGE,
        payload: subPageEnum,
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