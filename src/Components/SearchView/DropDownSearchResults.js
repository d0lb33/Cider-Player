import React, { Component } from 'react'
import { connect } from 'react-redux';
import CellItem from '../CellItem';
import { addRecentlySearchedItem } from '../../actions/recentTrendingActions';


var titleStyle = {
    fontSize: "1.2em",
    fontWeight: "bold",
    color: "black"
}

class DropDownSearchResults extends Component {

    /**
     * Returns a JSX object with suggested terms
     */
    generateSuggestedTerms = () => {
        if (this.props.searchHints.length > 0) {
            var hintCellArray = [];
            hintCellArray.push(<div key="TITLE KEY" style={titleStyle}>Suggested:</div>);
            this.props.searchHints.forEach((hint, i) => {
                hintCellArray.push(<div onClick={() => {this.cellItemClicked(hint, "hint")}} key={i + hint} style={{ cursor: "pointer", fontSize : "1.1em" }}>{hint}</div>)
            });
            return hintCellArray
        }
    }

    /**
     * Returns a JSX object with songs
     */
    generateSongResults = () => {
        if(this.props.searchResults.songs !== undefined){
            var songCellArray = [];
            songCellArray.push(<div key="SONG TITLE KEY" style={titleStyle}>Songs:</div>)
            this.props.searchResults.songs.data.forEach((data, i) => {
                var song = data.attributes
                songCellArray.push(
                    <CellItem 
                        key={i + song.name} 
                        firstCol={song.name} 
                        secondCol={song.artistName}
                        thirdCol={song.albumName}
                        imgSrc={song.artwork.url}
                        cellItemClicked={() => {this.cellItemClicked(song, "song")}}
                         />
                    )
            })
            return songCellArray
        }
    }

    /**
     * Returns a JSX object with albums
     */
    generateAlbumResults = () => {
        if(this.props.searchResults.albums !== undefined){
            var albumCellArray = [];
            albumCellArray.push(<div key="ALBUM TITLE KEY" style={titleStyle}>Albums:</div>)
            this.props.searchResults.albums.data.forEach((data, i) => {
                var album = data.attributes
                albumCellArray.push(
                    <CellItem
                        key={i + album.name}
                        firstCol={album.name}
                        secondCol={album.artistName}
                        thirdCol={album.releaseDate.substring(0, 4)}
                        imgSrc={album.artwork.url}
                        cellItemClicked={() => { this.cellItemClicked(album, "album") }}
                    />
                )
            })
            return albumCellArray
        }
    }

    /**
     * Returns a JSX object with artists
     */
    generateArtistResults = () => {
        if(this.props.searchResults.artists !== undefined){
            var artistCellArray = [];
            artistCellArray.push(<div key="ARTIST TITLE KEY" style={titleStyle}>Artists:</div>)
            this.props.searchResults.artists.data.forEach((data, i) => {
                var artist = data.attributes
                console.log(artist)
                artistCellArray.push(
                    //cellItem(artist.name,artist.artistName,null,null,i + artist.name)
                    <CellItem
                        key={i + artist.name}
                        firstCol={artist.name}
                        thirdCol={artist.genreNames ? artist.genreNames[0] : null}
                        cellItemClicked={() => { this.cellItemClicked(artist,"artist") }}
                    />
                    )
            })
            return artistCellArray
        }
    }

    /** 
     * Every search cell item should call this function with the event
     * it wants to trigger. Helps make sure the item is added to the recent
     * search results.
     * @param {object} data The data of the object
     * @param {String} eventType the event youd like to happen
     */
    cellItemClicked = (data, eventType) => {
        switch (eventType) {
            case "song":
                break;
            case "album":
                break;
            case "artist":
                break;
            case "hint":
                break;
            default:
                break;
        }

        if (eventType === "hint"){
            this.props.addRecentlySearchedItem(data)
        }else{
            this.props.addRecentlySearchedItem(this.props.currentSearchTerm)
        }
    }

    

    render() {
        return (
            <div style={{marginTop : "10px"}}>
                {this.generateSuggestedTerms()}
                {this.generateSongResults()}
                {this.generateAlbumResults()}
                {this.generateArtistResults()}
            </div>
        )
    }
}

const mapStateToProps = state => ({
    searchResults: state.library.search.searchResults,
    searchHints: state.library.search.searchHints
});

export default connect(mapStateToProps, {addRecentlySearchedItem})(DropDownSearchResults)