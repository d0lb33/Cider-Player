import { FETCH_USER_SONGS, AUTHENTICATE_USER, SETUP_MUSICKIT, PLAY_SONG, FETCH_USER_PLAYLISTS, FETCH_PLAYLIST_SONGS, SET_SONGS_IN_VIEW, SONG_LOADING_CHECKER, FETCH_SEARCH_RESULTS } from './types';
import { developerToken } from '../private.js'
import { LOADINGSTATES } from '../consts';
import { createAlert } from './pageActions';

export const setupMusicKit = () => dispatch => {
    let loadedEvent = () => {
        window.MusicKit.configure({
            developerToken: developerToken,
            app: {
                name: 'Cider Player',
                build: '0.0.1'
            },
            storefrontId: "us"
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

/**
 * Takes in an array of song items to set the queue to, and then plays at the index.
 * If the songItems is not passed it will assume the queue is already set.
 * @param {Number} atIndex // the index of the queue to play a song at, set to -1 if playing a songlist as shuffled 
 * @param {Array[SongItem]} songItems // array of song items, an error will occur if the queue is not set and you don't privde this or if the queue is shuffled. 
 * @param {Boolean} nextSongOnError // Optional: Advance to next song on error
 */
export const playSong = (atIndex, songItems, nextSongOnError) => dispatch => {
    var musicKitInstance = window.MusicKit.getInstance();

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

                // If the queue is shuffled, then the index of the song we want to play is going to be different
                if (musicKitInstance.player.shuffleMode === 1 && atIndex !== -1) {
                    // Find the index of the song we want to play, in the shuffled songs
                    for (let i = 0; i < musicKitInstance.player.queue.items.length; i++) {
                        if (musicKitInstance.player.queue.items[i].id === songItems[atIndex].id) {
                            atIndex = i;
                            break;
                        }
                    }
                } else if (atIndex === -1) {
                    atIndex = 0;
                }

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

/**
 * Keep MusicKit in check and make sures users dont experience a stall.
 * @param {Numver} songID Provide the id of the song you wish to make sure is playing
 * @param {Number} atIndex Provide the index at which this song is located
 * If the songID provided is located in the nowPlayingItem slot of MusicKitJS and its playback
 * state is waiting, we will assume that MusicKitJS goofed and the song needs to be reloaded.
 */
export const songLoadingChecker = (songID, atIndex, ) => dispatch => {

    var musicKitInstance = window.MusicKit.getInstance();
    let timeToWait = 5000; // Wait 5 seconds before checking if song is playing;

    let songChecker = () => setTimeout(() => {
        // Sometimes this is null even when there is an item. Ugh apple. 
        if (!musicKitInstance.player.nowPlayingItem) return;

        // if they arent equal, then the song was changed and we don't need to check for this particular song.
        // Checks if they are still "waiting" or "stalled"
        if (musicKitInstance.player.nowPlayingItem.id === songID && musicKitInstance.player.playbackState === window.MusicKit.PlaybackStates.waiting) {
            console.log("Song stalled on loading, trying again!");

            // Increase time.
            timeToWait += 10000;
            if (timeToWait > 15000) {
                // Assume at this point this song aint playing so lets go to the next one
                dispatch(playSong(atIndex + 1));
            } else {
                // Send the play command again, start another songChecker timer to check this one.
                songChecker();
                dispatch(playSong(atIndex));
            }
        }

        dispatch({
            type: SONG_LOADING_CHECKER
        })
    }, timeToWait);

    songChecker();
}

export const fetchUserPlaylists = () => dispatch => {
    var musicKitInstance = window.MusicKit.getInstance();

    let offset = 0;
    let playlistArray = [];

    let getPlaylists = () => {
        if (musicKitInstance.api.library) {
            musicKitInstance.api.library.playlists(null, { offset: offset, limit: 100 }).then((playlists) => {
                playlistArray = playlistArray.concat(playlists);

                if (playlists.length !== 0) {
                    offset += 100
                    getPlaylists();
                    dispatch({
                        type: FETCH_USER_PLAYLISTS,
                        payload: playlistArray,
                        playlistLoadingState: LOADINGSTATES.LOADEDPARTIAL
                    })
                } else {
                    dispatch({
                        type: FETCH_USER_PLAYLISTS,
                        payload: playlistArray,
                        playlistLoadingState: LOADINGSTATES.LOADED
                    })
                }
            }).catch(() => {
                window.MusicKit.getInstance().unauthorize();
                window.location.reload();
            });
        } else {
            getPlaylists();
        }
    }
    getPlaylists();


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
            }).catch(() => {
                /**
                 * TODO: Shouldn't log out user here!
                 */
                window.MusicKit.getInstance().unauthorize();
                window.location.reload();
            });
        } else {
            getSongs();
        }

    }
    getSongs();
}

/**
 * Fetches the songs in a playlist with the specified id
 * @param {String} playlistID ID of a playlist
 */
export const fetchPlaylistSongs = (playlistID) => dispatch => {
    var musicKitInstance = window.MusicKit.getInstance();
    musicKitInstance.api.library.playlist(playlistID).then((playlist) => {
        dispatch(setSongsInView(playlist.relationships.tracks.data));

        dispatch({
            type: FETCH_PLAYLIST_SONGS,
            playlistSongs: playlist.relationships.tracks.data
        })
    })
}

/**
 * Authenticates the user with the MusicKitJS library
 */
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

/**
 * This sets the songs state that the view reads from. 
 * Update this when you want to change the songs that are currently viewable.
 * @param {Array} songs Array of songs from music kit
 */
export const setSongsInView = (songs) => dispatch => {
    dispatch({
        type: SET_SONGS_IN_VIEW,
        songs: songs,
    })
}

/**
 * Returns search hints, and everything etc.
 * @param {*} searchTerm The search term you'd like to search for 
 */
export const fetchSearchResults = (searchTerm) => dispatch => {
    var musicKitInstance = window.MusicKit.getInstance();
    var storefront = musicKitInstance._apiStorefrontId;
    console.log("Your storefront should be: " + storefront)
    console.log("Your search term will be: " + searchTerm)

    var search = { 
        searchHints : [],
        searchResults : {}
    };

    var headers = new Headers({
        Authorization: "Bearer " + musicKitInstance.developerToken,
        Accept: "application/json",
        "Content-Type": "application/json",
        "Music-User-Token": "" + musicKitInstance.musicUserToken
    });

    fetch(`https://api.music.apple.com/v1/catalog/${storefront}/search/hints?term=${searchTerm}&limit=5`, { headers: headers })
        .then(res => res.json())
        .then(res => {
            if (!res.results) return // CALL ERROR HERE
            search.searchHints = res.results.terms
            dispatch({
                type: FETCH_SEARCH_RESULTS,
                search : search
            })
        })

    fetch(`https://api.music.apple.com/v1/catalog/${storefront}/search?term="${searchTerm}"&limit=5`, { headers: headers })
        .then(res => res.json())
        .then(res => {
            if (!res.results) return // CALL ERROR HERE
            search.searchResults = res.results
            dispatch({
                type: FETCH_SEARCH_RESULTS,
                search: search
            })
        })

    
}