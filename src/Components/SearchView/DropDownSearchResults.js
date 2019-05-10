import React, { Component } from 'react'
import { connect } from 'react-redux';
import { formatImgSrc } from '../../consts';
import { Row, Col } from 'antd';


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
            hintCellArray.push(<div style={titleStyle}>Suggested:</div>);
            this.props.searchHints.forEach((hint, i) => {
                hintCellArray.push(<div key={i + hint} style={{ cursor: "pointer", fontSize : "1.1em" }}>{hint}</div>)
            });
            return hintCellArray
        }
    }

    /**
     * Returns a JSX object with songs
     */
    generateSongResults = () => {
        if(this.props.searchResults.songs != undefined){
            var songCellArray = [];
            songCellArray.push(<div style={titleStyle}>Songs:</div>)
            this.props.searchResults.songs.data.forEach((data, i) => {
                var song = data.attributes
                songCellArray.push(this.cellItem(song.name,song.artistName,song.albumName,song.artwork.url,i + song.name))
            })
            return songCellArray
        }
    }

    /**
     * Returns a JSX object with albums
     */
    generateAlbumResults = () => {
        if(this.props.searchResults.albums != undefined){
            var albumCellArray = [];
            albumCellArray.push(<div style={titleStyle}>Albums:</div>)
            this.props.searchResults.albums.data.forEach((data, i) => {
                var album = data.attributes
                albumCellArray.push(this.cellItem(album.name,album.artistName,album.releaseDate.substring(0,4),album.artwork.url,i + album.name))
            })
            return albumCellArray
        }
    }

    /**
     * Returns a JSX object with artists
     */
    generateArtistResults = () => {
        if(this.props.searchResults.albums != undefined){
            var artistCellArray = [];
            artistCellArray.push(<div style={titleStyle}>Artists:</div>)
            this.props.searchResults.artists.data.forEach((data, i) => {
                console.log(data)
                var artist = data.attributes
                artistCellArray.push(this.cellItem(artist.name,artist.artistName,null,null,i + artist.name))
            })
            return artistCellArray
        }
    }

    /**
     * Generates a cell item
     */
    cellItem = (firstRow,secondRow,thirdRow,imgSrc,key) => {
        return (<div
                key={key}
            >
                <div className="listItem" onClick={() => {
                    console.log("clicked")
                }}>
                    {imgSrc ? <div style={{ borderRadius: "5px", float: "left", backgroundColor: "#e8e8e8" }}>
                        <img
                            alt={firstRow + " artwork"}
                            style={{ borderRadius: "5px" }}
                            width={50}
                            height={50}
                            onError={() => {console.log("HANDLE THIS JONATHAN< DAMN")}}
                            src={formatImgSrc(imgSrc, 200, 200)}>
                        </img>
                    </div> : ""}
                    
                    <div style={{ borderBottom: "1px solid #e8e8e8", lineHeight: "50px", marginLeft: 60, fontSize: "1.2em" }}>
                        <Row gutter={20}>
                            <Col className="ellipsis" span={10}>
                                {firstRow}
                            </Col>
                            <Col className="ellipsis" span={7}>
                                <span style={{ color: "#99999b" }}>{secondRow}</span>
                            </Col>
                            <Col className="ellipsis" span={7}>
                                <span style={{ color: "#99999b" }}>{thirdRow}</span>
                            </Col>
                        </Row>

                    </div>
                </div>
            </div>)
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

export default connect(mapStateToProps)(DropDownSearchResults)