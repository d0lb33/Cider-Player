import React, { Component } from 'react'
import { Column, Table, WindowScroller, AutoSizer, List } from 'react-virtualized';
import 'react-virtualized/styles.css'; // only needs to be imported once
import { connect } from 'react-redux';
import { APPLE_GREY } from '../UIElements/ColorConsts';

class VirtualizedSongList extends Component {

    constructor(props) {
        super(props);
        this.rowRenderer = this.rowRenderer.bind(this);
    }

    formatImgSrc = (src) => {
        src = src.replace("{w}", "60");
        src = src.replace("{h}", "60");
        return src;
    }

    rowRenderer({
        key,         // Unique key within array of rows
        index,       // Index of row within collection
        isScrolling, // The List is currently being scrolled
        isVisible,   // This row is visible within the List (eg it is not an overscanned row)
        style        // Style object to be applied to row (to position it)
    }) {
        return (
            <div
                key={key}
                style={style}
            >
                <div className="listItem">
                    <div style={{ borderRadius: "5px", float: "left", backgroundColor: "#e8e8e8" }}>

                        <img style={{ borderRadius: "5px" }} width={50} height={50} src={this.formatImgSrc(this.props.songs[index].attributes.artwork.url)}></img>
                    </div>
                    <div style={{ borderBottom: "1px solid #e8e8e8", lineHeight: "49px", marginLeft: 60 }}>
                        {this.props.songs[index].attributes.name}
                    </div>
                </div>


            </div>
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
                                rowHeight={55}
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
    songs: state.library.songs
})

export default connect(mapStateToProps, null)(VirtualizedSongList);
