import React, { Component } from 'react'
import { CustomIcon } from './CustomIcons';
import { APPLE_PINK, APPLE_GREY } from './ColorConsts';

// Defaults
const WIDTH = 25;
const HEIGHT = 25;

export default class AppleButton extends Component {
  constructor(props){
    super(props);

    this.state = {
      hovered : false,
    }
  }

  getTextColor = () =>{
    if (this.props.selected || this.state.hovered){
      return APPLE_PINK;
    }else{
      return APPLE_GREY;
    }
  }

  render() {
    return (
      <span onMouseOut={() => this.setState({hovered : false})} onMouseOver={() => this.setState({hovered : true})} onClick={this.props.onClick} className="unselectable" style={{cursor:"pointer"}}>
        <CustomIcon
          icon={this.props.icon}
          width={this.props.width ? this.props.width : WIDTH}
          height={this.props.height ? this.props.height : HEIGHT}
          selected={this.props.selected ? this.props.selected : this.state.hovered} />
        <span style={{ paddingLeft: 6, color: this.getTextColor()}}>{this.props.title}</span>
      </span>
    )
  }
};
