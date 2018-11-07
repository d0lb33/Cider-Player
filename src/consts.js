export const PAGENAMES = {
    LIBRARY : 0,
    FOR_YOU : 1,
    BROWSE : 2,
    RADIO : 3,
    SEARCH : 4
}

export const SUBPAGENAMES = {
    SONGS : 0,
    PLAYLISTS : 1,
    ALBUMS : 2,
    ARTISTS: 3,
}

export const LOADINGSTATES = {
    LOADINGERROR : 0,
    LOADING : 1,
    LOADEDPARTIAL : 2,
    LOADED : 3,
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

/**
 * Removes the {w} and {h} property and replaces them with valid height and widths
 * @param {String} src // Image src from apple media item 
 * @param {Number} h // Image height
 * @param {Number} w // Image width
 */
export function formatImgSrc(src, h, w) {
    src = src.replace("{w}", w);
    src = src.replace("{h}", h);
    return src;
}