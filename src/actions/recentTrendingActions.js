import { GET_RECENTLY_SEARCHED_ITEMS, CLEAR_RECENTLY_SEARCHED_ITEMS, ADD_RECENTLY_SEARCHED_ITEM } from '../actions/types';


/**
 * Returns the recently search items of the user from localstorage
 */
export const getRecentlySearchedItems = () => dispatch => {
    try {
        let items = localStorage.getItem("searchItems");
        if (items === null) {
            dispatch({
                type: GET_RECENTLY_SEARCHED_ITEMS,
                payload: [],
            });
        } else {
            dispatch({
                type: GET_RECENTLY_SEARCHED_ITEMS,
                payload: JSON.parse(items),
            });
        }
    } catch (error) {
        // parsing error, return an empty array
        console.log("Error collecting recently searched items! Here is what we know:");
        console.log(error)
        dispatch({
            type: GET_RECENTLY_SEARCHED_ITEMS,
            payload: [],
        });
    }
}
/**
 * Adds a recently searched item to the localstorage array and updates the UI
 * @param {String} item The string you want to add to the search history list
 */
export const addRecentlySearchedItem = (item) => dispatch => {
    if (item === null || item === ""){
        dispatch({
            type: GET_RECENTLY_SEARCHED_ITEMS,
            payload: null,
        });
    } 

    dispatch({
        type : ADD_RECENTLY_SEARCHED_ITEM,
        payload : item
    })
     
}

export const clearRecentlySearchedItems = () => dispatch => {
    localStorage.removeItem("searchItems");
    dispatch({
        type : CLEAR_RECENTLY_SEARCHED_ITEMS,
    })
}