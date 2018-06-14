import React, { Component } from "react";
import Nav from "./navBar.jsx";
import ChatBar from "./ChatBar.jsx";
import MessageList from "./MessageList.jsx";
import { IncomingMessage } from "http";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      currentUser: { name: "Anonymous" }, //if currentUser is not defined, it means the user is Anonymous
      messages: [],
      activeUsers: {}
    };
  }

  componentDidMount() {
    console.log("componentDidMount <App />");
    this.socket = new WebSocket("ws://localhost:3001");

    this.socket.onopen = event => {
      console.log("Connected to Server");
    };

    this.socket.onmessage = event => {
      const parsedEvent = JSON.parse(event.data);
      if (parsedEvent.type === "incomingNotification") {
        parsedEvent.content = `${parsedEvent.oldname} changed their name to ${
          parsedEvent.username
        }`;
      } else if (parsedEvent.type === "userCountStatus") {
        this.setState({ activeUsers: parsedEvent });
      }
  
      const newMessage = {
        id: parsedEvent.id,
        username: parsedEvent.username,
        content: parsedEvent.content,
        type: parsedEvent.type
      };
      
      const messages = this.state.messages.concat(newMessage);
      this.setState({
        messages: messages
      });
    };
  }

  //function to handle send message
  _submitMessage = (username, inputMessage) => {
    const newMessage = {
      username: username,
      content: inputMessage,
      type: "postMessage"
    };
    //sending newMessage data to socket server
    this.socket.send(JSON.stringify(newMessage)); 
  };

  //function to handle username change
  _submitUser = username => {
    const newUser = { name: username };
    const notificationObject = {
      oldname: this.state.currentUser.name,
      username: username,
      type: "postNotification"
    };
    this.socket.send(JSON.stringify(notificationObject));
    this.setState({ currentUser: newUser });
  };

  render() {
    return (
      <div>
        <Nav activeUsers={this.state.activeUsers} />
        <MessageList messages={this.state.messages} />
        <ChatBar
          submitUser={this._submitUser}
          submitMessage={this._submitMessage}
          currentUser={this.state.currentUser}
        />
      </div>
    );
  }
}
export default App;
