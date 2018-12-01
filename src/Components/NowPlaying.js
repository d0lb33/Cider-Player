import React, { Component } from 'react'
import AppleButton from '../UIElements/AppleButton';
import { connect } from 'react-redux';
import ChevronDown from '../icons/chevron-down-grey.png';
import { formatImgSrc } from '../consts';
import GreyBackground from '../icons/GreyBackground.png';
import SongProgressSlider from './SongProgressSlider';
import { APPLE_PINK } from '../UIElements/ColorConsts';
import { Slider, Divider, Icon } from 'antd';
import { playSong, songLoadingChecker } from '../actions/libraryActions';
import UpNextView from './UpNextView';
import { CustomIcon } from '../UIElements/CustomIcons';

class NowPlaying extends Component {
    constructor(props) {
        super(props);

        this.state = {
            openClass: "",
            currentSongName: "Not Playing",
            currentArtworkSource: GreyBackground,
            currentSongAlbumName: "",
            currentSongArtistName: ""
        }
    }

    componentDidMount = () => {
        // Check for a playback state change to know when to update the ui
        this.props.musicKitInstance.addEventListener('playbackStateDidChange', (e) => {
            this.updateStateWithCurrentSongAttributes();
        });

        this.props.musicKitInstance.addEventListener('mediaItemWillChange', (e) => {
            this.props.musicKitInstance.player.queue.items.map((item, i) => {
                if (!item.playParams) return;
                if (item.attributes.playParams.id === e.item.playParams.id){
                    console.log("Matched at " + i)
                    this.props.songLoadingChecker(e.item.id, i);
                }
            })
        });
    }

    /**
     * Updates the state of the songName and the currentAlbumArtwork. Handles no items in the player.
     */
    updateStateWithCurrentSongAttributes = () => {

        let currentImgSrc = this.state.currentArtworkSource;
        let currentSongName = "Not Playing";
        let currentSongAlbumName = "";
        let currentSongArtistName = "";
        /*
        Loading States Enums
        completed: 10
        ended: 5
        loading: 1
        none: 0
        paused: 3
        playing: 2
        seeking: 6
        stalled: 9
        stopped: 4
        waiting: 8*/
        switch (this.props.musicKitInstance.player.playbackState) {
            case window.MusicKit.PlaybackStates.playing:
            case window.MusicKit.PlaybackStates.paused:
            case window.MusicKit.PlaybackStates.waiting:
                if (this.props.musicKitInstance.player.nowPlayingItem) {
                    currentImgSrc = formatImgSrc(this.props.musicKitInstance.player.nowPlayingItem.attributes.artwork.url, 60, 60);
                    currentSongName = this.props.musicKitInstance.player.nowPlayingItem.attributes.name;
                    currentSongAlbumName = this.props.musicKitInstance.player.nowPlayingItem.attributes.albumName;
                    currentSongArtistName = this.props.musicKitInstance.player.nowPlayingItem.attributes.artistName;
                } else {
                    currentSongName = "Loading";
                }
                break;
            case window.MusicKit.PlaybackStates.loading:
                currentSongName = "Loading";
                break;
            case window.MusicKit.PlaybackStates.none:
                currentSongName = "Not Playing";
                break;
            default:
                currentSongName = "Not Playing";
        }

        this.setState({
            currentSongName: currentSongName,
            currentArtworkSource: currentImgSrc,
            currentSongAlbumName: currentSongAlbumName,
            currentSongArtistName: currentSongArtistName
        }, () => this.forceUpdate());
    }

    /**
     * Appends the open class to the nowPlaying item to create an amazing animation! Along with showing the blurBackground div.
     */
    showView = () => {
        this.setState({ openClass: "open" });
    }

    /**
     * Slides the nowPlaying view down into its minimified position.
     */
    hideView = (e) => {
        e.preventDefault();
        e.stopPropagation();
        this.setState({ openClass: "" })
    }

    /**
     * The clickable down chevron at the top of the nowPLaying view when open.
     */
    getDownChevron = () => {
        if (this.state.openClass === "open") {
            return <img
                alt="chevron-down"
                onMouseDown={this.hideView}
                style={{ display: "block", margin: "auto", cursor: "pointer" }}
                width={35}
                src={ChevronDown}>
            </img>
        }
    }

