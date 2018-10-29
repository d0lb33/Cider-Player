import React, { Component } from 'react'
import AppleButton from '../UIElements/AppleButton';
import { connect } from 'react-redux';
import ChevronDown from '../icons/chevron-down-grey.png';
import { CustomIcon } from '../UIElements/CustomIcons';
import { formatImgSrc } from '../consts';

class NowPlaying extends Component {
    constructor(props) {
        super(props);

        this.state = {
            nowPlayingClass: "",
            blurBackgroundClass: "",
        }
    }

    componentDidMount = () => {
        this.props.musicKitInstance.addEventListener('playbackStateDidChange', (e) => {
            console.log(e)
            this.forceUpdate();
        });
    }

    showView = () => {
        this.setState({ nowPlayingClass: "open", blurBackgroundClass: "blurBackground" });
    }

    hideView = (e) => {
        e.preventDefault();
        e.stopPropagation();
        this.setState({ nowPlayingClass: "", blurBackgroundClass: "" })
    }

    getDownChevron = () => {
        if (this.state.nowPlayingClass === "open") {
            return <img onMouseDown={this.hideView} style={{ display: "block", margin: "auto", cursor: "pointer" }} width={35} src={ChevronDown}></img>
        }
    }

    currentPlayingArtwork = () => {
        let getSrc = () => {
            if (this.props.musicKitInstance.player.nowPlayingItem)
                return formatImgSrc(this.props.musicKitInstance.player.nowPlayingItem.attributes.artwork.url, 60, 60)
            else
                return "https://us.rosco.com/sites/default/files/Rosco_Screens_FrontWhite.jpg" // TODO: Download a gry img
        }
        return <img className={"nowPlayingArtwork " + this.state.nowPlayingClass} src={getSrc()}></img>
    }

    currentPlayingText = () => {
        let getCurrentSongName = () => {
            /*
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
                        return this.props.musicKitInstance.player.nowPlayingItem.attributes.name
                    } else {
                        return "Loading";
                    }
                case window.MusicKit.PlaybackStates.loading:
                case window.MusicKit.PlaybackStates.waiting:
                    return "Loading";
                case window.MusicKit.PlaybackStates.none:
                    return "Not Playing";
            }




        }

        return (
            <div className="minimized-song-name">
                <span style={{ fontSize: "1.3em" }}>{getCurrentSongName()}</span>
            </div>
        )
    }
    minimizedMediaActions = () => {

        let playBtn = () => {
            if (this.props.musicKitInstance.player.playbackState === window.MusicKit.PlaybackStates.playing) {
                return <span href="#" style={{ cursor: "pointer" }} onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    this.props.musicKitInstance.player.pause();
                }}><CustomIcon width={40} icon="pause" /></span>
            } else {
                return <span href="#" style={{ cursor: "pointer" }} onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    this.props.musicKitInstance.player.play();
                }}><CustomIcon width={40} icon="play-arrow" /></span>
            }
        }

        if (this.state.nowPlayingClass !== "open") {
            return (<div style={{ position: "absolute", right: 3, top: 12 }}>
                {playBtn()}
                <span href="#" style={{ cursor: "pointer" }} onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    this.props.musicKitInstance.player.skipToNextItem();
                }}><CustomIcon width={40} icon="fast-forward" /></span>
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
