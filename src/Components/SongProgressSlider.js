import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Slider } from 'antd';

class SongProgressSlider extends Component {

    constructor(props) {
        super(props);

        this.state = {
            progress: 0,
            timeRemaining: 0,
            userIsSliding: false,
            userValue: 0
        }
    }

    componentDidMount = () => {
        this.props.musicKitInstance.player.addEventListener("playbackTimeDidChange", (e) => {
            this.setState({
                progress: e.currentPlaybackTime,
                timeRemaining: e.currentPlaybackTimeRemaining
            });

            this.forceUpdate();
        })
    }

    componentWillUnmount = () => {
        this.props.musicKitInstance.player.removeEventListener("playbackTimeDidChange");
    }

    getSliderValue = () => {
        if (!this.state.userIsSliding) {
            return this.state.progress;
        } else {
            return this.state.userValue
        }
    }

    getMarks = () => {
        const marks = {
            0: window.MusicKit.formatMediaTime(this.state.progress),
            [this.props.musicKitInstance.player.currentPlaybackDuration]: "-" + window.MusicKit.formatMediaTime(this.state.timeRemaining)
            ,
          };

          return marks;
    }

    render() {
        return (
            <div style={{ width: "90%", margin: "auto" }}>
                <Slider
                    marks={this.getMarks()}
                    tipFormatter={(e) => {
                        return window.MusicKit.formatMediaTime(e);
                    }}
                    onChange={(e) => {
                        console.log('CLICKED' + e)
                        this.setState({ userIsSliding: true, userValue: e })
                    }}
                    onAfterChange={(e) => {
                        // Prevents this from getting called when the user unfocuses from the slider.
                        if (this.state.userIsSliding && this.props.musicKitInstance.player.nowPlayingItem) {
                            console.log("CHANGED" + e)
                            this.setState({ userIsSliding: false, userValue: e })
                            this.props.musicKitInstance.seekToTime(e);
                        }
                    }}
                    value={this.getSliderValue()}
                    max={this.props.musicKitInstance.player.currentPlaybackDuration}
                />
            </div>

        )
    }
}

const mapStateToProps = state => ({
    musicKitInstance: state.library.musicKitInstance
});

export default connect(mapStateToProps, null)(SongProgressSlider)
