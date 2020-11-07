import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import jwtDecode from "jwt-decode";
import Movies from "./components/movies";
import Navbar from "./components/navbar";
import Home from "./components/home";
import Customers from "./components/customers";
import Rentals from "./components/rentals";
import NotFound from "./components/notFound";
import MovieForm from "./components/movieForm";
import LoginForm from "./components/loginForm";
import RegisterForm from "./components/registerForm";
import "react-toastify/dist/ReactToastify.css";
import Logout from "./components/logout";
import ProtectedRoute from "./components/common/protectedRoute";
import { getCurrentUser } from "./services/authService";

class App extends Component {
  state = {};
  componentDidMount() {
    try {
      const user = getCurrentUser();
      this.setState({ user });
      console.log(user);
    } catch (ex) {}
  }
  render() {
    const { user } = this.state;
    return (
      <React.Fragment>
        <ToastContainer />
        <Navbar user={user} />
        <main className="container">
          <Switch>
            <ProtectedRoute
              user={user}
              path="/movies/:_id"
              component={MovieForm}
            />
            <Route
              path="/movies"
              render={(props) => <Movies {...props} user={user} />}
            />
            <ProtectedRoute path="/movies/new" component={MovieForm} />
            <ProtectedRoute path="/customers" component={Customers} />
            <ProtectedRoute path="/rentals" component={Rentals} />
            <Route path="/login" component={LoginForm} />
            <Route path="/register" component={RegisterForm} />
            <Route path="/logout" component={Logout} />
            <Route path="/not_Found" component={NotFound} />
            <Redirect from="/" to="/movies"></Redirect>
            <Redirect to="/not_found"></Redirect>
          </Switch>
        </main>
      </React.Fragment>
    );
  }
}

export default App;
