import { FETCH_CURRENT_USER_SONGS, SETUP_MUSICKIT } from '../actions/types';

const initialState = {
    isAuthenticated : false,
    musicKitInstance : null,
}

export default (state = initialState, action) => {
    switch(action.type){
        case SETUP_MUSICKIT:
            return {
                ...state,
                isAuthenticated: action.isAuthenticated,
                musicKitInstance: action.musicKitInstance
            }
        default: 
            return state;
    }
}