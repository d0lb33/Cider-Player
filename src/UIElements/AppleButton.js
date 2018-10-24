
import React, { Component } from 'react'
import { APPLE_BTN_BACKGROUND, APPLE_PINK } from './ColorConsts';
import { Browse, PlayArrow } from './CustomIcons';

export default class AppleButton extends Component {
    render() {
        return (
            <div style={{ cursor: "pointer",height: "50px", width: "125px", fontSize: "20px", textAlign: "center", borderRadius: 15, backgroundColor: APPLE_BTN_BACKGROUND, lineHeight: "50px" }}>
                 <PlayArrow selected width={15}/><b style={{ paddingLeft: 6,color: APPLE_PINK}}>{"Play"}</b>
            </div>
        )
    }
}
