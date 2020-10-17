import React, { Component } from "react";
import LikeButton from "./likeButton";

class Movie extends Component {
  state = {};
  render() {
    const {
      title,
      genre,
      numberInStock,
      dailyRentalRate,
      liked,
    } = this.props.movie;

    return (
      <tr>
        <td>{title}</td>
        <td>{genre.name}</td>
        <td>{numberInStock}</td>
        <td>{dailyRentalRate}</td>
        <td>
          <LikeButton
            liked={liked}
            onClick={() => this.props.onLikeToggle(this.props.movie)}
          />
        </td>
        <td>
          <button
            className="btn btn-danger"
            onClick={() => this.props.onDelete(this.props.movie)}
          >
            Delete
          </button>
        </td>
      </tr>
    );
  }
}

export default Movie;
