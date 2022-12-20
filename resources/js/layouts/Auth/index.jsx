import React from "react";

const LayoutAuth = ({ children }) => {
  return (
    <div className="c-app flex-row align-items-center">
      <div className="container">
        <div className="row justify-content-center">{children}</div>
      </div>
    </div>
  );
};

export default LayoutAuth;
