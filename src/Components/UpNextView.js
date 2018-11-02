import React, { Component } from 'react'
import {connect} from 'react-redux';
import { Divider } from 'antd';

class UpNextView extends Component {
  render() {
    return (
      <div style={{backgroundColor : "#f8f8fb", height: "500px", marginTop: "23px"}}>
        <span>UP NEXT</span>
        <Divider />
      </div>
    )
  }
}

export default connect(null, null)(UpNextView);
