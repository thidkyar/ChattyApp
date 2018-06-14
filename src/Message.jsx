import React, { Component } from "react";
import MessageList from "./MessageList.jsx";

class Message extends Component {
  render() {
    console.log("123123123123", this.props);
    if (this.props.type === "incomingMessage") {
      return (
        <div>
          <div className="message">
            <span className="message-username">{this.props.username}</span>
            <span className="message-content"> {this.props.content} </span>
          </div>
        </div>
      );
    }
    return (
        <div className="message system">
        {this.props.content}
        </div>
    );
  }
}
export default Message;
