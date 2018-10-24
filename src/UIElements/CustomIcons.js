// Thanks to icons8 for this!

import React, { Component } from 'react'
import BrowsePink from '../icons/browse-pink.png';
import BrowseGrey from '../icons/browse-grey.png';
import ForYouPink from '../icons/for-you-pink.png';
import ForYouGrey from '../icons/for-you-grey.png';
import MusicLibraryPink from '../icons/music-libary-pink.png';
import MusicLibraryGrey from '../icons/music-libary-grey.png';
import RadioWavesPink from '../icons/radio-waves-pink.png';
import RadioWavesGrey from '../icons/radio-waves-grey.png';
import SearchPink from '../icons/search-pink.png';
import SearchGrey from '../icons/search-grey.png';

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

export class CustomIcon extends Component {
    render() {
        switch (this.props.icon) {
            case "for-you":
                return <ForYou {...this.props} />
            case "music-library":
                return <MusicLibrary {...this.props} />
            case "browse":
                return <Browse {...this.props} />
            case "radio-waves":
                return <RadioWaves {...this.props} />
            case "search":
                return <Search {...this.props} />
            default:
                return <p>No Icon Given!!</p>
        }
    }
}