    /**
     * Returns the nowPlayingArtwork
     */
    currentPlayingArtwork = () => {
        return <img
            alt={"Now Playing Artwork"}
            className={"nowPlayingArtwork " + this.state.openClass}
            src={this.state.currentArtworkSource}>
        </img>
    }

    /**
     * Returns the buttons to be displayed in the now playing view that is minimized.
     */
    minimizedView = () => {
        if (this.state.openClass === "open") return;

        /**
        * Returns the the currentlyPlayingText
        */
        let currentPlayingText = () => {
            return (
                <div className="minimized-song-name">
                    <span style={{ fontSize: "1.3em" }}>{this.state.currentSongName}</span>
                </div>
            )
        }

        let minimizedPlayPauseBtn = () => {
            if (this.props.musicKitInstance.player.playbackState === window.MusicKit.PlaybackStates.playing) {
                return <AppleButton onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    this.props.musicKitInstance.player.pause();
                }}
                    notSelectable
                    width={40}
                    height={40}
                    type="icon"
                    icon="pause"
                    showBgOnMouseDown={true} />
            } else {
                return <AppleButton onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    this.props.musicKitInstance.player.play();
                }}
                    notSelectable
                    width={40}
                    height={40}
                    type="icon"
                    icon="play-arrow"
                    showBgOnMouseDown={true} />
            }
        }

        return (
            <span>
                {currentPlayingText()}
                <div style={{ position: "absolute", right: 3, top: 12 }}>
                    {minimizedPlayPauseBtn()}

                    <AppleButton
                        onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            this.props.musicKitInstance.player.skipToNextItem();
                        }}
                        notSelectable
                        width={40}
                        height={40}
                        type="icon"
                        icon="fast-forward"
                        showBgOnMouseDown={true}
                    />
                </div>
            </span>)

    }

    maximizedBody = () => {
        let playPauseBtn = () => {
            if (this.props.musicKitInstance.player.playbackState === window.MusicKit.PlaybackStates.playing) {
                return <AppleButton onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    this.props.musicKitInstance.player.pause();
                }}
                    notSelectable
                    width={55}
                    height={55}
                    type="icon"
                    icon="pause"
                    showBgOnMouseDown={true} />
            } else {
                return <AppleButton onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    this.props.musicKitInstance.player.play();
                }}
                    notSelectable
                    width={55}
                    height={55}
                    type="icon"
                    icon="play-arrow"
                    showBgOnMouseDown={true} />
            }
        }

        let buttonRow = () => {
            let btnRowStyle = {
                margin: 10
            }

            return (
                <div>
                    <span style={btnRowStyle}>
                        <AppleButton
                            showBgOnMouseDown
                            width={55}
                            height={55}
                            notSelectable
                            type="icon"
                            icon="fast-backward"
                            onClick={() => { this.props.musicKitInstance.player.skipToPreviousItem() }}
                        />
                    </span>
                    <span style={btnRowStyle}>
                        {playPauseBtn()}
                    </span>
                    <span style={btnRowStyle}>
                        <AppleButton
                            showBgOnMouseDown
                            width={55}
                            height={55}
                            notSelectable
                            type="icon"
                            icon="fast-forward"
                            onClick={() => {
                                this.props.musicKitInstance.player.skipToNextItem()
                            }}
                        />
                    </span>
                </div>)
        }

        let getArtistAlbumText = () => {
            if (this.props.musicKitInstance.player.playbackState === window.MusicKit.PlaybackStates.playing || this.props.musicKitInstance.player.playbackState === window.MusicKit.PlaybackStates.paused) {
                return (
                    <div
                        style={{
                            fontSize: "1.4em",
                            color: APPLE_PINK,
                            width: "90%",
                            textAlign: "center",
                            margin: "auto"
                        }}
                        className="ellipsis"
                    >

                        {this.state.currentSongArtistName}<span style={{ fontWeight: "lighter" }}> – </span>{this.state.currentSongAlbumName}
                    </div>
                )
            } else {
                return <div style={{
                    fontSize: "1.4em",
                    color: APPLE_PINK,
                    width: "90%",
                    textAlign: "center",
                    margin: "auto"
                }}>{/*So the bottom of the view doesn't shift when there is no song playing*/}&nbsp;</div>
            }
        }

        let getCurrentSongText = () => {
            return (
                <div
                    className="ellipsis"
                    style={{
                        fontSize: "1.5em",
                        fontWeight: "bold",
                        color: "black",
                        width: "90%",
                        margin: "auto"
                    }}>
                    {this.state.currentSongName}
                </div>
            )
        }

        let getVolumeSlider = () => {
            return (
                <div style={{ width: "90%", margin: "auto" }} className="volume-slider">
                    <div className="icon-wrapper">
                        <CustomIcon
                            className="apple-icon"
                            width="16px"
                            icon="volume-down" />
                        <Slider
                            defaultValue={this.props.musicKitInstance.player.volume * 100}
                            onChange={(e) => {
                                this.props.musicKitInstance.player.volume = e / 100;
                            }} />
                        <CustomIcon
                            className="apple-icon"
                            width="16px"
                            icon="volume-up" />
                    </div>
                </div>
            )
        }

        /**
            * MusicKitJS doesn't handle "unshuffling" the queue, so we have to find the index of 
            * the currently playing item in the unshuffled queue to set the new queue.
            * Gets the index of the currently playing item in the songs array.
            * When unshuffled will set the queue to that index.
            */
        let unshuffle = () => {
            // Turn shuffle off
            this.props.musicKitInstance.player.shuffleMode = 0;


            let nowPlayingItem = this.props.musicKitInstance.player.nowPlayingItem;

            if (nowPlayingItem === null) {
                return;
            }

            let srtPosition = 0;
            let wasPlaying = this.props.musicKitInstance.player.isPlaying;

            // Maps through unshuffled songs to find the index of the nowPlayingItem
            this.props.songs.map((song, i) => {
                if (song.attributes.name === nowPlayingItem.attributes.name) {
                    if (song.attributes.albumName === nowPlayingItem.attributes.albumName) {
                        // Ideally we want to find an id to compare, but for some reason they are different after setting shuffle to true.
                        srtPosition = i;
                    }
                }
            });

            this.props.musicKitInstance.setQueue(this.props.songs)
                .then(() => {
                    // nowPlayingItem goes null after setting queue
                    this.props.musicKitInstance.player.nowPlayingItem = nowPlayingItem;

                    // Sets the queue to the now playing item from the work we did above
                    this.props.musicKitInstance.player.queue.position = srtPosition;

                    // Setting a nowPlayingItem causes the player to pause if it was playing, 
                    // so we check to see if it was playing before and if so continue that.
                    wasPlaying ? this.props.musicKitInstance.play() : this.props.musicKitInstance.pause();
                })
        }

        return (
            <div style={{ textAlign: "center" }}>
                <SongProgressSlider />

                {getCurrentSongText()}
                {getArtistAlbumText()}
                <br /><br />
                {buttonRow()}
                {getVolumeSlider()}
                <Divider />
                <div>
                    <span style={{ marginRight: "15px" }}>
                        <AppleButton
                            onClick={() => {
                                if (this.props.musicKitInstance.player.shuffleMode === 1) {
                                    unshuffle();
                                } else {
                                    this.props.musicKitInstance.player.shuffleMode = 1;
                                }
                            }}
                            btnWidth={"160px"} icon="shuffle" title="Shuffle" type="filled"
                            selected={this.props.musicKitInstance.player.shuffleMode === 1 ? true : false} />
                    </span>

                    <AppleButton
                        onClick={() => {
                            this.props.playSong(0, this.props.songs, true);
                        }}
                        btnWidth={"160px"}
                        icon="none"
                        title="Repeat"
                        type="filled"
                    />
                </div>
                <UpNextView />
            </div>
        )
    }

    render() {
        return (
            <span>
                <div onClick={this.showView} className={"unselectable now-playing " + this.state.openClass} >
                    {this.getDownChevron()}
                    {this.currentPlayingArtwork()}
                    {this.state.openClass === "open" ? this.maximizedBody() : this.minimizedView()}
                </div>
                <div onClick={(e) => { this.hideView(e) }} className={"blurBackground " + this.state.openClass}>
                </div>
            </span>

        )
    }
}

const mapStateToProps = (state) => ({
    musicKitInstance: state.library.musicKitInstance,
    songs: state.library.songs
})

export default connect(mapStateToProps, { playSong, songLoadingChecker })(NowPlaying);
