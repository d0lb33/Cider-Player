
import React, { Component } from 'react'
import { APPLE_BTN_BACKGROUND, APPLE_PINK, APPLE_GREY } from './ColorConsts';
import { CustomIcon } from './CustomIcons';

// Defaults
const WIDTH = 25;
const HEIGHT = 25;
const BTN_WIDTH = 200;

const tabStyle = {
    cursor: "pointer",
};

function filledBtnStyle(props) {
    return {
        cursor: "pointer",
        fontSize: 25,
        textAlign: "center",
        borderRadius: 15,
        padding: "10px 15px 10px 15px",
        width: props.btnWidth ? props.btnWidth : BTN_WIDTH,
        lineHeight: "48px",
        height: "50px",
        margin: "auto"
    }
};

function iconBtnStyle(props) {
    return {
        cursor: "pointer",
    }
}

export default class AppleButton extends Component {
    constructor(props) {
        super(props);

        this.state = {
            hovered: false,
            mouseDown: false,
            style: {},
            hideText: false,
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
                    style: filledBtnStyle(this.props),
                    customIconStyle: { marginTop: "-5px" }
                });
                break;
            case "icon":
                this.setState({
                    style: iconBtnStyle(this.props),
                    hideText: true
                });
                break;
            default:
                this.setState({
                    style: filledBtnStyle(this.props)
                });
        }
    }

    getSelectedStatus = () => {
        if (this.props.notSelectable) return
        if (this.props.selected) {
            return this.props.selected;
        } else {
            return this.state.hovered;
        }
    }

    getBtnIcon = () => {
        return (
            <span
                style={{ position: "relative" }}>

                <CustomIcon
                    icon={this.props.icon}
                    width={this.props.width ? this.props.width : WIDTH}
                    height={this.props.height ? this.props.height : HEIGHT}
                    selected={this.getSelectedStatus()}
                    customIconStyle={this.state.customIconStyle}
                    type={this.props.type}
                />
            </span>)
    }

    getBGColor = () => {
        if (this.props.type === "filled"){
            if (this.getSelectedStatus()){
                return APPLE_PINK
            }else {
                return APPLE_BTN_BACKGROUND
            }
        }
    }

    getBtnText = () => {

        if (this.state.hideText) return;

        let getTextColor = () => {
            if (this.props.type === "filled"){
                if (this.getSelectedStatus()) {
                    return "white";
                } else {
                    return APPLE_PINK;
                }
            }else if (this.getSelectedStatus()) {
                return APPLE_PINK;
            } else {
                return APPLE_GREY;
            }
        }

        return <span style={{ paddingLeft: this.props.icon ? 6 : 0, color: getTextColor(), fontWeight: "bold" }}>{this.props.title}</span>
    }

    render() {
        let bgDiv = () => {
            // Displays a gray silhoutte behind the button
            if (this.props.showBgOnMouseDown && this.state.mouseDown) {
                // Look into doing this with padding, and then enable for all
                return (
                    <div style={{ zIndex: "-1", position: "absolute", backgroundColor: "rgba(197, 197, 197, .4)", width: 50, height: 50, left: "-6.5px", top: "-14px", borderRadius: "100px" }}>
                    </div>)
            }

        }

        return (
            <span
                className="unselectable"
                style={{ ...this.state.style, ...{ position: "relative", backgroundColor: this.getBGColor() } }}
                onMouseOut={() => this.setState({ hovered: false })}
                onMouseOver={() => this.setState({ hovered: true })}

                onMouseDown={() => this.setState({ mouseDown: true })}
                onMouseUp={() => this.setState({ mouseDown: false })}
                onClick={this.props.onClick} >

                {this.getBtnIcon()}
                {this.getBtnText()}

                {bgDiv()}
            </span>
        )
    }
};