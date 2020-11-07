import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";
import { getCurrentUser } from "../../services/authService";
import jwtDecode from "jwt-decode";

class ProtectedRoute extends Component {
  render() {
    const { path, component: Comp, render, ...rest } = this.props;

    return (
      <Route
        {...rest}
        render={(props) => {
          if (!getCurrentUser()) {
            return (
              <Redirect
                to={{
                  pathname: "/login",
                  state: { from: this.props.location },
                }}
              />
            );
          }
          return Comp ? <Comp {...props} /> : render(props);
        }}
      />
    );
  }
}

export default ProtectedRoute;
