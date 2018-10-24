import { UPDATE_PAGE } from './types';

export const updatePage = (pageEnum) => dispatch => {
    dispatch({
        type: UPDATE_PAGE,
        payload: pageEnum,
    });
}