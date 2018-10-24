import React, { Component } from 'react';
import BottomNavBar from './Components/BottomNavBar';
import { connect } from 'react-redux';
import LoginModal from './Components/LoginModal';
import {setupMusicKit} from './actions/libraryActions';

class App extends Component {

  componentDidMount = () => {
    
    if (window.MusicKit) {
      //call action
      console.log('To quick')
      this.props.setupMusicKit();
    } else {
      document.addEventListener('musickitloaded', () => {
        //call action
      });
    }
    
  }

  render() {
    return (
      <div>
        <LoginModal />
        <BottomNavBar />
      </div>
    );
  }
}

export default connect(null, {setupMusicKit})(App);
