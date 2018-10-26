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

    constructor(props){
        super(props);

        this.rowRenderer = this.rowRenderer.bind(this);
    }

    rowRenderer ({
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
            {console.log(index)}
            {console.log(this.props.songs)}
            {this.props.songs[index].attributes.name}
        </div>
        )
      }


    render() {
        return (
            <div>
                Learn this:
                https://blog.logrocket.com/rendering-large-lists-with-react-virtualized-82741907a6b3

                <List
                    width={300}
                    height={300}
                    rowCount={this.props.songs.length}
                    rowHeight={20}
                    rowRenderer={this.rowRenderer}
                />
            </div>
        )


    }
}

const mapStateToProps = state => ({
    songs: state.library.songs
})

export default connect(mapStateToProps, null)(VirtualizedSongList);
