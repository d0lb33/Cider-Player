import React, { Component } from 'react'
import {formatImgSrc} from '../consts'
import { Row, Col } from 'antd';
export default class CellItem extends Component {
  render() {
    return (
        <div
        style={this.props.style}
    >
        <div className="listItem" onClick={() => {
            this.props.cellItemClicked();
        }}>
            {this.props.imgSrc ? <div style={{ borderRadius: "5px", float: "left", backgroundColor: "#e8e8e8" }}>
                <img
                    alt={this.props.firstCol + " artwork"}
                    style={{ borderRadius: "5px" }}
                    width={50}
                    height={50}
                    onError={() => { console.log("HANDLE THIS JONATHAN< DAMN") }}
                    src={formatImgSrc(this.props.imgSrc, 200, 200)}>
                </img>
            </div> : ""}

            <div style={{ borderBottom: "1px solid #e8e8e8", lineHeight: "50px", marginLeft: 60, fontSize: "1.2em" }}>
                <Row gutter={20}>
                    <Col className="ellipsis" span={10}>
                        {this.props.firstCol}
                    </Col>
                    <Col className="ellipsis" span={7}>
                        <span style={{ color: "#99999b" }}>{this.props.secondCol}</span>
                    </Col>
                    <Col className="ellipsis" span={7}>
                        <span style={{ color: "#99999b" }}>{this.props.thirdCol}</span>
                    </Col>
                </Row>
            </div>
        </div>
    </div>
    )
  }
}
