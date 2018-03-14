import React, { Component } from 'react';


export class RoomList extends Component {
  // this component will be be rendered from App.js
  constructor(props) {
    super(props);

    this.state = {
      rooms: []
    };

    this.roomsRef = this.props.firebase.database().ref('rooms');

  }

    componentDidMount() {
      this.roomsRef.on('child_added', snapshot => {
        const room = snapshot.val();
        room.key = snapshot.key;
        this.setState({ rooms: this.state.rooms.concat( room ) })
      });
    }




  render () {
    return (
      <div>
        <p>Bloc Chat</p>
        {this.state.rooms.map((room)  =>
        <li key={room.key}>{room.name}</li>)};
      </div>
    );
  }

}

export default RoomList;
