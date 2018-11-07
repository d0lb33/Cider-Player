import { SETUP_MUSICKIT, AUTHENTICATE_USER, FETCH_USER_SONGS, PLAY_SONG, } from '../actions/types';
import { LOADINGSTATES } from '../consts';

const initialState = {
    isAuthenticated: false,
    musicKitInstance: null,
    loadingState: LOADINGSTATES.LOADING,
    musicKitLoaded: false,
}

export default (state = initialState, action) => {
    switch (action.type) {
        case SETUP_MUSICKIT:
            return {
                ...state,
                isAuthenticated: action.isAuthenticated,
                musicKitInstance: action.musicKitInstance,
                musicKitLoaded: action.musicKitLoaded

            }
        case AUTHENTICATE_USER:
            return {
                ...state,
                isAuthenticated: action.isAuthenticated,
                musicKitInstance: action.musicKitInstance
            }
        case PLAY_SONG:
            return {
                ...state
            }
        case FETCH_USER_SONGS:
            return {
                ...state,
                songs: action.payload,
                loadingState: action.loadingState
            }
        default:
            return state;
    }
}