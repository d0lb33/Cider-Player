import React, { Component } from 'react';
import BottomNavBar from './Components/BottomNavBar';
import { connect } from 'react-redux';
import LoginModal from './Components/LoginModal';
import {setupMusicKit} from './actions/libraryActions';
import LibraryView from './Components/LibraryView';
import { PAGENAMES } from './consts';

class App extends Component {

  constructor(props) {
    super(props);

  }

  componentDidMount = () => {
    
    this.props.setupMusicKit();
    
  }

  getCurrentView = () => {
   if (this.props.musicKitLoaded && this.props.isAuthenticated && this.props.currentPage === PAGENAMES.LIBRARY) return <LibraryView />
  }


  render() {
    return (
      <div>
        <LoginModal />
        {this.getCurrentView()}
        <BottomNavBar />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  isAuthenticated : state.library.isAuthenticated,
  currentPage : state.page.currentPage,
  musicKitLoaded : state.library.musicKitLoaded
})

export default connect(mapStateToProps, {setupMusicKit})(App);
