import React, { Component } from 'react'
import { Column, Table, WindowScroller, AutoSizer, List } from 'react-virtualized';
import 'react-virtualized/styles.css'; // only needs to be imported once
import { connect } from 'react-redux';

class VirtualizedSongList extends Component {


    /*rowRenderer = (
        key,         // Unique key within array of rows
        index,       // Index of row within collection
        isScrolling, // The List is currently being scrolled
        isVisible,   // This row is visible within the List (eg it is not an overscanned row)
        style        // Style object to be applied to row (to position it)
    ) => {
        return (
            <div
                key={key}
                style={style}
            >
                {console.log(index)}
                {console.log(this.props.songs)}
                {this.props.songs[index].attributes.name}
            </div>
        )
    }*/

    constructor(props) {
        super(props);

        this.rowRenderer = this.rowRenderer.bind(this);
    }

    users = [
        { name: "foo" },
        { name: "foo" },
        { name: "foo" },
        { name: "foo" },
        { name: "foo" },
        { name: "foo" },
        { name: "foo" },
        { name: "foo" },
        { name: "foo" },
        { name: "foo" },
        { name: "foo" },
        { name: "foo" },
        { name: "foo" },
        { name: "foo" },
        { name: "foo" },
        { name: "foo" },
        { name: "foo" },
        { name: "foo" },
        { name: "foo" },
        { name: "foo" },
        { name: "foo" },
        { name: "foo" },
        { name: "foo" },
        { name: "foo" },
        { name: "foo" },
        { name: "foo" },
        { name: "foo" },
        { name: "foo" },
        { name: "foo" },
        { name: "foo" },
        { name: "foo" },
        { name: "foo" },
        { name: "foo" },
        { name: "foo" },
        { name: "foo" },
        { name: "foo" },
        { name: "foo" },
        { name: "foo" },
        { name: "foo" },
        { name: "foo" },
        { name: "foo" },
        { name: "foo" },
        { name: "foo" },
        { name: "foo" },
        { name: "foo" },
        { name: "foo" },
        { name: "foo" },
        { name: "foo" },
        { name: "foo" },
        { name: "foo" },
        { name: "foo" },
        { name: "foo" },
        { name: "foo" },
        { name: "foo" },
        { name: "foo" },
        { name: "foo" },
        { name: "foo" },
        { name: "foo" },
        { name: "foo" },
        { name: "foo" },
        { name: "foo" },
        { name: "foo" },
        { name: "foo" },
        { name: "foo" },
        { name: "foo" },
        { name: "foo" },
        { name: "foo" },
        { name: "foo" },
        { name: "foo" },
        { name: "foo" }
    ];

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
                {this.props.songs[index].attributes.name}
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
                                autoHeight
                                height={height}
                                width={width}
                                scrollTop={scrollTop}
                                isScrolling={isScrolling}
                                rowHeight={20}
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
