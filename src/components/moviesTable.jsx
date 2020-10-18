import React, { Component } from "react";
import Movie from "./movie";

class MoviesTable extends Component {
  raiseSort = (path) => {
    let sortColumn = { ...this.props.sortColumn };
    if (sortColumn.path === path) {
      sortColumn.order = sortColumn.order === "asc" ? "desc" : "asc";
    } else {
      sortColumn = { path, order: "asc" };
    }
    this.props.onSort(sortColumn);
  };
  render() {
    const { movies, onDelete, onLikeToggle, onSort } = this.props;

    return (
      <table className="table table-hover ">
        <thead>
          <tr>
            <th onClick={() => this.raiseSort("title")} scope="col">
              Title
            </th>
            <th onClick={() => this.raiseSort("genre.name")} scope="col">
              Genre
            </th>
            <th onClick={() => this.raiseSort("numberInStock")} scope="col">
              Stock
            </th>
            <th onClick={() => this.raiseSort("dailyRentalRate")} scope="col">
              Rate
            </th>
            <th scope="col"></th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          {movies.map((movie) => (
            <Movie
              movie={movie}
              key={movie._id}
              onDelete={onDelete}
              onLikeToggle={onLikeToggle}
            />
          ))}
        </tbody>
      </table>
    );
  }
}

export default MoviesTable;
