import React, { Component } from "react";

class Counter extends Component {
  formatCode = () => {
    const { value } = this.props.counter;
    return value === 0 ? "zero" : value;
  };

  getBadgeClasses = () => {
    let badgeClass = "badge m-2 badge-";
    badgeClass += this.props.counter.value === 0 ? "warning" : "primary";
    return badgeClass;
  };

  render() {
    return (
      <div>
        <span style={{ fontWeight: "25px" }} className={this.getBadgeClasses()}>
          {this.formatCode()}
        </span>
        <button
          onClick={() => this.props.onIncrement(this.props.counter)}
          className="btn btn-sm btn-secondary"
        >
          inc
        </button>
        <button
          onClick={() => this.props.onDecrement(this.props.counter)}
          className="btn btn-sm btn-danger"
        >
          Dec
        </button>
        <button
          onClick={() => this.props.onDelete(this.props.counter.id)}
          className="btn btn-sm btn-danger m-2"
        >
          delete
        </button>
      </div>
    );
  }
}

export default Counter;
