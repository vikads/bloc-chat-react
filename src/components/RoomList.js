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
        console.log(snapshot);
      });
    }




  render () {
    return (
      <li> RoomList go here </li>
    );
  }

}

export default RoomList;
