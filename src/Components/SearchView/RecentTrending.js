import React, { Component } from 'react';
import { Col, Row } from 'antd';
import { connect } from 'react-redux';
import { getRecentlySearchedItems, addRecentlySearchedItem, clearRecentlySearchedItems } from '../../actions/recentTrendingActions';



let rfStyle = {
    fontWeight: "bold", color: "black", fontSize: "1.4em", 
}

let clearBtnStyle = {
    float: "right", paddingRight: "10px", color: "#f80759", cursor: "pointer"
}

class RecentTrending extends Component {

    constructor(props) {
        super(props);

        this.state = {
            recentSearchItems: []
        }
    }

    componentWillMount = () => {
        this.props.getRecentlySearchedItems();
        this.setState({
            recentSearchItems : this.props.searchTerms 
        })
    }
    
    componentWillReceiveProps = (incomingProps) => {
        if(this.props !== incomingProps){
            this.setState({
                recentSearchItems : incomingProps.searchTerms
            }) 
        }
    }

    /**
     * Creates and returns the ui responsible for displaying the recent search list
     */
    getRecentSearchList = () => {
        if (this.state.recentSearchItems.length === 0) {
            return <span style={{ color: "#c5c5c5" }}>No Recent Search Terms</span>
        }

        // Store every search in localstorage
        // Map through them and display here
        var recentResultList = []; // Array of recent elements
        try {
            this.state.recentSearchItems.forEach((searchQuery, i) => {
                recentResultList.unshift(<h4 key={searchQuery + i}>{searchQuery}</h4>)
            })
        } catch (error) {
            /**
             * TODO: Call action clear all
             */
            //this.clearRecentSearchItems()
        }

        return <div>{recentResultList}</div>;
    }

    getClearBtn = () => {
        if(this.state.recentSearchItems.length !== 0){
            return <Col xs={4} onClick={() => this.props.clearRecentlySearchedItems()}><span style={clearBtnStyle}>Clear</span></Col>
        }
    }

    render() {
        return (
            <div>
                {/* 
                * Recent and trending component/format
                */}
                <Row>
                    <Col xs={24} sm={12}>
                        <div style={{ paddingTop: 10 }}>
                            <Row>
                                <Col xs={20} style={rfStyle}>Recent</Col>
                                {this.getClearBtn()}
                            </Row>
                            {this.getRecentSearchList()}
                        </div>
                    </Col>
                    <Col xs={24} sm={12}>
                        <div style={{ paddingTop: 10 }}>
                            <div style={rfStyle}>
                                Trending
                            </div>
                            Error: Not able to fetch trending
                        </div>
                    </Col>
                </Row>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    searchTerms: state.recentTrending.recentlySearchedTerms,
    searchTermsLength : state.recentTrending.recentlySearchedTerms.length
});
  
export default connect(mapStateToProps, { getRecentlySearchedItems, addRecentlySearchedItem, clearRecentlySearchedItems})(RecentTrending)