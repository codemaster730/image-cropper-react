import React, { Component } from 'react';
import logo from '../res/images/logo.svg';
import './App.css';
import Uploader from '../components/Uploader'

const DemoImg = 'https://braavos.me/images/posts/gr/8.jpg'

class App extends Component {
  
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Uploading & Cropping Image</h1>
        </header>
        <Uploader/>
      </div>
    );
  }
}

export default App;
