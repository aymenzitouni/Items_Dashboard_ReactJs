import React from "react";
import Item from "./item";
import TableHead from "./tableHead";

const Table = (props) => {
  const { columns, sortColumn, items, onSort, onDelete, onLikeToggle } = props;
  return (
    <table className="table table-hover ">
      <TableHead onSort={onSort} columns={columns} sortColumn={sortColumn} />
      <tbody>
        {items.map((item) => (
          <Item
            item={item}
            key={item._id}
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
