import React, { Component } from "react";
import { getMovies } from "../services/fakeMovieService";
import Movie from "./movie";

class Movies extends Component {
  state = {
    movies: getMovies(),
  };

  handleDelete = (movie) => {
    const movies = this.state.movies.filter((m) => m._id !== movie._id);
    this.setState({ movies });
  };

  handleLike = (movie) => {
    let movies = [...this.state.movies];
    const index = movies.indexOf(movie);
    movies[index] = { ...movies[index] };
    movies[index].liked = !movies[index].liked;
    this.setState({ movies });
  };
  render() {
    if (this.state.movies.length === 0) {
      return <p>there is no movies in the database</p>;
    }
    return (
      <div className="container">
        <p>there is {this.state.movies.length} in the database</p>
        <table className="table table-hover ">
          <thead>
            <tr>
              <th scope="col">Title</th>
              <th scope="col">Genre</th>
              <th scope="col">Stock</th>
              <th scope="col">Rate</th>
              <th scope="col"></th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {this.state.movies.map((movie) => (
              <Movie
                movie={movie}
                key={movie._id}
                onDelete={this.handleDelete}
                onLikeToggle={this.handleLike}
              />
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default Movies;
