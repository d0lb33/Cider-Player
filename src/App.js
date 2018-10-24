import React, { Component } from 'react';
import AppleButton from './UIElements/AppleButton';
import { Row, Col } from 'antd';

class App extends Component {

  render() {
    return (
      <div>
        <Row>
          <Col span={18}>
            <span className="bottom-nav-bar">
              <AppleButton icon="music-library" title={"Music Library"} />
              <AppleButton selected icon="for-you" title={"For You"} />
              <AppleButton icon="browse" title={"Browse"} />
              <AppleButton icon="radio-waves" title="Radio" />
              <AppleButton icon="search" title="Search" />
            </span>
          </Col>
          <Col span={6}>
            Now Playing Here
          </Col>
        </Row>
      </div>
    );
  }
}

export default App;
