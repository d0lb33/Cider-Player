import React, { Component } from 'react';
import BottomNavBar from './Components/BottomNavBar';
import { Provider } from 'react-redux';
import store from './store';
import LoginModal from './Components/LoginModal';


class App extends Component {

  render() {
    return (
      <Provider store={store}>
        <div>
          

          <LoginModal />
          <BottomNavBar />
        </div>
      </Provider>

    );
  }
}

export default App;
