import React, { Component } from 'react'
import { WindowScroller, AutoSizer, List } from 'react-virtualized';
import 'react-virtualized/styles.css'; // only needs to be imported once
import { connect } from 'react-redux';
import { formatImgSrc } from '../consts';
import { playSong } from '../actions/libraryActions';
import { Row, Col } from 'antd';


class VirtualizedSongList extends Component {

    constructor(props) {
        super(props);
        this.rowRenderer = this.rowRenderer.bind(this);
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
                <div className="listItem" onClick={() => {
                    this.props.playSong(index, this.props.songs);
                }}>
                    <div style={{ borderRadius: "5px", float: "left", backgroundColor: "#e8e8e8" }}>
                        <img
                            alt={this.props.songs[index].attributes.name + " artwork"}
                            style={{ borderRadius: "5px" }}
                            width={50}
                            height={50}
                            src={formatImgSrc(this.props.songs[index].attributes.artwork.url, 200, 200)}>
                        </img>
                    </div>

                    <div style={{ borderBottom: "1px solid #e8e8e8", lineHeight: "50px", marginLeft: 60, fontSize: "1.2em" }}>
                        <Row gutter={20}>
                            <Col className="ellipsis" span={10}>
                                {this.props.songs[index].attributes.name}
                            </Col>
                            <Col className="ellipsis" span={7}>
                                <span style={{ color: "#99999b" }}>{this.props.songs[index].attributes.artistName}</span>
                            </Col>
                            <Col className="ellipsis" span={7}>
                                <span style={{ color: "#99999b" }}>{this.props.songs[index].attributes.albumName}</span>
                            </Col>
                        </Row>

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
    musicKitInstance: state.library.musicKitInstance
})

export default connect(mapStateToProps, { playSong })(VirtualizedSongList);
