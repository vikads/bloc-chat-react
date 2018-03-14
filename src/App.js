import React, { Component } from 'react';
import './App.css';
import * as firebase from 'firebase';
import { RoomList } from './components/RoomList.js';
import { MessageList} from './components/MessageList.js'

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
       <h1 className="hero-title">Bloc Chat</h1>
       <RoomList firebase={ firebase } />
       <MessageList firebase={ firebase } />
     </div>


   );
  }
}

export default App;
