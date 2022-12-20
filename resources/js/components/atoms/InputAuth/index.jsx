import React from "react";

const InputAuth = ({
  name,
  type = "text",
  placeholder,
  icon,
  onChange,
  isError,
  value,
}) => {
  return (
    <div className="input-group mb-3">
      <div className="input-group-prepend">
        <span className="input-group-text">
          <i className={icon}></i>
        </span>
      </div>
      <input
        name={name}
        type={type}
        className={`form-control ${isError ? "is-invalid" : null}`}
        placeholder={placeholder}
        onChange={onChange}
        value={value}
      />
    </div>
  );
};

export default InputAuth;
