import { combineReducers } from 'redux';
import pageReducer from './pageReducer';
import libraryReducer from './libraryReducer'

export default combineReducers({
    page : pageReducer,
    library : libraryReducer,
})