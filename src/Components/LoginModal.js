import React, { Component } from 'react'
import { connect } from 'react-redux';
import AppleButton from '../UIElements/AppleButton';
class LoginModal extends Component {
  render() {
    return (
      <div>
        <h1>Login</h1>

        <AppleButton icon="shuffle" title={"Shuffle"} />
        {this.props.isAuthenticated ? "Authed" : "Not Authed"}
      </div>
    )
  }
}

const mapStateToProps = state => ({
    isAuthenticated : state.library.isAuthenticated
})

export default connect(mapStateToProps, null)(LoginModal);