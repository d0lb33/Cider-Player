import React, { Component } from 'react'
import { connect } from 'react-redux';
import AppleButton from '../UIElements/AppleButton';
import { Modal } from 'antd';
class LoginModal extends Component {

  // Add event listener to onclick so we know if the autorization status changes.

  render() {
    return (
      <Modal
        centered
        visible={!this.props.isAuthenticated}
        footer={null}
        closable={false}
        
      >
      <div className="login-modal">
        <h1>Login To Apple Music</h1>
        
        {this.props.isAuthenticated ? "Authed" : "Not Authed"}
        <p>[Insert App Name Here] requires you to sign in with your Apple ID that is associated with your Apple Music account. The popup window is fully controlled by Apple™ and credentials will not be stored. If you would like to 
          deauthorize [inset app name here] from your apple account follow the instructions listed here: <a target="_blank" href="https://support.apple.com/en-us/HT207830">https://support.apple.com/en-us/HT207830</a>
        </p>
        <br /><br /><br /><br />
        <AppleButton onClick={() => this.props.musicKitInstance.authorize()} inverseSelection btnWidth={120} title={"Login"} />
        <br />
        Made Possible with <a target="_blank" href="https://developer.apple.com/documentation/musickitjs" >MusicKitJS</a> | Devloped by Jonathan Dolbee
        
      </div>
      </Modal>
    )
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.library.isAuthenticated,
  musicKitInstance : state.library.musicKitInstance
})

export default connect(mapStateToProps, null)(LoginModal);