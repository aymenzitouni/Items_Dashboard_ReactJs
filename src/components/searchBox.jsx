import React from "react";

const SearchBox = ({ value, onChange }) => {
  return (
    <input
      name="query"
      type="search"
      className="form-control my-3"
      placeholder="Search..."
      value={value}
      autoComplete="off"
      spellCheck="false"
      onChange={(e) => onChange(e.currentTarget.value)}
    />
  );
};

export default SearchBox;
