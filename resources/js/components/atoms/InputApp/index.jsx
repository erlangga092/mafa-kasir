import React from "react";

const InputApp = ({
  name,
  type = "text",
  placeholder,
  onChange,
  isError,
  value,
  label,
  disabled = false,
}) => {
  return (
    <div className="mb-3">
      <label htmlFor="" className="fw-bold">
        {label}
      </label>
      <input
        name={name}
        type={type}
        disabled={disabled}
        className={`form-control ${isError ? "is-invalid" : null}`}
        placeholder={placeholder}
        onChange={onChange}
        value={value}
      />
      {isError && <div className="alert alert-danger mt-3">{isError}</div>}
    </div>
  );
};

export default InputApp;
