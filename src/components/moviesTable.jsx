import React, { Component } from "react";
import Movie from "./movie";
import TableHead from "./tableHead";
import LikeButton from "./likeButton";

class MoviesTable extends Component {
  render() {
    const { movies, onDelete, onLikeToggle, onSort, sortColumn } = this.props;
    const columns = [
      { path: "title", label: "Title" },
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
      <table className="table table-hover ">
        <TableHead onSort={onSort} columns={columns} sortColumn={sortColumn} />
        <tbody>
          {movies.map((movie) => (
            <Movie
              movie={movie}
              key={movie._id}
              onDelete={onDelete}
              onLikeToggle={onLikeToggle}
              columns={columns}
            />
          ))}
        </tbody>
      </table>
    );
  }
}

export default MoviesTable;
