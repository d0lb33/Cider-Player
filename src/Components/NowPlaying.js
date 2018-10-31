import React, { Component } from 'react'
import AppleButton from '../UIElements/AppleButton';
import { connect } from 'react-redux';
import ChevronDown from '../icons/chevron-down-grey.png';
import { CustomIcon } from '../UIElements/CustomIcons';
import { formatImgSrc } from '../consts';
import GreyBackground from '../icons/GreyBackground.png';

class NowPlaying extends Component {
    constructor(props) {
        super(props);

        this.state = {
            nowPlayingClass: "",
            blurBackgroundClass: "",
            currentSongName: "Not Playing",
            currentArtworkSource: GreyBackground,
        }
    }

    componentDidMount = () => {
        // Check for a playback state change to know when to update the ui
        this.props.musicKitInstance.addEventListener('playbackStateDidChange', (e) => {
            this.updateStateWithCurrentSongAttributes();
        });
    }

    /**
     * Updates the state of the songName and the currentAlbumArtwork. Handles no items in the player.
     */
    updateStateWithCurrentSongAttributes = () => {

        let currentImgSrc = this.state.currentArtworkSource;
        let currentSongName = "Not Playing";
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
                if (this.props.musicKitInstance.player.nowPlayingItem) {
                    currentImgSrc = formatImgSrc(this.props.musicKitInstance.player.nowPlayingItem.attributes.artwork.url, 60, 60);
                    currentSongName = this.props.musicKitInstance.player.nowPlayingItem.attributes.name;
                } else {
                    currentSongName = "Loading";
                }
                break;
            case window.MusicKit.PlaybackStates.loading:
            case window.MusicKit.PlaybackStates.waiting:
                currentSongName = "Loading";
                break;
            case window.MusicKit.PlaybackStates.none:
                currentSongName = "Not Playing";
                break;
        }

        this.setState({
            currentSongName: currentSongName,
            currentArtworkSource: currentImgSrc
        }, () => this.forceUpdate());
    }

    /**
     * Appends the open class to the nowPlaying item to create an amazing animation! Along with showing the blurBackground div.
     */
    showView = () => {
        this.setState({ nowPlayingClass: "open", blurBackgroundClass: "blurBackground" });
    }


    /**
     * Slides the nowPlaying view down into its minimified position.
     */
    hideView = (e) => {
        e.preventDefault();
        e.stopPropagation();
        this.setState({ nowPlayingClass: "", blurBackgroundClass: "" })
    }

    /**
     * The clickable down chevron at the top of the nowPLaying view when open.
     */
    getDownChevron = () => {
        if (this.state.nowPlayingClass === "open") {
            return <img onMouseDown={this.hideView} style={{ display: "block", margin: "auto", cursor: "pointer" }} width={35} src={ChevronDown}></img>
        }
    }

    /**
     * Returns the nowPlayingArtwork
     */
    currentPlayingArtwork = () => {
        return <img className={"nowPlayingArtwork " + this.state.nowPlayingClass} src={this.state.currentArtworkSource}></img>
    }

    /**
     * Returns the the currentlyPlayingText
     */
    currentPlayingText = () => {
        return (
            <div className="minimized-song-name">
                <span style={{ fontSize: "1.3em" }}>{this.state.currentSongName}</span>
            </div>
        )
    }

    /**
     * Returns the buttons to be displayed in the now playing view that is minimized.
     */
    minimizedMediaActions = () => {
        if (this.state.nowPlayingClass !== "open") {

            let playPauseBtn = () => {
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
                        showBgOnMouseDown={true}/>
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
                        showBgOnMouseDown={true}/>
                }



            }


            return (<div style={{ position: "absolute", right: 3, top: 12 }}>
                {playPauseBtn()}

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
            </div>)
        }
    }
    render() {
        return (
            <span>
                <div onClick={this.showView} className={"now-playing " + this.state.nowPlayingClass} >
                    {this.getDownChevron()}
                    {this.currentPlayingArtwork()}
                    {this.currentPlayingText()}
                    {this.minimizedMediaActions()}
                </div>
                <div onClick={(e) => { this.hideView(e) }} className={this.state.blurBackgroundClass}>
                </div>
            </span>

        )
    }
}

const mapStateToProps = (state) => ({
    musicKitInstance: state.library.musicKitInstance
})

export default connect(mapStateToProps, null)(NowPlaying);
