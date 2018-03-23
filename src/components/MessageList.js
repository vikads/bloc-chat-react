import React, { Component } from 'react';
import * as moment from 'moment';

export class MessageList extends Component {

  constructor(props) {
    super(props);

    this.state = {
      username: "",
      content: "",
      sentAt: "",
      roomId: "",
      messages: []
    }

    this.messagesRef = this.props.firebase.database().ref('messages');
    this.handleChange = this.handleChange.bind(this);
    this.createMessage = this.createMessage.bind(this);

  }

  handleChange(e) {
    e.preventDefault();
    this.setState({
      username: this.props.user,
      content: e.target.value,
      sentAt: this.props.firebase.database.ServerValue.TIMESTAMP,
      roomId: this.props.activeRoom
    });
  }


  createMessage(e) {
    e.preventDefault();
    if (!this.state.content) { return }
    this.messagesRef.push({
      username: this.state.username,
      content: this.state.content,
      sentAt: this.state.sentAt,
      roomId: this.state.roomId
    });

    this.setState({
      username: "",
      content: "",
      sentAt: "",
      roomId:""
  });
  }

  deleteMessage(messageKey) {
    //console.log('trying to delete message', messageKey)
    const message = this.props.firebase.database().ref('messages' + messageKey);
    message.remove()
    const remainMessages= this.state.messages
      .filter(message => message.key !== messageKey);
      this.setState({ messages: remainMessages});
  }



  componentDidMount() {
    this.messagesRef.on('child_added', snapshot => {
      const message = snapshot.val();
      message.key = snapshot.key;
      this.setState({ messages: this.state.messages.concat( message ) })
    });
  }

  render () {

    const activeRoom = this.props.activeRoom;

    const messageList = this.state.messages
      .filter(message => message.roomId === activeRoom)
      .map(message => {
        return <li key={message.key}>
        {message.username}: {message.content}{''}
        {moment(message.sentAt).format('ll')}

        <button id="deleteMessageButton" onClick={() => this.deleteMessage(message.key)}>Remove</button>
        </li>
      })



    return (
      <div>

      <form onSubmit={ (e) => this.createMessage(e) }>
        <input type="text" value={this.state.content} placeholder="Enter Message" onChange={this.handleChange} />
        <input type="submit" value="Send" />
      </form>

      <ul>{messageList}</ul>



      </div>
    );

  }
}

export default MessageList;
