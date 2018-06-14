import React, { Component } from "react";

class Nav extends Component {
  render() {
    if (this.props.activeUsers.userCount > 1) {
    return (
      <nav className="navbar">
        <a href="/" className="navbar-brand"> Chat-Away </a>
        <h4 className="activeUsers" > {this.props.activeUsers.userCount} users online </h4>
      </nav>
    );
  } else {
    return (
      <nav className="navbar">
        <a href="/" className="navbar-brand"> Chat-Away </a>
        <h4 className="activeUsers" > {this.props.activeUsers.userCount} user online </h4>
      </nav>
    );
  }
  }
}
export default Nav;