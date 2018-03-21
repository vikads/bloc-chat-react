import React, { Component } from 'react';
import './App.css';
import * as firebase from 'firebase';
import { RoomList } from './components/RoomList.js';
import { MessageList} from './components/MessageList.js';
import { User } from './components/User.js'

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

  constructor(props) {
    super(props);

    this.state = { activeRoom: "", user: null };
    this.activeRoom=this.activeRoom.bind(this);
    this.setUser=this.setUser.bind(this);

  }

  activeRoom(room) {
    this.setState({ activeRoom: room });
  }

  setUser(user) {
    this.setState({ user: user });
  }

  render() {

   const showMessages = this.state.activeRoom;
   const currentUser = this.state.user === null ? "Guest" : this.state.user.displayName;

    return (
     <div className="App">
       <aside>
         <h1 className="hero-title">Bloc Chat</h1>
         <User firebase={ firebase } setUser={this.setUser} greetings={currentUser} />
         <RoomList firebase={ firebase }  activeRoom={this.activeRoom} />
       </aside>

       <main>
         <h2>{this.state.activeRoom.name|| "Select a Room"}</h2>
         { showMessages ?
           <MessageList firebase={ firebase }  activeRoom={this.state.activeRoom.key} user={currentUser} />
         : null
         }
      </main>

     </div>


   );
  }
}

export default App;
