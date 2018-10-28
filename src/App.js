import React, { Component } from 'react';
import BottomNavBar from './Components/BottomNavBar';
import { connect } from 'react-redux';
import LoginModal from './Components/LoginModal';
import { setupMusicKit } from './actions/libraryActions';
import { dismissAlert } from "./actions/pageActions";
import LibraryView from './Components/LibraryView';
import { PAGENAMES } from './consts';
import { Alert } from 'antd';

class App extends Component {

  componentDidMount = () => {
    this.props.setupMusicKit();

  }

  getCurrentView = () => {
    if (this.props.musicKitLoaded && this.props.isAuthenticated && this.props.currentPage === PAGENAMES.LIBRARY) return <LibraryView />
  }

  getAlert = () => {
    if (this.props.showAlert) {

      return (
        <div style={{ position: "fixed", display: "inline-block", bottom: 70, right:15, zIndex: 1 }}>
          <Alert style={{paddingRight:60}} {...this.props.alertProps} onClose={this.props.dismissAlert} />
        </div>)
    }
  }

  render() {
    return (
      <div>
        {this.getAlert()}
        <LoginModal />
        {this.getCurrentView()}
        <BottomNavBar />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.library.isAuthenticated,
  currentPage: state.page.currentPage,
  musicKitLoaded: state.library.musicKitLoaded,
  showAlert: state.page.showAlert,
  alertProps: state.page.alertProps
})

export default connect(mapStateToProps, { setupMusicKit, dismissAlert })(App);
