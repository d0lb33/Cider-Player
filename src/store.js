import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers/';
import { PAGENAMES, LOADINGSTATES, SUBPAGENAMES } from './consts';

/**
 * Routes for the subpage will exist in the following format: 
 *
 * Array of objects
 * [{component : <Component>, scrollY: scrollY},{},{}]
 *
 * Each object a route.
 * The last object in the array is the current viewable thing.
 * 
 * Example:
 * [{component : PlaylistsView, scrollY: 100}]
 * A back button should be displayed that is going to go to the songsview and then one to go to the playlistsview.
 * 
 * If there is more then one item in
 */

const initialState = {
    page: { currentPage: PAGENAMES.SEARCH, subPageRouting: [{page : SUBPAGENAMES.SONGS, viewName: "Songs"}], currentSubPage: SUBPAGENAMES.SONGS, showAlert: false },
    library: { isAuthenticated: false, musicKitInstance: {}, loadingState: LOADINGSTATES.LOADING, playlistLoadingState: LOADINGSTATES.LOADING, musicKitLoaded: false }
};

const middleWare = [thunk];

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
    rootReducer,
    initialState,
    composeEnhancers(
        applyMiddleware(...middleWare)
    )
);

export default store;
