
import React, { Component } from 'react'
import { APPLE_BTN_BACKGROUND, APPLE_PINK, APPLE_GREY } from './ColorConsts';
import { CustomIcon } from './CustomIcons';

// Defaults
const WIDTH = 25;
const HEIGHT = 25;

const tabStyle = {
    cursor: "pointer",
};

function filledBtnStyle(props) {
    return {
        cursor: "pointer",
        fontSize: 25,
        textAlign: "center",
        borderRadius: 15,
        width: props.btnWidth ? props.btnWidth : 200,
        backgroundColor: props.btnBackgroundColor ? props.btnBackgroundColor : APPLE_BTN_BACKGROUND,
        lineHeight: "48px",
        height: "50px",
        margin: "auto"
    }
};

export default class AppleButton extends Component {
    constructor(props) {
        super(props);

        this.state = {
            hovered: false,
            style: {},
        }



    }

    componentDidMount() {
        switch (this.props.type) {
            case "tab":
                this.setState({
                    style: tabStyle
                })
                break;
            case "filled":
                this.setState({
                    style: filledBtnStyle(this.props)
                });
            default:
                this.setState({
                    style: filledBtnStyle(this.props)
                });
        }
    }


    getTextColor = () => {

        if (this.props.inverseSelection) {
            return APPLE_PINK;
        } else {
            if (this.props.selected || this.state.hovered) {
                return APPLE_PINK;
            } else {
                return APPLE_GREY;
            }
        }
    }

    getIconSelection = () => {
        if (this.props.inverseSelection) {
            return true;
        } else {
            if (this.props.selected) {
                return this.props.selected;
            } else {
                return this.state.hovered;
            }
        }
    }

    render() {
        return (
            <div style={this.state.style} onMouseDown={() => console.log('s')} onMouseOut={() => this.setState({ hovered: false })} onMouseOver={() => this.setState({ hovered: true })} onClick={this.props.onClick} className="unselectable" >

                <CustomIcon
                    icon={this.props.icon}
                    width={this.props.width ? this.props.width : WIDTH}
                    height={this.props.height ? this.props.height : HEIGHT}
                    selected={this.getIconSelection()} />
                <span style={{ paddingLeft: this.props.icon ? 6 : 0, color: this.getTextColor(), fontWeight: "bold" }}>{this.props.title}</span>
            </div>
        )
    }
};

/**
 * icon: optional,
 * width: optional, // Width of icon
 * height: optional, // height of icon
 * selected: optional, // Weather icon is selected or not
 * inverseSelection: optional, // Weather button is always filled
 * type: required, // Type of button that should be rendered
 */