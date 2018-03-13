import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import * as firebase from 'firebase';

var config = {
  apiKey: "AIzaSyAA3xgPKeueqLMr35h0A356kdx-upD7pWQ",
  authDomain: "bloc-chat-react-fb1e9.firebaseapp.com",
  databaseURL: "https://bloc-chat-react-fb1e9.firebaseio.com",
  projectId: "bloc-chat-react-fb1e9",
  storageBucket: "bloc-chat-react-fb1e9.appspot.com",
  messagingSenderId: "987209014782"
};
firebase.initializeApp(config);


class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
