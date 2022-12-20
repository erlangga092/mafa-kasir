import React from "react";

const ButtonAuth = ({ title }) => {
  return (
    <button
      className="btn btn-primary shadow-sm rounded-sm px-4 w-100"
      type="submit"
    >
      {title}
    </button>
  );
};

export default ButtonAuth;
