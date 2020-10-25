import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Movies from "./components/movies";
import Navbar from "./components/navbar";
import Home from "./components/home";
import Customers from "./components/customers";
import Rentals from "./components/rentals";
import NotFound from "./components/notFound";
import MovieForm from "./components/movieForm";
import LoginForm from "./components/loginForm";

class App extends Component {
  state = {};
  render() {
    return (
      <React.Fragment>
        <Navbar />
        <main className="container">
          <Switch>
            <Route path="/login" component={LoginForm} />

            <Route path="/movies" component={Movies} />
            <Route path="/customers" component={Customers} />
            <Route path="/rentals" component={Rentals} />
            <Route path="/not_Found" component={NotFound} />
            <Redirect to="/not_found"></Redirect>
            <Route path="/" component={Home} />
          </Switch>
        </main>
      </React.Fragment>
    );
  }
}

export default App;
