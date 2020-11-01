import React from "react";
import Movie from "./movie";
import TableHead from "./tableHead";

const Table = (props) => {
  const { columns, sortColumn, movies, onSort, onDelete, onLikeToggle } = props;
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
};

export default Table;
