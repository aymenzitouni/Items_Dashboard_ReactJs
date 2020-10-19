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
      <tr>
        {columns.map((column) => (
          <td>{this.renderCell(movie, column)}</td>
        ))}
        <td></td>
      </tr>
      // <tr>
      //   <td>{title}</td>
      //   <td>{genre.name}</td>
      //   <td>{numberInStock}</td>
      //   <td>{dailyRentalRate}</td>
      //   <td>
      //     <LikeButton
      //       liked={liked}
      //       onClick={() => this.props.onLikeToggle(this.props.movie)}
      //     />
      //   </td>
      //   <td>
      //     <button
      //       className="btn btn-danger"
      //       onClick={() => this.props.onDelete(this.props.movie)}
      //     >
      //   //       Delete
      //   //     </button>
      //     </td>
      //   </tr>
      // );
      // }
    );
  }
}
export default Movie;
