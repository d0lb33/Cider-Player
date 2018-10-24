import { FETCH_CURRENT_USER_SONGS, AUTHENTICATE_USER } from './types';
import store from '../store';

export const fetchCurrentUserSongs = () => dispatch => {
    fetch('')
        .then(res => res.json())
        .then(posts => dispatch({
            type: FETCH_CURRENT_USER_SONGS,
            payload: posts,
        }));
}

export const authenticateUser = () => dispatch => {

}