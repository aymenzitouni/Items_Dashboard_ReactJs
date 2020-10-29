import React, { Component } from "react";
import { getMovies } from "../services/fakeMovieService";
import { getGenres } from "../services/fakeGenreService";
import MoviesTable from "./moviesTable";
import Pagination from "./pagination";
import ListGenre from "./listGenre";
import paginate from "../utils/paginate";
import _ from "loadsh";
class Movies extends Component {
  state = {
    movies: [],
    pageSize: 4,
    currentPage: 1,
    genres: [],
    selectedGenre: null,
    sortColumn: { path: "title", order: "asc" },
  };

  componentDidMount() {
    const genres = [{ _id: "", name: "All" }, ...getGenres()];
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

  handleSort = (sortColumn) => {
    this.setState({ sortColumn });
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
    const sorted = _.orderBy(
      filtred,
      [this.state.sortColumn.path],
      [this.state.sortColumn.order]
    );
    const movies = paginate(
      sorted,
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
          <div className="col-9 mt-5">
            <button
              className="btn btn-primary"
              onClick={() => this.props.history.push("/addMovie")}
            >
              New Movie
            </button>
            <p className="alert alert-primary mt-2">
              there is {this.state.movies.length} in the database
            </p>
            <MoviesTable
              movies={movies}
              sortColumn={this.state.sortColumn}
              onDelete={this.handleDelete}
              onLikeToggle={this.handleLike}
              onSort={this.handleSort}
            />
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
