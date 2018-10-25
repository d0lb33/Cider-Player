import { FETCH_USER_SONGS, AUTHENTICATE_USER, SETUP_MUSICKIT } from './types';
import { developerToken } from '../private.js'
import { LOADINGSTATES } from '../consts';

export const fetchUserSongs = () => dispatch => {
    var musicKitInstance = window.MusicKit.getInstance();

    let offset = 0;
    let songArray = [];
    // FIGURE THIS OUT
    let getSongs = () => {
        if (musicKitInstance.api.library) {
            musicKitInstance.api.library.songs(null, {offset : offset, limit:100}).then((songs) => {
                songArray = songArray.concat(songs);
                if (songs.length !== 0){
                    offset += 100
                    getSongs();
                    dispatch({
                        type: FETCH_USER_SONGS,
                        payload: songArray,
                        loadingState: LOADINGSTATES.LOADEDPARTIAL
                    })
                }else {
                    dispatch({
                        type: FETCH_USER_SONGS,
                        payload: songArray,
                        loadingState: LOADINGSTATES.LOADED
                    })
                }
            });
        }else {
            getSongs();
        }
        
    }
    getSongs();
}

export const authenticateUser = () => dispatch => {
    
    var musicKitInstance = window.MusicKit.getInstance();
    musicKitInstance.authorize();
    musicKitInstance.addEventListener("authorizationStatusDidChange", (e) => {
        console.log("Authorization Status: " + e);
        if (e.authorizationStatus === 3) {
            dispatch({
                type: AUTHENTICATE_USER,
                isAuthenticated: musicKitInstance.isAuthorized,
                musicKitInstance: musicKitInstance
            })
        }
    });
}

export const setupMusicKit = () => dispatch => {
    window.MusicKit.configure({
        developerToken: developerToken,
        app: {
            name: 'Apple Music Web Player',
            build: '0.0.1'
        }
    });

    var musicKitInstance = window.MusicKit.getInstance();
    dispatch({
        type: SETUP_MUSICKIT,
        isAuthenticated: musicKitInstance.isAuthorized,
        musicKitInstance: musicKitInstance
    })
}