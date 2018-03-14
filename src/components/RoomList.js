import React, { Component } from 'react';


export class RoomList extends Component {
  // this component will be be rendered from App.js
  constructor(props) {
    super(props);

    this.state = {
      rooms: [],
      newRoomName:''
    };

    this.roomsRef = this.props.firebase.database().ref('rooms');
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);


   }

   handleChange(e) {
     this.setState({ newRoomName: e.target.value });
     console.log(this.state.newRoomName);
   }

   handleSubmit(e) {
     e.preventDeafult();
     if (!this.state.newRoomName) { return }
     this.roomsRef.push({ newRoomName: this.state.newRoomName });
     this.setstate({ newRoomName: "" });
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

          {this.state.rooms.map((room)  =>
          <li key={room.key}>{room.name}</li>)}

          <form onSubmit={ (e) => this.handleSubmit(e) }>
              <input type="text" value={this.state.newRoomName} placeholder="New Room Name" onChange={ (e) => this.handleChange(e)} />
              <input type="submit" value="Create" />
          </form>

      </div>



    );
  }

}

export default RoomList;
