import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers/';
import { PAGENAMES, LOADINGSTATES } from './consts';

const initialState = {
    page: { currentPage: PAGENAMES.LIBRARY },
    library : {isAuthenticated : false, musicKitInstance: {}, loadingState: LOADINGSTATES.LOADING, musicKitLoaded: false}
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
