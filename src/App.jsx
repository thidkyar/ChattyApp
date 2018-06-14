import React, { Component } from "react";
import Nav from './navBar.jsx'
import ChatBar from './ChatBar.jsx'
import MessageList from './MessageList.jsx'
import { IncomingMessage } from "http";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
        currentUser: {name: "Anonymous"}, // optional. if currentUser is not defined, it means the user is Anonymous
        messages: [],
        activeUsers: {}
      }
  }

  componentDidMount() {
    this.socket = new WebSocket('ws://localhost:3001');

    this.socket.onmessage = (event) => {      // console.log('BLOOOP BLAAAP', event);
      const parsedEvent = JSON.parse(event.data)

      if (parsedEvent.type === 'incomingNotification'){
        parsedEvent.content = `${parsedEvent.oldname} changed their name to ${parsedEvent.username}`
      } else if (parsedEvent.type === 'userCountStatus') {
        this.setState({activeUsers:parsedEvent})
      }
      const activeUsers = parsedEvent
      console.log('ASDKJHSKJDHA', activeUsers)
      const newMessage = {id: parsedEvent.id, username: parsedEvent.username, content: parsedEvent.content, type: parsedEvent.type};

      const messages = this.state.messages.concat(newMessage)
      console.log('WAAAATSSSSS THIS', messages)
      

      this.setState({
        messages:messages
      })
      // code to handle incoming message
    }
    this.socket.onopen = (event) => {
      // console.log(event)
      console.log("Connected to Server")
    };
    // console.log('Connected to server')
    console.log("componentDidMount <App />");
    // setTimeout(() => {
    //   console.log("Simulating incoming message");
    //   // Add a new message to the list of messages in the data store
    //   const newMessage = {id: 3, username: "Michelle", content: "Hello there!"};
    //   const messages = this.state.messages.concat(newMessage)
    //   // Update the state of the app component.
    //   // Calling setState will trigger a call to render() in App and all child components.
    //   this.setState({messages: messages})
    // }, 3000);
  }
  
  _submitMessage = (username, inputMessage) => {
    const newMessage = {username: username, content: inputMessage, type: 'postMessage'};
    // console.log('CLIENT SIDE', newMessage)
    // const messages = this.state.messages.concat(newMessage)
    // this.setState({messages:messages})
    this.socket.send(JSON.stringify(newMessage))
  }

  _submitUser = (username) => {
    const newUser = {name: username};
    const notificationObject = {oldname: this.state.currentUser.name, username: username, type: 'postNotification'}
    // console.log('CHECKING THIS MATE', typeof newUser)
    this.socket.send(JSON.stringify(notificationObject))
    // console.log(notificationObject)
    this.setState({currentUser: newUser})
  }

  render() { 
    return (
      <div>
        <Nav activeUsers={this.state.activeUsers} />
        <MessageList messages={this.state.messages}/>
        <ChatBar submitUser = {this._submitUser} submitMessage={this._submitMessage} currentUser={this.state.currentUser}/>
      </div>
    );
  }
}
export default App;
