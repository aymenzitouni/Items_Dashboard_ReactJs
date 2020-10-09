import React, { Component } from "react";

class Counter extends Component {
  state = {
    count: this.props.value,
    tags: ["tag1", "tag2", "tag3"]
  };

  formatCode = () => {
    const { count } = this.state;
    return count === 0 ? "zero" : count;
  };

  getBadgeClasses = () => {
    let badgeClass = "badge m-2 badge-";
    badgeClass += this.state.count === 0 ? "warning" : "primary";
    return badgeClass;
  };
  renderTags = () => {
    if (this.state.tags.length === 0) return <p>there is no tagss</p>;
    return (
      <ul>
        {this.state.tags.map(tag => (
          <li key={tag}>{tag}</li>
        ))}
      </ul>
    );
  };

  handleIncrement = () => {
    this.setState({ count: this.state.count + 1 });
  };
  render() {
    return (
      <div>
        <span style={{ fontWeight: "25px" }} className={this.getBadgeClasses()}>
          {this.formatCode()}
        </span>
        <button
          onClick={this.handleIncrement}
          className="btn btn-sm btn-secondary"
        >
          inc
        </button>
      </div>
    );
  }
}

export default Counter;
