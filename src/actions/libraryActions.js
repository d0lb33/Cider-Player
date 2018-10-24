import { FETCH_CURRENT_USER_SONGS, AUTHENTICATE_USER, SETUP_MUSICKIT } from './types';
import store from '../store';
import {developerToken} from '../private.js'

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
        

        /*
        this.state.musicKitInstance.addEventListener("authorizationStatusDidChange", (e) => {

            // 3 = User Authorized and good!
            if (e.authorizationStatus === 3) {
                this.state.musicKitInstance.addEventListener("userTokenDidChange", (e) => {
                    // This function will handle when user is logged in and out.
                    this.setState({
                        loggedIn: this.state.musicKitInstance.isAuthorized,
                        loading: false
                    })
                })

            } else if (e.authorizationStatus === 0) {  // 0 = User logged out!
                this.state.musicKitInstance.removeEventListener("userTokenDidChange");
                this.setState({
                    loggedIn: this.state.musicKitInstance.isAuthorized,
                    loading: false
                })
            }
        })*/

}