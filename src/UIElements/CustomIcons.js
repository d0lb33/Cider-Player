// Thanks to icons8 for this!

import React, { Component } from 'react'

import MusicLibraryPink from '../icons/music-libary-pink.png';
import MusicLibraryGrey from '../icons/music-libary-grey.png';
import ForYouPink from '../icons/for-you-pink.png';
import ForYouGrey from '../icons/for-you-grey.png';

export class MusicLibrary extends Component {
    render() {
        var imgSrc;
        if (this.props.selected) {
            imgSrc = MusicLibraryPink;
        } else {
            imgSrc = MusicLibraryGrey;
        }
        return <img width={this.props.width} height={this.props.height} src={imgSrc}></img>
    }
};

export class ForYou extends Component {
    render() {
        var imgSrc;
        if (this.props.selected) {
            imgSrc = ForYouPink;
        } else {
            imgSrc = ForYouGrey;
        }
        return <img width={this.props.width} height={this.props.height} src={imgSrc}></img>
    }
}