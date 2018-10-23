import React, { Component } from 'react';
import { MusicLibrary, ForYou } from './UIElements/CustomIcons';
import AppleButton from './UIElements/AppleButton';

class App extends Component {
  render() {
    return (
      <div>
        <MusicLibrary width={40} selected />
        <ForYou width={40} selected />
        <AppleButton />
      </div>

    );
  }
}

export default App;
