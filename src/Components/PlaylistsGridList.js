import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Row, Col } from 'antd';

class PlaylistsGridList extends Component {

    renderGridItems = () => {
        let items = this.props.playlists.map((playlist) => {
            return (
                <Col span={6}>
                    <div style={{backgroundColor: "yellow", height: "400px"}}>
                        {playlist.attributes.name}
                    </div>
                </Col>
            )
        });

        return items;
    }

    render() {
        return (
            <div>
                <Row gutter={20}>
                    {this.renderGridItems()}
                </Row>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    playlists: state.library.playlists
})

export default connect(mapStateToProps)(PlaylistsGridList)
