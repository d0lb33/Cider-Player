import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Row, Col } from 'antd';
import { formatImgSrc, SUBPAGENAMES } from '../consts';
import { fetchPlaylistSongs, setSongsInView } from '../actions/libraryActions';
import { updateSubPageRouting } from '../actions/pageActions';

class PlaylistsGridList extends Component {

    renderGridItems = () => {
        let items = this.props.playlists.map((playlist) => {
            return (
                <Col key={playlist.id} xs={24} sm={12} md={6} lg={5} xl={4}>
                    <div
                        onClick={() => {
                            this.props.fetchPlaylistSongs(playlist.id);
                            var x = this.props.subPageRouting;
                            x.push({ page: SUBPAGENAMES.SONGS, viewName: playlist.attributes.name, artworkSrc: formatImgSrc(playlist.attributes.artwork.url, 200, 200) });
                            this.props.updateSubPageRouting(x)
                        }}
                        style={{ fontSize: "1.0em", fontWeight: "bold", color: "black", margin: "auto", marginBottom: "30px", cursor: "pointer" }}>
                        <img
                        style={{width: "100%", height: "100%"}}
                            src={formatImgSrc(playlist.attributes.artwork.url, 500, 500)}>
                        </img>
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
    playlists: state.library.playlists,
    subPageRouting: state.page.subPageRouting
})

export default connect(mapStateToProps, { fetchPlaylistSongs, updateSubPageRouting })(PlaylistsGridList)
