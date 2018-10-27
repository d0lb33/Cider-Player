import React, { Component } from 'react'
import AppleButton from '../UIElements/AppleButton';
import ChevronDown from '../icons/chevron-down-grey.png';
import { CustomIcon } from '../UIElements/CustomIcons';

export default class NowPlaying extends Component {
    constructor(props) {
        super(props);

        this.state = {
            nowPlayingClass: "",
            blurBackgroundClass: "",
        }
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
        return <img style={{ margin: "8px 8px 8px 0px", float: "left", borderRadius: "5px", backgroundColor: "grey" }} height={50} width={50} src="https://us.rosco.com/sites/default/files/Rosco_Screens_FrontWhite.jpg"></img>
    }

    currentPlayingText = () => {
        return (
            <div className="minimized-song-name">
                <span style={{ fontSize: "1.3em" }}>Not Playing</span>
            </div>
        )
    }
    minimizedMediaActions = () => {
        if (this.state.nowPlayingClass !== "open") {
           return( <div style={{ position: "absolute", right: 0, top: 8 }}>
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
