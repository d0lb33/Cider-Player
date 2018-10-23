import React, { Component } from 'react'
import { ForYou } from './CustomIcons';

export default class AppleButton extends Component {
  render() {
    return (
      <div>
        <ForYou width={25} height={25} selected/><span style={{paddingLeft: 8}}>For You</span>
      </div>
    )
  }
}
