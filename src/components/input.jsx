import React from "react";
const Input = ({ name, label, value, type, autofocus, onChange }) => {
  return (
    <div className="form-group">
      <label htmlFor={name}>{label} :</label>
      <input
        name={name}
        value={value}
        onChange={onChange}
        autoFocus={autofocus}
        id={name}
        type={type}
        className="form-control"
      />
    </div>
  );
};

export default Input;
