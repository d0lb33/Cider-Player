import React, { Component } from 'react'
import { WindowScroller, AutoSizer, List } from 'react-virtualized';
import 'react-virtualized/styles.css'; // only needs to be imported once
import { connect } from 'react-redux';
import { formatImgSrc } from '../consts';
import { playSong } from '../actions/libraryActions';
import { Row, Col } from 'antd';
import CellItem from './CellItem';


class VirtualizedSongList extends Component {

    constructor(props) {
        super(props);
        this.rowRenderer = this.rowRenderer.bind(this);
    }

    rowRenderer({
        key,         // Unique key within array of rows
        index,       // Index of row within collection
        style        // Style object to be applied to row (to position it)
    }) {
        return (
            <CellItem 
                firstCol={this.props.songs[index].attributes.name}
                secondCol={this.props.songs[index].attributes.artistName}
                thirdCol={this.props.songs[index].attributes.albumName}
                key={key}
                style={style}
                imgSrc={this.props.songs[index].attributes.artwork.url}
                cellItemClicked={() => {this.props.playSong(index, this.props.songs)}}
            />
        )
    }


    /* Great guide on react-virtualized
     * https://blog.logrocket.com/rendering-large-lists-with-react-virtualized-82741907a6b3
     */
    render() {
        return (
            <WindowScroller>
                {({ height, isScrolling, onChildScroll, scrollTop }) => (
                    <AutoSizer disableHeight>
                        {({ width }) => (
                            <List
                                ref={this.songList}
                                autoHeight
                                height={height}
                                width={width}
                                scrollTop={scrollTop}
                                isScrolling={isScrolling}
                                rowHeight={58}
                                rowRenderer={this.rowRenderer}
                                rowCount={this.props.songs.length}
                                overscanRowCount={5}
                                style={{ outline: "none" }}
                            />
                        )}
                    </AutoSizer>
                )}
            </WindowScroller>
        )
    }
}

const mapStateToProps = state => ({
    songs: state.library.songs,
    playlistSongs: state.library.playlistSongs,
    subPageRouting: state.page.subPageRouting,
    musicKitInstance: state.library.musicKitInstance
})

export default connect(mapStateToProps, { playSong })(VirtualizedSongList);
