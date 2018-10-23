import React, { Component } from 'react';
import { MusicLibrary, ForYou } from './UIElements/CustomIcons';
import { Button } from 'antd';
import AppleButton from './UIElements/AppleButton';

class App extends Component {
  render() {
    return (
      <div>
        <MusicLibrary width={40} selected />
        <ForYou width={40} selected />
        <Button size="large">
          <ForYou width={25} selected />For You
          </Button>

          <AppleButton />
      </div>

    );
  }
}

export default App;
