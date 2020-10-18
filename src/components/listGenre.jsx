import React from "react";
const ListGenre = (props) => {
  return (
    <ul className="list-group">
      {props.genres.map((genre) => (
        <li
          key={genre._id}
          className={
            genre === props.selectedGenre
              ? "list-group-item active"
              : "list-group-item"
          }
          onClick={() => props.onGenreSelect(genre)}
        >
          {genre.name}
        </li>
      ))}
    </ul>
  );
};

export default ListGenre;
