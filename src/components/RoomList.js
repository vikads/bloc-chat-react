import React, { Component } from 'react';


export class RoomList extends Component {
  // this component will be be rendered from App.js
  constructor(props) {
    super(props);

    this.state = {
      rooms: [],
      name:''
    };

    this.roomsRef = this.props.firebase.database().ref('rooms');
    this.handleChange = this.handleChange.bind(this);
    this.createRoom = this.createRoom.bind(this);


   }

   handleChange(e) {
     this.setState({ name: e.target.value });
     console.log(this.state.name);
   }

   createRoom(e) {
     e.preventDefault();
     if (!this.state.name) { return }
     this.roomsRef.push({ name: this.state.name });
     this.setState({ name: "" });
   }

   deleteRoom(roomKey) {
     console.log('trying to delete room with room.key:',roomKey)
     const room = this.props.firebase.database().ref('rooms/' + roomKey);
     room.remove()
     const remainRoom= this.state.rooms
       .filter(room => room.key !== roomKey);

       this.setState({ rooms: remainRoom });
       //console.log('this.state:' , this.state);
   }


    componentDidMount() {
      this.roomsRef.on('child_added', snapshot => {
        const room = snapshot.val();
        room.key = snapshot.key;
        this.setState({ rooms: this.state.rooms.concat( room ) })
      });
    }




    selectRoom(room) {
      this.props.activeRoom(room);
    }


  render () {

    const roomList = this.state.rooms.map((room)  =>
      <li key={room.key} >
      <span onClick={(e) => this.selectRoom(room, e)}>{room.name}</span>
      <button id="deleteRoomButton" onClick={() => this.deleteRoom(room.key)}>Delete</button>
      </li>);

    return (

      <div>
          <form onSubmit={ (e) => this.createRoom(e) }>
              <input type="text" value={this.state.name} placeholder="New Room Name" onChange={ (e) => this.handleChange(e)} />
              <input type="submit" value="Create" />
          </form>

          <ul>{roomList}</ul>
      </div>

    );
  }

}

export default RoomList;
