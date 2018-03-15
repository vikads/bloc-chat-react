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
    return (

      <div>

          {this.state.rooms.map((room)  =>
          <li key={room.key} onClick={(e) => this.selectRoom(room, e)}>{room.name}</li>)}

          <form onSubmit={ (e) => this.createRoom(e) }>
              <input type="text" value={this.state.name} placeholder="New Room Name" onChange={ (e) => this.handleChange(e)} />
              <input type="submit" value="Create" />
          </form>


      </div>

    );
  }

}

export default RoomList;
