import React from "react";
import Joi from "joi-browser";
import Form from "./form";
import Input from "./input";

class LoginForm extends Form {
  state = { data: { username: "", password: "" }, errors: {} };

  schema = {
    username: Joi.string().required().label("Username"),
    password: Joi.string().required().label("password"),
  };

  doSubmit = () => {
    console.log("submmited");
  };

  render() {
    const { data, errors } = this.state;
    return (
      <div className="col-md-6">
        <h1>Login</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("username", "Username")}
          {this.renderInput("password", "Password", "password")}

          {this.renderButton("login")}
        </form>
      </div>
    );
  }
}

export default LoginForm;
