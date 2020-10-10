import React, { Component } from "react";
import Counter from "./counter";

class Counters extends Component {
  state = {
    counters: [
      { id: 1, value: 3 },
      { id: 2, value: 0 },
      { id: 3, value: 1 },
      { id: 4, value: 2 }
    ]
  };

  handleDelete = counterId => {
    // console.log(counterId);
    const counters = this.state.counters.filter(c => c.id !== counterId);
    this.setState({ counters });
  };

  handleIncrement = counter => {
    const counters = [...this.state.counters];
    const index = counters.indexOf(counter);
    counters[index] = { ...counter };
    counters[index].value++;
    this.setState({
      counters
    });
  };

  handleReset = () => {
    const counters = this.state.counters;
    counters.map(counter => (counter.value = 0));
    this.setState({ counters });
  };
  render() {
    return (
      <div>
        <button
          className="btn btn-sm btn-primary m-2"
          onClick={this.handleReset}
        >
          Reset
        </button>
        {this.state.counters.map(counter => (
          <Counter
            key={counter.id}
            counter={counter}
            selected={true}
            onDelete={this.handleDelete}
            onIncrement={this.handleIncrement}
          />
        ))}
      </div>
    );
  }
}

export default Counters;
