import React, { Component } from 'react'
import { Input} from 'antd';
import RecentTrending from './RecentTrending';
import _ from 'lodash'
import DropDownSearchResults from './DropDownSearchResults';
import { connect } from 'react-redux';
import { fetchSearchResults } from '../../actions/libraryActions';
class SearchView extends Component {

  constructor(props){
    super(props);

    this.state = {
      inputValue: "",
      showResults : false
    }
  }

  /**
   * Handles the search input and updates the UI based off of it
   */
  handleSearchInput = (e) => {
    if (e.target.value == "") {
      this.setState({
        showResults: false,
        inputValue: e.target.value,
      })
    } else {
      this.setState({
        inputValue: e.target.value,
      }, this.debounceSearchResults())
    }
  }

  /**
   * Debounces the search results so we arent making hundreds of api calls per second. 
   * Only when the user stops typing
   */
  debounceSearchResults = _.debounce(() =>  {
    this.setState({showResults : true})
    this.props.fetchSearchResults(this.state.inputValue);
  }, 500)

  /**
   * Returns the area below the search input.
   * Determines if this will be the DropDownSearchResult view
   * or the RecentTrendingView
   */
  getBottomArea = () => {
    if (this.state.showResults){
      return <DropDownSearchResults />
    } else {
      return <RecentTrending />
    }
  }

  render() {
    return (
      <div style={{ margin: "15px", paddingBottom: "50px" }} >
        <span className="page-title"><b>Search</b></span>
        <Input onChange={(e) => {this.handleSearchInput(e)}} value={this.state.inputValue} placeholder="Artists, Songs, Playlists, and More"></Input>
        {this.getBottomArea()}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  search: state.library.search,
});

export default connect(mapStateToProps, { fetchSearchResults })(SearchView)


