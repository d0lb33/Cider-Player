import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Slider } from 'antd';

class SongProgressSlider extends Component {

    constructor(props) {
        super(props);

        this.state = {
            progress: 0, // Song progress, updated in the playbackTimeDidChange event
            timeRemaining: 0, // Time remaining, updated in the playbackTimeDidChange event
            userIsSliding: false, // Helps to determine when the slider should listen to apples api, or the user input
            userValue: 0 // Value set while sliding
        }
    }

    componentDidMount = () => {
        /**
         * Add an event listener to check for the playbackTime changing. Update our state with that information. Forceibly if need be ;)
         */
        this.props.musicKitInstance.player.addEventListener("playbackTimeDidChange", (e) => {
            this.setState({
                progress: e.currentPlaybackTime,
                timeRemaining: e.currentPlaybackTimeRemaining
            });

            this.forceUpdate();
        })
    }

    /**
     * Bad idea to not remove this event before unmounting, so lets do that here
     */
    componentWillUnmount = () => {
        this.props.musicKitInstance.player.removeEventListener("playbackTimeDidChange");
    }

    /**
     * If the user is moving the slider, we want that value. This method handles that.
     */
    getSliderValue = () => {
        if (!this.state.userIsSliding) {
            return this.state.progress;
        } else {
            return this.state.userValue
        }
    }

    /**
     * Gets the marks that display at the begining and end of the track beneath it.
     */
    getMarks = () => {
        if(this.props.musicKitInstance.player.currentPlaybackDuration === 0){
            return;
        }
        const marks = {
            0: window.MusicKit.formatMediaTime(this.state.progress),
            [this.props.musicKitInstance.player.currentPlaybackDuration]: "-" + window.MusicKit.formatMediaTime(this.state.timeRemaining)
          };

          return marks;
    }

    render() {
        return (
            <div className="progress-slider" style={{ width: "90%", margin: "auto" }}>
                <Slider
                    marks={this.getMarks()}
                    tipFormatter={(e) => {
                        return window.MusicKit.formatMediaTime(e);
                    }}
                    onChange={(e) => {
                        this.setState({ userIsSliding: true, userValue: e })
                    }}
                    onAfterChange={(e) => {
                        // Prevents this from getting called when the user unfocuses from the slider.
                        if (this.state.userIsSliding && this.props.musicKitInstance.player.nowPlayingItem) {
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
