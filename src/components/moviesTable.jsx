import React, { Component } from "react";
import { Link } from "react-router-dom";
import Table from "./table";
import LikeButton from "./likeButton";

class MoviesTable extends Component {
  render() {
    const { movies, onDelete, onLikeToggle, onSort, sortColumn } = this.props;
    const columns = [
      {
        path: "title",
        label: "Title",
        content: (movie) => (
          <Link to={"/movies/" + movie._id}>{movie.title}</Link>
        ),
      },
      { path: "genre.name", label: "Genre" },
      { path: "numberInStock", label: "Stock" },
      { path: "dailyRentalRate", label: "Rate" },
      {
        key: "like",
        content: (movie) => (
          <LikeButton
            liked={movie.liked}
            onClick={() => this.props.onLikeToggle(movie)}
          />
        ),
      },
      {
        key: "delete",
        content: (movie) => (
          <button
            className="btn btn-danger"
            onClick={() => this.props.onDelete(movie)}
          >
            Delete
          </button>
        ),
      },
    ];
    return (
      <Table
        columns={columns}
        movies={movies}
        sortColumn={sortColumn}
        onSort={onSort}
        onDelete={onDelete}
        onLikeToggle={onLikeToggle}
      />
    );
  }
}

export default MoviesTable;
