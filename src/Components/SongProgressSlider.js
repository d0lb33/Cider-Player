import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Slider } from 'antd';

class SongProgressSlider extends Component {
    render() {
        return (
            <div style={{ width: "90%", margin: "auto" }}>
            <Slider 
            tipFormatter={(e) => {
                console.log(e);
                return e;
            }}
            max={100}
            />
            </div>

        )
    }
}

export default connect(null, null)(SongProgressSlider)
