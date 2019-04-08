import React, { Component } from 'react'
import { Input } from 'antd';


export default class SearchView extends Component {
  
  getRecentSearchList = () => {
    // Store every search in localstorage
    // Map through them and display here

    var testData = ["night shift", "lost in the middle of no where", "Ride wit me"];

    
    var recentResultList = []; // Array of recent elements

    testData.map((searchQuery) => {
      recentResultList.push(<h4>{searchQuery}</h4>)
    })

    return <div>{recentResultList}</div>;
  }
  
  render() {
    return (
      <div style={{margin: "15px"}} >
        <span className="page-title"><b>Search</b></span>

        <Input placeholder="Artists, Songs, Playlists, and More"></Input>

        {/* 
          * Recent and trending component/format
          */}
        <div style={{paddingTop: 10}}>
          <div style={{fontWeight: "bold", color:"black", fontSize:"1.4em"}}>
            Recent
          </div>
          {this.getRecentSearchList()}
        </div>

        <div>
          Trending
        </div>
      </div>
    )
  }
}


