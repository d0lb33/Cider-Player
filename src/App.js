import React, { Component } from 'react';
import BottomNavBar from './Components/BottomNavBar';
import { connect } from 'react-redux';
import LoginModal from './Components/LoginModal';
import {setupMusicKit} from './actions/libraryActions';
import LibraryView from './Components/LibraryView';

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      musicKitLoaded : false
    }
  }

  componentDidMount = () => {
    
    if (window.MusicKit) {
      //call action
      console.log('To quick')
      this.props.setupMusicKit();
      this.setState({musicKitLoaded : true});
    } else {
      document.addEventListener('musickitloaded', () => {
        //call action
        this.props.setupMusicKit();
        this.setState({musicKitLoaded : true});
      });
    }
    
  }

  testComp = () => {
   if (this.state.musicKitLoaded) return <LibraryView />
  }


  render() {
    return (
      <div>
        <LoginModal />
        {this.testComp()}
        <BottomNavBar />
      </div>
    );
  }
}

export default connect(null, {setupMusicKit})(App);
