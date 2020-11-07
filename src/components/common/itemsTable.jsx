import React, { Component } from "react";
import { Link } from "react-router-dom";
import Table from "./table";
import LikeButton from "./likeButton";
import { getCurrentUser } from "../../services/authService";

class ItemsTable extends Component {
  columns = [
    {
      path: "title",
      label: "Title",
      content: (item) => <Link to={"/items/" + item._id}>{item.title}</Link>,
    },
    { path: "genre.name", label: "Genre" },
    { path: "numberInStock", label: "Stock" },
    { path: "dailyRentalRate", label: "Rate" },
    {
      key: "like",
      content: (item) => (
        <LikeButton
          liked={item.liked}
          onClick={() => this.props.onLikeToggle(item)}
        />
      ),
    },
  ];

  deleteColumn = {
    key: "delete",
    content: (item) => (
      <button
        className="btn btn-danger"
        onClick={() => this.props.onDelete(item)}
      >
        Delete
      </button>
    ),
  };
  constructor() {
    super();
    const user = getCurrentUser();
    if (user && user.isAdmin) this.columns.push(this.deleteColumn);
  }
  render() {
    const { items, onDelete, onLikeToggle, onSort, sortColumn } = this.props;

    return (
      <Table
        columns={this.columns}
        items={items}
        sortColumn={sortColumn}
        onSort={onSort}
        onDelete={onDelete}
        onLikeToggle={onLikeToggle}
      />
    );
  }
}

export default ItemsTable;
