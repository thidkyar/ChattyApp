import React, { Component } from "react";

class Nav extends Component {
  render() {
    return (
      <nav className="navbar">
        <a href="/" className="navbar-brand"> Chat-Away </a>
        <h4 className="activeUsers" > Active Users: {this.props.activeUsers.userCount} </h4>
      </nav>
    );
  }
}
export default Nav;