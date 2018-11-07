import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchUserSongs, playSong } from '../actions/libraryActions';
import { updateSubPage } from '../actions/pageActions';
import { LOADINGSTATES, SUBPAGENAMES } from '../consts';
import { Row, Col, Spin, Divider, Icon, Dropdown, Menu } from 'antd';
import AppleButton from '../UIElements/AppleButton';
import { APPLE_GREY, APPLE_PINK } from '../UIElements/ColorConsts';
import VirtualizedSongList from './VirtualizedSongList';

class LibraryView extends Component {

    componentWillMount = () => {
        this.props.fetchUserSongs();
    }

    getSongs = () => {
        if ((this.props.loadingState >= LOADINGSTATES.LOADEDPARTIAL) && this.props.songs && this.props.currentSubPage === SUBPAGENAMES.SONGS) {
            return <VirtualizedSongList />
        }
    }

    /**
     * Returns the amount of items in the view, along with a loading idicator if its not fully loaded.
     */
    getItemCount = () => {
        let amountNumber = () => {
            switch (this.props.currentSubPage) {
                case SUBPAGENAMES.SONGS:
                    return this.props.songs.length
                case SUBPAGENAMES.PLAYLISTS:
                    return 0;
            }
        };


        switch (this.props.loadingState) {
            case LOADINGSTATES.LOADEDPARTIAL:
                return <span>
                    <Spin indicator={<Icon type="loading" spin />} />
                    {amountNumber()}
                </span>
            case LOADINGSTATES.LOADED:
                return amountNumber()
            default:
                return "Loading"
        }
    }

    getTypeDropdown = () => {
        const menu = (
            <Menu>
                <Menu.Item>
                    <a>Albums</a>
                </Menu.Item>
                <Menu.Item>
                    <a>Artists</a>
                </Menu.Item>
                <Menu.Item>
                    <a onClick={() => { this.props.updateSubPage(SUBPAGENAMES.PLAYLISTS) }}>Playlists</a>
                </Menu.Item>
                <Menu.Item>
                    <a onClick={() => { this.props.updateSubPage(SUBPAGENAMES.SONGS) }}>Songs</a>
                </Menu.Item>
            </Menu>
        );

        return (<Dropdown overlay={menu}>
            <a href="#">
                <span style={{ color: APPLE_PINK, paddingRight: 5 }}>Library</span><Icon style={{ color: APPLE_PINK }} type="down" />
            </a>
        </Dropdown>)
    }

    /**
     * Returns the name of the current view
     */
    getCurrentViewText = () => {
        switch (this.props.currentSubPage) {
            case SUBPAGENAMES.SONGS:
                return "Songs";
            case SUBPAGENAMES.PLAYLISTS:
                return "Playlists";
        }
    }

    render() {
        return (
            <div className="library-view">
                <Row>
                    <Col span={12}>
                        {this.getTypeDropdown()}
                    </Col>
                    <Col span={12}>
                        <div style={{ display: "inline", float: "right" }}>Sort</div>
                    </Col>
                </Row>
                <Row>
                    <Col span={24}>
                        <span style={{ fontSize: "3em", color: "black" }}><b>{this.getCurrentViewText()}</b></span>
                    </Col>
                </Row>
                <Row>
                    <Col span={6}>
                        <div style={{ fontSize: "1.5em", color: APPLE_GREY, paddingTop: '7px' }}>{this.getItemCount()} {this.getCurrentViewText()}</div>
                    </Col>
                    <div style={{ display: "inline", float: "right" }}>
                        <span style={{ marginRight: "15px" }}>
                            <AppleButton
                                onClick={() => {
                                    this.props.musicKitInstance.player.shuffleMode = 0;
                                    this.props.playSong(0, this.props.songs, true);
                                }}
                                btnWidth={"160px"}
                                icon="play-arrow"

                                title="Play"
                                type="filled"
                            />
                        </span>
                        <AppleButton onClick={() => {
                            this.props.musicKitInstance.player.shuffleMode = 1;
                            this.props.playSong(-1, this.props.songs, true);

                        }} btnWidth={"160px"} icon="shuffle" title="Shuffle" type="filled" />
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
    musicKitInstance: state.library.musicKitInstance,
    currentSubPage: state.page.currentSubPage,
});

export default connect(mapStateToProps, { fetchUserSongs, playSong, updateSubPage })(LibraryView);
