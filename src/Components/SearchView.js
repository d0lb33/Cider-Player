import React, { Component } from 'react'
import { Input, Col, Row } from 'antd';

var rfStyle = {
  fontWeight: "bold", color: "black", fontSize: "1.4em" 
}
export default class SearchView extends Component {

  constructor(props){
    super(props);

    this.state = {
      recentSearchItems : [],
      inputValue: ""
    }
  }

  componentWillMount = () => {
    this.setState({
      recentSearchItems : this.getRecentSearchItems()
    })
  }

  getRecentSearchList = () => {

    if(this.state.recentSearchItems.length === 0){
      return <span style={{color: "#c5c5c5"}}>No Recent Search Terms</span>
    }
    console.log("s")

    // Store every search in localstorage
    // Map through them and display here

    var recentResultList = []; // Array of recent elements
    try {
      this.state.recentSearchItems.map((searchQuery) => {
        recentResultList.push(<h4>{searchQuery}</h4>)
      })
    } catch (error) {
      this.clearRecentSearchItems()
    }
    
    return <div>{recentResultList}</div>;
  }

  clearRecentSearchItems = () => {
    localStorage.removeItem("searchItems");
    this.setState({
      recentSearchItems : []
    })
  }

  addRecentSearchItem = (item) => {
    if (item === null || item === "") return;

    var currentItems = this.getRecentSearchItems();
    currentItems.push(item)
    localStorage.setItem("searchItems", JSON.stringify(currentItems)); 
    this.setState({
      recentSearchItems : currentItems
    })
  }

  getRecentSearchItems = () => {
    try {
      let items = localStorage.getItem("searchItems");
      if(items === null){
        return []
      }else {
        return JSON.parse(items);
      }
    } catch (error) {
      // parsing error, return an empty array
      return [];
    }
    
  }

  render() {
    return (
      <div style={{ margin: "15px" }} >
        <span className="page-title"><b>Search</b></span>

        <Input onChange={(e) => {this.setState({inputValue : e.target.value})}} value={this.state.inputValue} placeholder="Artists, Songs, Playlists, and More"></Input>

        {/* 
          * Recent and trending component/format
          */}
        <Row>
          <Col xs={24} sm={12}>
            <div style={{ paddingTop: 10 }}>
              <Row>
                <Col xs={20} style={rfStyle}>Recent</Col>
                <Col xs={4} onClick={() => this.clearRecentSearchItems()} style={{color: "#f80759", cursor: "pointer"}}>Clear</Col>
              </Row>
              {this.getRecentSearchList()}
            </div>
          </Col>
          <Col sm={24} md={12}>
            <div style={{ paddingTop: 10 }}>
              <div style={rfStyle}>
                Trending
              </div>
              {this.getRecentSearchList()}
            </div>
          </Col>
        </Row>

          <button onClick={() => {this.addRecentSearchItem(this.state.inputValue)}}>Add</button>
      </div>
    )
  }
}


