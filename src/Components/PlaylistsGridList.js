import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Row, Col } from 'antd';
import { formatImgSrc } from '../consts';

class PlaylistsGridList extends Component {

    renderGridItems = () => {
        let items = this.props.playlists.map((playlist) => {
            return (
                <Col key={playlist.id} xs={24} sm={12} md={8} lg={6} xl={6}>
                    <div style={{ width: "200px", height: "200px", margin: "auto", marginBottom: "30px" }}>
                        
                        <img src={formatImgSrc(playlist.attributes.artwork.url, 200, 200)}></img>
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
                <Row justify="center" gutter={20}>
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
