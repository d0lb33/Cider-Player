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

    hideView = () => {
        this.setState({ nowPlayingClass: "", blurBackgroundClass: "" })
    }

    getDownChevron = () => {
        if (this.state.nowPlayingClass === "open") {
            return <img onMouseDown={this.hideView} style={{ display: "block", margin: "auto", cursor: "pointer" }} width={35} src={ChevronDown}></img>
        }
    }

    currentPlayingArtwork = () => {
        let getSrc = () => {
            if (this.props.musicKitInstance.player.isPlaying && this.props.musicKitInstance.player.nowPlayingItem.attributes)
                return formatImgSrc(this.props.musicKitInstance.player.nowPlayingItem.attributes.artwork.url, 60, 60)
            else
                return "https://us.rosco.com/sites/default/files/Rosco_Screens_FrontWhite.jpg" // TODO: Download a gry img
        }
        return <img style={{ margin: "8px 8px 8px 0px", float: "left", borderRadius: "5px", backgroundColor: "grey" }} height={50} width={50} src={getSrc()}></img>
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
                    return this.props.musicKitInstance.player.nowPlayingItem.attributes.name
                    break;
                case window.MusicKit.PlaybackStates.loading:
                case window.MusicKit.PlaybackStates.waiting:
                    return "Loading";
                    break;
                case window.MusicKit.PlaybackStates.none:
                    return "Not Playing";
                    break;
            }
        }

        return (
            <div className="minimized-song-name">
                <span style={{ fontSize: "1.3em" }}>{getCurrentSongName()}</span>
            </div>
        )
    }
    minimizedMediaActions = () => {
        if (this.state.nowPlayingClass !== "open") {
            return (<div style={{ position: "absolute", right: 0, top: 8 }}>
                <CustomIcon width={50} icon="play-arrow" />
                <CustomIcon width={50} icon="fast-forward" />
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
                <div onClick={this.hideView} className={this.state.blurBackgroundClass}>
                </div>
            </span>

        )
    }
}

const mapStateToProps = (state) => ({
    musicKitInstance: state.library.musicKitInstance
})

export default connect(mapStateToProps, null)(NowPlaying);
