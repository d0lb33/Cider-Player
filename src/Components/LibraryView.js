import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchUserSongs } from '../actions/libraryActions';
import { LOADINGSTATES } from '../consts';
import { Row, Col, Spin, Divider } from 'antd';
import AppleButton from '../UIElements/AppleButton';
import { APPLE_GREY } from '../UIElements/ColorConsts';
import VirtualizedSongList from './VirtualizedSongList';

class LibraryView extends Component {

    componentWillMount = () => {
        this.props.fetchUserSongs();
    }
    
    getSongs = () => {
        if ((this.props.loadingState >= LOADINGSTATES.LOADEDPARTIAL) && this.props.songs) {
          return <VirtualizedSongList />
        }
    }

    getSongCount = () => {
        switch (this.props.loadingState) {
            case LOADINGSTATES.LOADEDPARTIAL:
                return <span><Spin></Spin> {this.props.songs.length}</span>
            case LOADINGSTATES.LOADED:
                return this.props.songs.length
            default:
                return "Loading"
        }
    }

    render() {
        return (
            <div className="library-view">
                <Row>
                    <Col span={12}>
                        Library
                    </Col>
                    <Col span={12}>
                        <div style={{ display: "inline", float: "right" }}>Sort</div>
                    </Col>
                </Row>
                <Row>
                    <Col span={24}>
                        <span style={{ fontSize: "3em", color: "black" }}><b>Songs</b></span>
                    </Col>
                </Row>
                <Row>
                    <Col span={6}>
                        <div style={{ fontSize: "1.5em", color: APPLE_GREY, paddingTop: '7px' }}>{this.getSongCount()} Songs</div>
                    </Col>
                    <div style={{ display: "inline", float: "right", marginRight: "10px" }}>
                        <AppleButton btnWidth={"160px"} icon="shuffle" inverseSelection title="Shuffle" type="filled" />
                    </div>
                    <div style={{ display: "inline", float: "right", marginRight: "10px" }}>
                        <AppleButton onClick={() => this.props.musicKitInstance.play()} btnWidth={"160px"} icon="play-arrow" inverseSelection title="Play" type="filled" />
                    </div>
                    <Col span={6}>
                    </Col>
                </Row>
                <Divider style={{ margin: "15px 0px 15px 0px" }} />
                {this.getSongs()}
            </div>
        )
    }
}

const mapStateToProps = state => ({
    songs: state.library.songs,
    loadingState: state.library.loadingState,
    musicKitInstance: state.library.musicKitInstance
});

export default connect(mapStateToProps, { fetchUserSongs })(LibraryView);
