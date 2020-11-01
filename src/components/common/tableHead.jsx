import React, { Component } from "react";

class TableHead extends Component {
  state = {};

  renderSortIcon = (column) => {
    const { sortColumn } = this.props;
    if (column.path !== sortColumn.path) return null;
    if (sortColumn.order === "asc") return <i className="fa fa-sort-asc"></i>;
    return <i className="fa fa-sort-desc"></i>;
  }; // <tr>
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
    const { columns } = this.props;
    return (
      <thead>
        <tr>
          {columns.map((column) => (
            <th
              className="clickable"
              key={column.path || column.key}
              onClick={() => this.raiseSort(column.path)}
              scope="col"
            >
              {column.label}
              {this.renderSortIcon(column)}
            </th>
          ))}
        </tr>
      </thead>
    );
  }
}

export default TableHead;
