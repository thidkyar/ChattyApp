import React, { Component } from "react";

class ChatBar extends Component {
  _onSubmitMessage = (event) => {
    if(event.key === 'Enter') {
      this.props.submitMessage(this.props.currentUser.name, event.target.value)
      event.target.value ='';
      console.log('CHECK THIS', this)
    }
  }

  _onSubmitUser = (event) => {
    if(event.key === 'Enter') {
      console.log(event.target.value)
      this.props.submitUser(event.target.value)
    }
  }
  
  render() {
    // console.log(this.props.submitMessage)
    return (
      <footer className="chatbar">
      <input className="chatbar-username" placeholder="Your Name (Optional)" defaultValue={this.props.currentUser.name} onKeyPress={this._onSubmitUser}/>
      <input className="chatbar-message" placeholder="Type a message and hit ENTER" onKeyPress={this._onSubmitMessage} />
      </footer>
    );
  }
}
export default ChatBar;