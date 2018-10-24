import { FETCH_CURRENT_USER_SONGS, AUTHENTICATE_USER } from '../actions/types';

const initialState = {
    isAuthenticated : false,
}

export default (state = initialState, action) => {
    switch(action.type){
        default: 
            return state;
    }
}