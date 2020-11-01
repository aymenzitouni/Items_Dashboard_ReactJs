import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";
import { login } from "../services/authService";

class LoginForm extends Form {
  state = { data: { username: "", password: "" }, errors: {} };

  schema = {
    username: Joi.string().required().label("Username"),
    password: Joi.string().required().label("password"),
  };

  doSubmit = async () => {
    try {
      const { data } = this.state;
      const { data: jwt } = await login(data.username, data.password);
      localStorage.setItem("token", jwt);
      this.props.history.push("/movies");
      console.log("submmited");
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const { errors } = this.state;
        errors.password = ex.response.data;
        this.setState({ errors });
      }
    }
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
