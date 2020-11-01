import React from "react";
import { register } from "../services/userService";
import Form from "./common/form";
import Joi from "joi-browser";
class RegisterForm extends Form {
  state = { data: { username: "", password: "", name: "" }, errors: {} };
  schema = {
    username: Joi.string().required().email().label("Username"),
    password: Joi.string().required().min(5).label("password"),
    name: Joi.string().required().label("Name"),
  };
  doSubmit = async () => {
    console.log("submmited");
    const response = await register(this.state.data);
    localStorage.setItem("token", response.headers["x-auth-token"]);
    this.props.history.push("/movies");
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
