import React, { Component } from 'react'
import AppleButton from '../UIElements/AppleButton';
import { Row, Col } from 'antd';
import { APPLE_GREY } from '../UIElements/ColorConsts';
import { connect } from 'react-redux';
import { updatePage } from '../actions/pageActions';
import { PAGENAMES } from '../consts';


class BottomNavBar extends Component {

    onClick = (e) => {
        this.props.updatePage(e);
    }

    shouldBeSelected = (e) => {
        if (this.props.currentPage === e) {
            return true;
        } else {
            return false;
        }
    }

    render() {
        return (
            <div className="bottom-nav-bar">
                <Row>
                    <Col span={17}>
                        <span className="content">
                            <AppleButton type="tab" selected={this.shouldBeSelected(PAGENAMES.LIBRARY)} onClick={() => this.onClick(PAGENAMES.LIBRARY)} icon="music-library" title={"Library"} />
                            <AppleButton type="tab" selected={this.shouldBeSelected(PAGENAMES.FOR_YOU)} onClick={() => this.onClick(PAGENAMES.FOR_YOU)} icon="for-you" title={"For You"} />
                            <AppleButton type="tab" selected={this.shouldBeSelected(PAGENAMES.BROWSE)} onClick={() => this.onClick(PAGENAMES.BROWSE)} icon="browse" title={"Browse"} />
                            <AppleButton type="tab" selected={this.shouldBeSelected(PAGENAMES.RADIO)} onClick={() => this.onClick(PAGENAMES.RADIO)} icon="radio-waves" title="Radio" />
                            <AppleButton type="tab" selected={this.shouldBeSelected(PAGENAMES.SEARCH)} onClick={() => this.onClick(PAGENAMES.SEARCH)} icon="search" title="Search" />
                        </span>
                    </Col>
                    <Col span={1}>
                        <div style={{ backgroundColor: APPLE_GREY }} className="divider"></div>
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

const mapStateToProps = state => ({
    currentPage: state.page.currentPage,
    musicKitInstance : state.library.musicKitInstance
});

export default connect(mapStateToProps, { updatePage })(BottomNavBar)