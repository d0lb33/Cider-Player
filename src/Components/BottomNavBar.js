import React, { Component } from 'react'
import AppleButton from '../UIElements/AppleButton';
import { Row, Col } from 'antd';
import { APPLE_GREY } from '../UIElements/ColorConsts';

export default class BottomNavBar extends Component {
    render() {
        return (
            <div className="bottom-nav-bar">
                <Row>
                    <Col span={17}>
                        <span className="content">
                            <AppleButton selected icon="music-library" title={"Library"} />
                            <AppleButton icon="for-you" title={"For You"} />
                            <AppleButton icon="browse" title={"Browse"} />
                            <AppleButton icon="radio-waves" title="Radio" />
                            <AppleButton icon="search" title="Search" />
                        </span>
                    </Col>
                    <Col span={1}>
                        <div style={{backgroundColor : APPLE_GREY}} className="divider"></div>
                    </Col>
                    <Col span={6}>
                        Not Playing
                        {/*Now Playing Component Here*/}
                    </Col>
                </Row>
            </div>
        )
    }
}
