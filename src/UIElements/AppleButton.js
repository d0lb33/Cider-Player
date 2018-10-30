
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
        padding: "10px 15px 10px 15px",
        width: props.btnWidth ? props.btnWidth : 200,
        backgroundColor: props.btnBackgroundColor ? props.btnBackgroundColor : APPLE_BTN_BACKGROUND,
        lineHeight: "48px",
        height: "50px",
        margin: "auto"
    }
};

function iconBtnStyle(props) {
    return {

    }
}

export default class AppleButton extends Component {
    constructor(props) {
        super(props);

        this.state = {
            hovered: false,
            style: {},
            hideText: false
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

    getBtnIcon = () => {
        let getIconSelection = () => {
            if (this.props.notSelectable) return
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

        return <CustomIcon
                icon={this.props.icon}
                width={this.props.width ? this.props.width : WIDTH}
                height={this.props.height ? this.props.height : HEIGHT}
                selected={getIconSelection()}
                customIconStyle={this.state.customIconStyle}
            />
    }

    getBtnText = () => {

        if (this.state.hideText) return;

        let getTextColor = () => {
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

        return <span style={{ paddingLeft: this.props.icon ? 6 : 0, color: getTextColor(), fontWeight: "bold" }}>{this.props.title}</span>
    }

    render() {
        return (
            <span
                className="unselectable"
                style={this.state.style}
                onMouseOut={() => this.setState({ hovered: false })}
                onMouseOver={() => this.setState({ hovered: true })}
                onClick={this.props.onClick} >

                {this.getBtnIcon()}
                {this.getBtnText()}
            </span>
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