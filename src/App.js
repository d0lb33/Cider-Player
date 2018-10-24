import React, { Component } from 'react';
import BottomNavBar from './Components/BottomNavBar';
import { Provider } from 'react-redux';
import store from './store';
import AppleButton from './UIElements/AppleButton';

class App extends Component {

  render() {
    return (
      <Provider store={store}>
        <div>
          <AppleButton />
          <BottomNavBar />
        </div>
      </Provider>

    );
  }
}

export default App;
