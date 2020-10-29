import React, { Component } from "react";
import { register } from "../serviceWorker";
import Form from "./form";
import Joi from "joi-browser";
class RegisterForm extends Form {
  state = { data: { username: "", password: "", name: "" }, errors: {} };
  schema = {
    username: Joi.string().required().email().label("Username"),
    password: Joi.string().required().min(5).label("password"),
    name: Joi.string().required().label("Name"),
  };
  doSubmit = () => {
    console.log("submmited");
  };
  render() {
    const { data, errors } = this.state;

    return (
      <div className="col-md-6">
        <h1>register</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("username", "Username")}
          {this.renderInput("password", "Password", "password")}
          {this.renderInput("name", "Name")}
          {this.renderButton("Register")}
        </form>
      </div>
    );
  }
}

export default RegisterForm;
