export const PAGENAMES = {
    LIBRARY : 0,
    FOR_YOU : 1,
    BROWSE : 2,
    RADIO : 3,
    SEARCH : 4
}

/**
 * Converts a pageID/Number to a name.
 * @param {Number} pageID 
 */
export function getPageName(pageID) {
    switch(pageID){
        case PAGENAMES.LIBRARY: return "Library";
        case PAGENAMES.FOR_YOU: return "For You";
        case PAGENAMES.BROWSE: return "Browse";
        case PAGENAMES.RADIO: return "Radio";
        case PAGENAMES.SEARCH: return "Search";
        default : return "No Known Page Name"
    }
}