import { FETCH_USER_SONGS, AUTHENTICATE_USER, SETUP_MUSICKIT, PLAY_SONG } from './types';
import { developerToken } from '../private.js'
import { LOADINGSTATES } from '../consts';
import { createAlert } from './pageActions';

/**
 * Takes in an array of song items to set the queue to, and then plays at the index.
 * If the songItems is not passed it will assume the queue is already set.
 * @param {Number} atIndex // Required
 * @param {Array[SongItem]} songItems // Optional array of song items, an error will occur if the queue is not set and you don't privde this.
 * @param {Boolean} nextSongOnError // Optional Advance to next song on error
 */
export const playSong = (atIndex, songItems, nextSongOnError) => dispatch => {
    var musicKitInstance = window.MusicKit.getInstance();

    console.log(musicKitInstance.player.queue.nextPlayableItem ? musicKitInstance.player.queue.nextPlayableItem.attributes.name : "");
    let changeIndex = () => {

        try {
            musicKitInstance.player.changeToMediaAtIndex(atIndex).then(() => {
                dispatch({
                    type: PLAY_SONG,
                })
            }).catch((error) => {

                let songName = songItems ? songItems[atIndex].attributes.name : "";

                dispatch(createAlert({
                    message: "Error occured while trying to play \"" + songName + "\":",
                    description: error.description,
                    type: "error",
                    closable: true
                }));

                if (nextSongOnError) {
                    atIndex++;
                    sQ();
                } else {
                    dispatch({
                        type: PLAY_SONG,
                    })
                }
            })
        } catch (error) {
            console.log(error)
        }

    }

    // Create this as a function, incase of error it can be called again.
    let sQ = () => {
        // If no songItems provided, just go straight to changing the index
        if (!songItems) {
            changeIndex()
            return;
        };
        musicKitInstance.setQueue(songItems)
            .then(() => {
                changeIndex();
            })
            .catch((error) => {
                dispatch({
                    type: PLAY_SONG,
                })
                dispatch(createAlert({
                    message: "Error occured while trying to set the queue",
                    description: error.description,
                    type: "error",
                    closable: true
                }))
            })
    }

    sQ();


}

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
                    dispatch({
                        type: FETCH_USER_SONGS,
                        payload: songArray,
                        loadingState: LOADINGSTATES.LOADEDPARTIAL
                    })
                } else {

                    dispatch({
                        type: FETCH_USER_SONGS,
                        payload: songArray,
                        loadingState: LOADINGSTATES.LOADED
                    })
                }
            }).catch((e) => {
                window.MusicKit.getInstance().unauthorize();
                window.location.reload();
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