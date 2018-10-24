
import React, { Component } from 'react'
import { APPLE_BTN_BACKGROUND, APPLE_PINK, APPLE_GREY } from './ColorConsts';
import { PlayArrow, Shuffle } from './CustomIcons';
import { CustomIcon } from './CustomIcons';

// Defaults
const WIDTH = 25;
const HEIGHT = 25;

/*
<span className="unselectable" style={{ cursor: "pointer", height: "50px", width: "125px", fontSize: "20px", textAlign: "center", borderRadius: 15, backgroundColor: APPLE_BTN_BACKGROUND, lineHeight: "50px" }}>
    <Shuffle selected width={15} /><b style={{ paddingLeft: 6, color: APPLE_PINK }}>{"Shuffle"}</b>
</span>

*/

const tabStyle = {
    cursor: "pointer"
};

function filledBtnStyle(props) {
    console.log(props)
    return {
        cursor: "pointer",
        fontSize: 30,
        textAlign: "center",
        borderRadius: 15,
        width: props.btnWidth ? props.btnWidth : 200,
        backgroundColor: props.btnBackgroundColor ? props.btnBackgroundColor : APPLE_BTN_BACKGROUND,
        lineHeight: props.height ? props.height : "50px",
        height: props.height ? props.height : "50px",
    }
};

export default class AppleButton extends Component {
    constructor(props) {
        super(props);

        this.state = {
            hovered: false,
        }
    }

    getTextColor = () => {
        if (this.props.selected || this.state.hovered) {
            return APPLE_PINK;
        } else {
            return APPLE_GREY;
        }
    }

    getBtnStyle = () => {
        switch (this.props.type) {
            case "tab":
                return tabStyle;
            default:
                return filledBtnStyle(this.props);
        }
    }

    render() {
        return (
            <div style={this.getBtnStyle()} onMouseOut={() => this.setState({ hovered: false })} onMouseOver={() => this.setState({ hovered: true })} onClick={this.props.onClick} className="unselectable" >

                <CustomIcon
                    icon={this.props.icon}
                    width={this.props.width ? this.props.width : WIDTH}
                    height={this.props.height ? this.props.height : HEIGHT}
                    selected={this.props.selected ? this.props.selected : this.state.hovered} />
                <span style={{ paddingLeft: 6, color: this.getTextColor() }}>{this.props.title}</span>
            </div>
        )
    }
};

