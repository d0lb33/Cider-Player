import { GET_RECENTLY_SEARCHED_ITEMS, CLEAR_RECENTLY_SEARCHED_ITEMS, ADD_RECENTLY_SEARCHED_ITEM } from '../actions/types';

const initialState = {
    recentlySearchedTerms: [],
    trendingTerms: []
}

export default (state = initialState, action) => {
    switch (action.type) {
        case GET_RECENTLY_SEARCHED_ITEMS:
            return {
                ...state,
                recentlySearchedTerms: action.payload
            }
        case CLEAR_RECENTLY_SEARCHED_ITEMS:
            return {
                ...state,
                recentlySearchedTerms: []
            }
        case ADD_RECENTLY_SEARCHED_ITEM:
            let searchItemArray = state.recentlySearchedTerms;
            searchItemArray.push(action.payload);
            // TODO: check if there are more then 5 items in this array
            localStorage.setItem("searchItems", JSON.stringify(searchItemArray));
            return {
                ...state,
                recentlySearchedTerms : searchItemArray
            }
        default:
            return state;
    }
}