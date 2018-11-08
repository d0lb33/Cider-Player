import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchUserSongs, playSong, fetchUserPlaylists } from '../actions/libraryActions';
import { updateSubPage } from '../actions/pageActions';
import { LOADINGSTATES, SUBPAGENAMES } from '../consts';
import { Row, Col, Spin, Divider, Icon, Dropdown, Menu } from 'antd';
import AppleButton from '../UIElements/AppleButton';
import { APPLE_GREY, APPLE_PINK } from '../UIElements/ColorConsts';
import VirtualizedSongList from './VirtualizedSongList';
import PlaylistsGridList from './PlaylistsGridList';

class LibraryView extends Component {

    constructor(props) {
        super(props);

        this.state = {
            loadingState: 1, // Set this to the appriate loading state on a view change.
            showPlayShuffle: true, // Whether or not to show the play shuffle buttons.
            amountOfItems: 0, // This is the count that is displayed for the amount of items.
            currentView: null, // The view that will be shown
            currentViewName: "Songs", // The name of the current view to be displayed next to the item count

        }
    }

    componentWillReceiveProps(props) {
        this.updateStateWithProps(props);
    }

    updateStateWithProps = (props) => {
        switch (props.currentSubPage) {
            case SUBPAGENAMES.SONGS:
                this.setState({
                    loadingState: props.loadingState,
                    showPlayShuffle: true,
                    amountOfItems: props.songs ? props.songs.length : 0,
                    currentView: props.songs ? <VirtualizedSongList /> : <span></span>,
                    currentViewName: "Songs"
                });
                break;
            case SUBPAGENAMES.PLAYLISTS:
                this.setState({
                    loadingState: props.playlistLoadingState,
                    showPlayShuffle: false,
                    amountOfItems: props.playlists ? props.playlists.length : 0,
                    currentView: props.songs ? <PlaylistsGridList /> : <span></span>,
                    currentViewName: "Playlists"
                });
                break;
        }
    }

    componentWillMount = () => {
        if (!this.props.songs) this.props.fetchUserSongs();

        if (!this.props.playlists) this.props.fetchUserPlaylists();
        this.updateStateWithProps(this.props)
    }

    /**
     * Returns the amount of items in the view, along with a loading idicator if its not fully loaded.
     */
    getItemCount = () => {
        switch (this.state.loadingState) {
            case LOADINGSTATES.LOADEDPARTIAL:
                return <span>
                    <Spin indicator={<Icon type="loading" spin />} />
                    {this.state.amountOfItems}
                </span>
            case LOADINGSTATES.LOADED:
                return this.state.amountOfItems
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

    /**
     * Returns the play and shuffle buttons
     */
    getPlayShuffleButtons = () => {
        if (!this.state.showPlayShuffle) return;
        return (
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
            </div>)
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
                        <span style={{ fontSize: "3em", color: "black" }}><b>{this.state.currentViewName}</b></span>
                    </Col>
                </Row>
                <Row>
                    <Col span={6}>
                        <div style={{ fontSize: "1.5em", color: APPLE_GREY, paddingTop: '7px' }}>{this.getItemCount()} {this.state.currentViewName}</div>
                    </Col>
                    {this.getPlayShuffleButtons()}
                </Row>
                <Divider style={{ margin: "15px 0px 15px 0px" }} />
                {this.state.currentView}
            </div>
        )
    }
}

const mapStateToProps = state => ({
    songs: state.library.songs,
    playlists: state.library.playlists,
    playlistLoadingState: state.library.playlistLoadingState,
    loadingState: state.library.loadingState,
    musicKitInstance: state.library.musicKitInstance,
    currentSubPage: state.page.currentSubPage,
});

export default connect(mapStateToProps, { fetchUserSongs, playSong, updateSubPage, fetchUserPlaylists })(LibraryView);
