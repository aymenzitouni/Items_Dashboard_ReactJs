import React, { Component } from "react";
import { getMovies } from "../services/fakeMovieService";
import { getGenres } from "../services/fakeGenreService";
import MoviesTable from "./moviesTable";
import Pagination from "./pagination";
import ListGenre from "./listGenre";
import paginate from "../utils/paginate";
import _ from "loadsh";
import SearchBox from "./searchBox";
class Movies extends Component {
  state = {
    movies: [],
    pageSize: 4,
    currentPage: 1,
    searchQuery: "",
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

  handleGenreSelect = (genre) => {
    this.setState({ selectedGenre: genre, currentPage: 1 });
  };

  handleSort = (sortColumn) => {
    this.setState({ sortColumn });
  };
  handleSearch = (query) => {
    this.setState({ searchQuery: query, selectedGenre: null, currentPage: 1 });
  };
  getPagedData = () => {
    const {
      pageSize,
      currentPage,
      movies: allMovies,
      selectedGenre,
      sortColumn,
      searchQuery,
    } = this.state;

    let filteredMovies = allMovies;
    if (searchQuery)
      filteredMovies = allMovies.filter((m) =>
        m.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    else if (selectedGenre && selectedGenre._id)
      filteredMovies = allMovies.filter(
        (m) => m.genre._id === selectedGenre._id
      );

    const sortedMovies = _.orderBy(
      filteredMovies,
      [sortColumn.path],
      [sortColumn.order]
    );

    const movies = paginate(sortedMovies, currentPage, pageSize);

    return { totalCount: filteredMovies.length, data: movies };
  };

  render() {
    if (this.state.movies.length === 0) {
      return <p>there is no movies in the database</p>;
    }

    const { totalCount, data: movies } = this.getPagedData();
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
              there is {totalCount} in the database
            </p>
            <SearchBox
              value={this.state.searchQuery}
              onChange={this.handleSearch}
            ></SearchBox>
            <MoviesTable
              movies={movies}
              sortColumn={this.state.sortColumn}
              onDelete={this.handleDelete}
              onLikeToggle={this.handleLike}
              onSort={this.handleSort}
            />
            <Pagination
              itemsCount={totalCount}
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
