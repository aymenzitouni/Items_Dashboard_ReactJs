import React, { Component } from "react";

class LikeButton extends Component {
  state = {};
  render() {
    let classes = "fa fa-heart";
    if (!this.props.liked) {
      classes += "-o";
    }
    return (
      <i
        className={classes}
        style={{ cursor: "pointer" }}
        onClick={this.props.onClick}
      ></i>
    );
  }
}

export default LikeButton;
