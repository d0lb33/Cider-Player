// Thanks to icons8 for this!

import React, { Component } from 'react'
import BrowsePink from '../icons/browse-pink.png';
import BrowseGrey from '../icons/browse-grey.png';
import FastForwardBlack from '../icons/fast-forward-black.png';
import ForYouPink from '../icons/for-you-pink.png';
import ForYouGrey from '../icons/for-you-grey.png';
import LoginArrowPink from '../icons/login-arrow-pink.png';
import LoginArrowGrey from '../icons/login-arrow-grey.png';
import MusicLibraryPink from '../icons/music-libary-pink.png';
import MusicLibraryGrey from '../icons/music-libary-grey.png';
import PauseBlack from '../icons/pause-black.png';
import PlayArrowPink from '../icons/play-arrow-pink.png';
import PlayArrowBlack from '../icons/play-arrow-black.png';
import PlayArrowGrey from '../icons/play-arrow-grey.png';
import RadioWavesPink from '../icons/radio-waves-pink.png';
import RadioWavesGrey from '../icons/radio-waves-grey.png';
import SearchPink from '../icons/search-pink.png';
import SearchGrey from '../icons/search-grey.png';
import ShufflePink from '../icons/shuffle-pink.png';
import ShuffleGrey from '../icons/shuffle-grey.png';

export class Browse extends Component {

    render() {
        var imgSrc;
        if (this.props.selected) {
            imgSrc = BrowsePink;
        } else {
            imgSrc = BrowseGrey;
        }
        return <img alt={this.props.icon} width={this.props.width} height={this.props.height} src={imgSrc}></img>
    }
}

export class FastForward extends Component {

    render() {
        var imgSrc;
        imgSrc = FastForwardBlack;
        return <img alt={this.props.icon} width={this.props.width} height={this.props.height} src={imgSrc}></img>
    }
}

export class ForYou extends Component {

    render() {
        var imgSrc;
        if (this.props.selected) {
            imgSrc = ForYouPink;
        } else {
            imgSrc = ForYouGrey;
        }
        return <img alt={this.props.icon} width={this.props.width} height={this.props.height} src={imgSrc}></img>
    }
}

export class LoginArrow extends Component {

    render() {
        var imgSrc;
        if (this.props.selected) {
            imgSrc = LoginArrowPink;
        } else {
            imgSrc = LoginArrowGrey;
        }
        return <img alt={this.props.icon} width={this.props.width} height={this.props.height} src={imgSrc}></img>
    }
}

export class MusicLibrary extends Component {
    render() {
        var imgSrc;
        if (this.props.selected) {
            imgSrc = MusicLibraryPink;
        } else {
            imgSrc = MusicLibraryGrey;
        }
        return <img alt={this.props.icon} width={this.props.width} height={this.props.height} src={imgSrc}></img>
    }
};

export class Pause extends Component {
    render() {
        var imgSrc = PauseBlack;
        return <img alt={this.props.icon} width={this.props.width} height={this.props.height} src={imgSrc}></img>
    }
};

export class PlayArrow extends Component {
    render() {
        var imgSrc;
        if (this.props.selected) {
            imgSrc = PlayArrowPink;
        } else {
            imgSrc = PlayArrowBlack;
        }
        return <img alt={this.props.icon} width={this.props.width} height={this.props.height} src={imgSrc}></img>
    }
};

export class RadioWaves extends Component {

    render() {
        var imgSrc;
        if (this.props.selected) {
            imgSrc = RadioWavesPink;
        } else {
            imgSrc = RadioWavesGrey;
        }
        return <img alt={this.props.icon} width={this.props.width} height={this.props.height} src={imgSrc}></img>
    }
}

export class Search extends Component {

    render() {
        var imgSrc;
        if (this.props.selected) {
            imgSrc = SearchPink;
        } else {
            imgSrc = SearchGrey;
        }
        return <img alt={"browse"} width={this.props.width} height={this.props.height} src={imgSrc}></img>
    }
}

export class Shuffle extends Component {

    render() {
        var imgSrc;
        if (this.props.selected) {
            imgSrc = ShufflePink;
        } else {
            imgSrc = ShuffleGrey;
        }
        return <img alt={"browse"} width={this.props.width} height={this.props.height} src={imgSrc}></img>
    }
}



export class CustomIcon extends Component {
    render() {
        switch (this.props.icon) {
            case "fast-forward":
                return <FastForward {...this.props} />
            case "for-you":
                return <ForYou {...this.props} />
            case "login-arrow":
                return <LoginArrow {...this.props} />
            case "music-library":
                return <MusicLibrary {...this.props} />
            case "play-arrow":
                return <PlayArrow {...this.props} />
            case "pause":
                return <Pause {...this.props} />
            case "browse":
                return <Browse {...this.props} />
            case "radio-waves":
                return <RadioWaves {...this.props} />
            case "search":
                return <Search {...this.props} />
            case "shuffle":
                return <Shuffle {...this.props} />
            default: return null
        }
    }
}