import React, { Component } from 'react';

export class User extends Component {

  constructor(props) {
    super(props);

    this.signIn = this.signIn.bind(this);
    this.signOut = this.signOut.bind(this);

  }

  signIn() {
    const provider = new this.props.firebase.auth.GoogleAuthProvider();
    this.props.firebase.auth().signInWithPopup( provider ).then ((result) => {
      console.log('signed in');
      const user = result.user;
      this.props.setUser(user);
    });

  }

  signOut() {
    this.props.firebase.auth().signOut().then(() => {
      console.log('signed out');
      this.props.setUser(null);
    });


  }

  componentDidMount() {
    this.props.firebase.auth().onAuthStateChanged( user => {
      this.props.setUser(user);
    });
  }

  render() {
    return (
      <div>
        <h3>Welcome, {this.props.greetings}</h3>
        { this.props.greetings === "Guest" ?
        <button onClick={this.signIn}>Sign In</button>
        :
        <button onClick={this.signOut}>Sign Out</button>
      }
      </div>
    )
  }

}

export default User;
