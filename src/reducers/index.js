import { combineReducers } from 'redux';
import pageReducer from './pageReducer';
import libraryReducer from './libraryReducer'
import recentTrendingReducer from './recentTrendingReducer';

export default combineReducers({
    page : pageReducer,
    library : libraryReducer,
    recentTrending : recentTrendingReducer
})