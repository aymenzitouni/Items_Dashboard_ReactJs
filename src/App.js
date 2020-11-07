import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Items from "./components/items";
import Navbar from "./components/navbar";
import Customers from "./components/customers";
import Rentals from "./components/rentals";
import NotFound from "./components/notFound";
import ItemForm from "./components/itemForm";
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
              path="/items/:_id"
              component={ItemForm}
            />
            <Route
              path="/items"
              render={(props) => <Items {...props} user={user} />}
            />
            <ProtectedRoute path="/items/new" component={ItemForm} />
            <ProtectedRoute path="/customers" component={Customers} />
            <ProtectedRoute path="/rentals" component={Rentals} />
            <Route path="/login" component={LoginForm} />
            <Route path="/register" component={RegisterForm} />
            <Route path="/logout" component={Logout} />
            <Route path="/not_Found" component={NotFound} />
            <Redirect from="/" to="/items"></Redirect>
            <Redirect to="/not_found"></Redirect>
          </Switch>
        </main>
      </React.Fragment>
    );
  }
}

export default App;
