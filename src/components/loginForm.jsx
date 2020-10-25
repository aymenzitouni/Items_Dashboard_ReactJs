import React, { Component } from "react";
import Input from "./input";

class LoginForm extends Component {
  state = { account: { username: "", password: "" } };
  handleSubmit = (e) => {
    e.preventDefault();
    console.log("submmited");
  };

  handleChange = ({ currentTarget: input }) => {
    const account = { ...this.state.account };
    account[input.name] = input.value;
    this.setState({ account });
  };

  render() {
    const { account } = this.state;
    return (
      <div className="col-md-6">
        <h1>Login</h1>
        <form onSubmit={this.handleSubmit}>
          <Input
            name="username"
            label="Username"
            value={account.username}
            type="text"
            autofocus={true}
            onChange={this.handleChange}
          ></Input>
          <Input
            name="password"
            label="Password"
            value={account.password}
            type="password"
            autofocus={false}
            onChange={this.handleChange}
          ></Input>

          <button className="btn btn-primary">Login</button>
        </form>
      </div>
    );
  }
}

export default LoginForm;
