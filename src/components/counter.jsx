import React, { Component } from "react";

class Counter extends Component {
  state = {
    count: 0
  };

  formatCode() {
    const { count } = this.state;
    return count === 0 ? "zero" : count;
  }

  getBadgeClasses() {
    let badgeClass = "badge m-2 badge-";
    badgeClass += this.state.count === 0 ? "warning" : "primary";
    return badgeClass;
  }
  render() {
    return (
      <div>
        <h1>Counter</h1>
        <span style={{ fontWeight: "25px" }} className={this.getBadgeClasses()}>
          {this.formatCode()}
        </span>
        <button className="btn btn-sm btn-secondary">inc</button>
      </div>
    );
  }
}

export default Counter;
