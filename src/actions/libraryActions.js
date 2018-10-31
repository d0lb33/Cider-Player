import { FETCH_USER_SONGS, AUTHENTICATE_USER, SETUP_MUSICKIT } from './types';
import { developerToken } from '../private.js'
import { LOADINGSTATES } from '../consts';

export const fetchUserSongs = () => dispatch => {
    var musicKitInstance = window.MusicKit.getInstance();

    let offset = 0;
    let songArray = [];

    let getSongs = () => {
        if (musicKitInstance.api.library) {
            musicKitInstance.api.library.songs(null, { offset: offset, limit: 100 }).then((songs) => {
                songArray = songArray.concat(songs);
                if (songs.length !== 0) {
                    offset += 100
                    getSongs();
                    musicKitInstance.setQueue(songArray).catch((e) => {console.log("error setting queue")});
                    dispatch({
                        type: FETCH_USER_SONGS,
                        payload: songArray,
                        loadingState: LOADINGSTATES.LOADEDPARTIAL
                    })
                } else {
                    musicKitInstance.setQueue(songArray);
                    
                    /*let sum = 0; These songs will be unplayable on some libraries. AHHHH
                    musicKitInstance.player.queue.items.map((song) => {
                        if (song.isPlayable === undefined) {
                            sum++;
                        }
                    });*/

                    dispatch({
                        type: FETCH_USER_SONGS,
                        payload: songArray,
                        loadingState: LOADINGSTATES.LOADED
                    })
                }
            }).catch((e) => {
                console.log("I Caught A Bug Gee");
                console.log(e)
            });
        } else {
            getSongs();
        }

    }
    getSongs();
}

export const authenticateUser = () => dispatch => {
    var musicKitInstance = window.MusicKit.getInstance();
    musicKitInstance.authorize();
    musicKitInstance.addEventListener("authorizationStatusDidChange", (e) => {
        if (e.authorizationStatus === 3) {

            // Sometimes the state update happens to fast and everything else wants to use musicKit before its loading.
            let libraryCheck = setTimeout(() => {
                clearInterval(libraryCheck);
                dispatch({
                    type: AUTHENTICATE_USER,
                    isAuthenticated: musicKitInstance.isAuthorized,
                    musicKitInstance: musicKitInstance
                })
            }, 100)

        }
    });
}

export const setupMusicKit = () => dispatch => {
    let loadedEvent = () => {
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
            musicKitInstance: musicKitInstance,
            musicKitLoaded: true
        })
    }

    if (window.MusicKit) {
        //call action
        loadedEvent();
    } else {
        document.addEventListener('musickitloaded', () => {
            loadedEvent();
        });
    }


}