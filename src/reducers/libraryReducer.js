import { SETUP_MUSICKIT, AUTHENTICATE_USER, FETCH_USER_SONGS, PLAY_SONG, FETCH_USER_PLAYLISTS, FETCH_PLAYLIST_SONGS, SET_SONGS_IN_VIEW, SONG_LOADING_CHECKER } from '../actions/types';
import { LOADINGSTATES } from '../consts';

const initialState = {
    isAuthenticated: false,
    musicKitInstance: null,
    loadingState: LOADINGSTATES.LOADING,
    playlistLoadingState: LOADINGSTATES.LOADING,
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
                librarySongs: action.payload,
                loadingState: action.loadingState
            }
        case FETCH_USER_PLAYLISTS:
            return {
                ...state,
                playlists: action.payload,
                playlistLoadingState: action.playlistLoadingState
            }
        case FETCH_PLAYLIST_SONGS:
            return {
                ...state,
                playlistSongs: action.playlistSongs,
            }
        case SET_SONGS_IN_VIEW:
            return {
                ...state,
                songs: action.songs,
            }
        case SONG_LOADING_CHECKER:
            return {
                ...state,
            }
        default:
            return state;
    }
}