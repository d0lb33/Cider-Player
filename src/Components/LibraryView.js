import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { fetchUserSongs, playSong, fetchUserPlaylists, setSongsInView } from '../actions/libraryActions';
import { updateSubPageRouting } from '../actions/pageActions';
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
            showBackButton: false, // Shows the back button that removes the last item in route, only show if more then 1 item in route array.

        }
    }

    componentWillReceiveProps(props) {
        this.updateStateWithProps(props);
    }

    updateStateWithProps = (props) => {

        var lastIndex = props.subPageRouting.length - 1;

        if (lastIndex === 0) {
           this.props.setSongsInView(props.librarySongs);
        }
        props.songs ? console.log(props.songs.length) : console.log();

        switch (props.subPageRouting[lastIndex].page) {
            case SUBPAGENAMES.SONGS:
                this.setState({
                    loadingState: props.loadingState,
                    showPlayShuffle: true,
                    amountOfItems: props.songs ? props.songs.length : 0,
                    currentView: props.songs ? <VirtualizedSongList /> : <span></span>,
                    currentViewName: props.subPageRouting[lastIndex].viewName
                });
                break;
            case SUBPAGENAMES.PLAYLISTS:
                this.setState({
                    loadingState: props.playlistLoadingState,
                    showPlayShuffle: false,
                    amountOfItems: props.playlists ? props.playlists.length : 0,
                    currentView: props.playlists ? <PlaylistsGridList /> : <span></span>,
                    currentViewName: props.subPageRouting[lastIndex].viewName
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
                    <a onClick={() => {
                        this.props.updateSubPageRouting([{ page: SUBPAGENAMES.PLAYLISTS, viewName: "Playlists" }])
                    }}>Playlists</a>
                </Menu.Item>
                <Menu.Item>
                    <a onClick={() => { this.props.updateSubPageRouting([{ page: SUBPAGENAMES.SONGS, viewName: "Songs" }]) }}>Songs</a>
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
                        <div style={{ fontSize: "1.5em", color: APPLE_GREY, paddingTop: '7px' }}>{this.getItemCount()} Items</div>
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
    playlistSongs: state.library.playlistSongs,
    playlists: state.library.playlists,
    playlistLoadingState: state.library.playlistLoadingState,
    loadingState: state.library.loadingState,
    librarySongs: state.library.librarySongs,
    musicKitInstance: state.library.musicKitInstance,
    currentSubPage: state.page.currentSubPage,
    subPageRouting: state.page.subPageRouting
});

export default connect(mapStateToProps, { fetchUserSongs, playSong, updateSubPageRouting, fetchUserPlaylists, setSongsInView })(LibraryView);
