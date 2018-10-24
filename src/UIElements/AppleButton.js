
import React, { Component } from 'react'
import { APPLE_BTN_BACKGROUND, APPLE_PINK, APPLE_GREY } from './ColorConsts';
import { PlayArrow, Shuffle } from './CustomIcons';
import  {CustomIcon} from './CustomIcons';

// Defaults
const WIDTH = 25;
const HEIGHT = 25;

export default class AppleButton extends Component {

    getButton = () => {
        switch (this.props.type) {
            case "tab":
                return <TabAppleButton {...this.props} />
            default:
                return <DefaultAppleButton {...this.props} />
        }
    }

    render() {
        return this.getButton();
    }
}



class DefaultAppleButton extends Component {
    render() {
        return (
            <div>
                <div className="unselectable" style={{ cursor: "pointer", height: "50px", width: "125px", fontSize: "20px", textAlign: "center", borderRadius: 15, backgroundColor: APPLE_BTN_BACKGROUND, lineHeight: "50px" }}>
                    <Shuffle selected width={15} /><b style={{ paddingLeft: 6, color: APPLE_PINK }}>{"Shuffle"}</b>
                </div>
                <br />
                <div className="unselectable" style={{ cursor: "pointer", height: "50px", width: "125px", fontSize: "20px", textAlign: "center", borderRadius: 15, backgroundColor: APPLE_BTN_BACKGROUND, lineHeight: "50px" }}>
                    <PlayArrow selected width={15} /><b style={{ paddingLeft: 6, color: APPLE_PINK }}>{"Play"}</b>
                </div>
            </div>
        )

    }
}

class TabAppleButton extends Component {
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

    render() {
        return (
            <span onMouseOut={() => this.setState({ hovered: false })} onMouseOver={() => this.setState({ hovered: true })} onClick={this.props.onClick} className="unselectable" style={{ cursor: "pointer" }}>
                <CustomIcon
                    icon={this.props.icon}
                    width={this.props.width ? this.props.width : WIDTH}
                    height={this.props.height ? this.props.height : HEIGHT}
                    selected={this.props.selected ? this.props.selected : this.state.hovered} />
                <span style={{ paddingLeft: 6, color: this.getTextColor() }}>{this.props.title}</span>
            </span>
        )
    }
};

