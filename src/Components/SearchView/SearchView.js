import React, { Component } from 'react'
import { Input} from 'antd';
import RecentTrendingView from './RecentTrendingView';

export default class SearchView extends Component {

  constructor(props){
    super(props);

    this.state = {
      recentSearchItems : [],
      inputValue: ""
    }
  }

  /**
   * Handles the search input and updates the UI based off of it
   */
  handleSearchInput = (e) => {
    this.setState({
      inputValue : e.target.value
    })
  }

  render() {
    return (
      <div style={{ margin: "15px" }} >
        <span className="page-title"><b>Search</b></span>
        <Input onChange={(e) => {this.handleSearchInput(e)}} value={this.state.inputValue} placeholder="Artists, Songs, Playlists, and More"></Input>
        <RecentTrendingView />
      </div>
    )
  }
}


