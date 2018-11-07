import React, { Component } from 'react'
import { connect } from 'react-redux';
import AppleButton from '../UIElements/AppleButton';
import { Modal, Spin } from 'antd';
import { authenticateUser } from "../actions/libraryActions";

class LoginModal extends Component {

  // Add event listener to onclick so we know if the autorization status changes.
  onClick = () => {
    this.props.authenticateUser();
  }

  render() {
    return (
      <Modal
        centered
        visible={!this.props.isAuthenticated}
        footer={null}
        closable={false}
      >
      <Spin spinning={!this.props.musicKitLoaded} tip="Loading MusicKitJS" >
      <div className="login-modal">
        <h1>Cider Player</h1>

        <p>Cider Player requires you to sign in with your Apple ID that is associated with your Apple Music account. The upcoming popup window is fully controlled by Apple™ and credentials will not be stored. If you would like to 
          deauthorize Cider Player from your apple account follow the instructions listed here: <a target="_blank" rel="noopener noreferrer" href="https://support.apple.com/en-us/HT207830">https://support.apple.com/en-us/HT207830</a>
        </p>
        <br /><br /><br />
        <AppleButton onClick={() => this.onClick()} btnWidth={120} notSelectable type="filled" title={"Login"} />
        <br /><br />
        Made Possible with <a target="_blank" rel="noopener noreferrer" href="https://developer.apple.com/documentation/musickitjs" >MusicKitJS</a> | Developed by Jonathan Dolbee
        
      </div>
      </Spin>
      </Modal>
    )
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.library.isAuthenticated,
  musicKitInstance : state.library.musicKitInstance,
  musicKitLoaded: state.library.musicKitLoaded
})

export default connect(mapStateToProps, {authenticateUser})(LoginModal);