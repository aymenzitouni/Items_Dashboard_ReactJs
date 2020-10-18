import React, { Component } from "react";
import { getMovies } from "../services/fakeMovieService";
import { getGenres } from "../services/fakeGenreService";
import Movie from "./movie";
import Pagination from "./pagination";
import ListGenre from "./listGenre";

import paginate from "../utils/paginate";

class Movies extends Component {
  state = {
    movies: [],
    pageSize: 4,
    currentPage: 1,
    genres: [],
    selectedGenre: null,
  };

  componentDidMount() {
    const genres = [{ name: "All" }, ...getGenres()];
    this.setState({ movies: getMovies(), genres });
  }

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

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };

  // handleFilterGenre = (genre) => {
  //   this.setState({ movies: getMovies() });
  //   const movies = this.state.movies.filter(
  //     (movie) => genre.name === movie.genre.name
  //   );
  //   if (movies) {
  //     this.setState({ movies });
  //   }
  // };

  handleGenreSelect = (genre) => {
    this.setState({ selectedGenre: genre, currentPage: 1 });
  };
  render() {
    if (this.state.movies.length === 0) {
      return <p>there is no movies in the database</p>;
    }
    const filtred =
      this.state.selectedGenre && this.state.selectedGenre._id
        ? this.state.movies.filter(
            (movie) => movie.genre._id === this.state.selectedGenre._id
          )
        : this.state.movies;
    const movies = paginate(
      filtred,
      this.state.currentPage,
      this.state.pageSize
    );
    return (
      <div className="container mt-4">
        <div className="row">
          <div className="col-3 mt-5">
            <ListGenre
              selectedGenre={this.state.selectedGenre}
              onGenreSelect={this.handleGenreSelect}
              genres={this.state.genres}
            />
          </div>
          <div className="col-9">
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
                {movies.map((movie) => (
                  <Movie
                    movie={movie}
                    key={movie._id}
                    onDelete={this.handleDelete}
                    onLikeToggle={this.handleLike}
                  />
                ))}
              </tbody>
            </table>

            <Pagination
              itemsCount={filtred.length}
              pageSize={this.state.pageSize}
              currentPage={this.state.currentPage}
              onPageChange={this.handlePageChange}
            />
          </div>
        </div>{" "}
      </div>
    );
  }
}

export default Movies;
