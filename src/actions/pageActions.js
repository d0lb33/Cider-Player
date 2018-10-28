import { UPDATE_PAGE, CREATE_ALERT, DISMISS_ALERT} from './types';

export const updatePage = (pageEnum) => dispatch => {
    dispatch({
        type: UPDATE_PAGE,
        payload: pageEnum,
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