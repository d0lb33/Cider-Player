import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers/';
import { PAGENAMES } from './consts';

const initialState = {
    page: { currentPage: PAGENAMES.LIBRARY },
    library : {isAuthenticated : false, musicKitInstance: {}}
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
