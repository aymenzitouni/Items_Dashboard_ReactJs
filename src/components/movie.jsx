import React, { Component } from "react";
import _ from "loadsh";

class Movie extends Component {
  renderCell = (movie, column) => {
    if (column.content) return column.content(movie);
    return _.get(movie, column.path);
  };
  render() {
    const { columns, movie } = this.props;

    return (
      <tr key={movie._id}>
        {columns.map((column) => (
          <td key={movie._id + (column.path || column.key)}>
            {this.renderCell(movie, column)}
          </td>
        ))}
      </tr>
    );
  }
}
export default Movie;
