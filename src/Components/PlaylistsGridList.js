import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Row, Col } from 'antd';
import { formatImgSrc, SUBPAGENAMES } from '../consts';
import { fetchPlaylistSongs } from '../actions/libraryActions';
import { updateSubPageRouting } from '../actions/pageActions';

class PlaylistsGridList extends Component {

    renderGridItems = () => {
        let items = this.props.playlists.map((playlist) => {
            return (
                <Col key={playlist.id} xs={24} sm={12} md={8} lg={6} xl={6}>
                    <div style={{ width: "200px", height: "200px", margin: "auto", marginBottom: "30px" }}>
                        
                        <img
                        onClick={() => {
                            this.props.fetchPlaylistSongs(playlist.id);
                            var x = this.props.subPageRouting;
                            x.push({ page: SUBPAGENAMES.SONGS });
                            this.props.updateSubPageRouting(x)
                        }}
                        src={formatImgSrc(playlist.attributes.artwork.url, 200, 200)}></img>
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
    playlists: state.library.playlists,
    subPageRouting : state.page.subPageRouting
})

export default connect(mapStateToProps, {fetchPlaylistSongs, updateSubPageRouting})(PlaylistsGridList)
