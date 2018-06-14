import React, { Component } from "react";
import Message from "./Message.jsx";
import MessageSystem from "./MessageSystem.jsx";

class MessageList extends Component {
  
  render() {
    const messageItem = this.props.messages.map((message, i) => (
      <Message type= {message.type} username={message.username} content={message.content} key={i}/>
    ));
    return (
      <main className="messages">
        {messageItem}
      </main>
    );
  }
}
export default MessageList;
