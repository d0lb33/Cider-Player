import React, { Component } from 'react';
import { Input, Col, Row } from 'antd';


let rfStyle = {
    fontWeight: "bold", color: "black", fontSize: "1.4em", 
}

let clearBtnStyle = {
    float: "right", paddingRight: "10px", color: "#f80759", cursor: "pointer"
}

export default class RecentTrending extends Component {

    constructor(props) {
        super(props);

        this.state = {
            recentSearchItems: []
        }
    }

    componentWillMount = () => {
        this.setState({
            recentSearchItems : this.getRecentSearchItems()
        })
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
            this.state.recentSearchItems.map((searchQuery, i) => {
                recentResultList.push(<h4>{searchQuery}</h4>)
            })
        } catch (error) {
            this.clearRecentSearchItems()
        }

        return <div>{recentResultList}</div>;
    }

    /**
     * Clears all recently searched items
     */
    clearRecentSearchItems = () => {
        localStorage.removeItem("searchItems");
        this.setState({
            recentSearchItems: []
        })
    }

    /**
     * Adds a recently searched item to the localstorage array and updates the UI
     * @param {String} item The string you want to add to the search history list
     */
    addRecentSearchItem = (item) => {
        if (item === null || item === "") return;
        var currentItems = this.getRecentSearchItems();
        currentItems.push(item)
        // TODO: check if there are more then 5 items in this array
        localStorage.setItem("searchItems", JSON.stringify(currentItems));
        this.setState({
            recentSearchItems: currentItems
        })
    }

    /**
     * Returns the recently search items of the user from localstorage
     */
    getRecentSearchItems = () => {
        try {
            let items = localStorage.getItem("searchItems");
            if (items === null) {
                return []
            } else {
                return JSON.parse(items);
            }
        } catch (error) {
            // parsing error, return an empty array
            return [];
        }
    }

    getClearBtn = () => {
        console.log(this.state)
        if(this.state.recentSearchItems.length !== 0){
            return <Col xs={4} onClick={() => this.clearRecentSearchItems()}><span style={clearBtnStyle}>Clear</span></Col>
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
                    <Col sm={24} sm={12}>
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
