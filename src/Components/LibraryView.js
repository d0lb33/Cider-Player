import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchUserSongs } from '../actions/libraryActions';
import { LOADINGSTATES } from '../consts';

class LibraryView extends Component {

    componentWillMount = () => {
        this.props.fetchUserSongs();
    }

    getLoader = () =>{
        if (this.props.loadingState === LOADINGSTATES.LOADEDPARTIAL){
            return <h1>Loading Partial Songs</h1>
        }else if (this.props.loadingState === LOADINGSTATES.LOADING){
            return <h1>Loading Songs</h1>
        }else if (this.props.loadingState === LOADINGSTATES.LOADED){
            return <h1>Loaded</h1>
        }
    }

    showSongs = () => {
        if ((this.props.loadingState === LOADINGSTATES.LOADEDPARTIAL || this.props.loadingState === LOADINGSTATES.LOADED) && this.props.songs){
            
            let x = this.props.songs.map((song) => {
                return <h1>{song.attributes.name}</h1>
            })
            return x;
        }
    }

    render() {
        return (
            <div>
            {this.getLoader()}
            {this.showSongs()}
            </div>
        )
    }
}

const mapStateToProps = state => ({
    songs: state.library.songs,
    loadingState : state.library.loadingState
});

export default connect(mapStateToProps, { fetchUserSongs })(LibraryView);
