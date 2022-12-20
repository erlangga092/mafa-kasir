import React from "react";

const AppHeaderCard = ({ title, icon }) => {
  return (
    <div className="card-header">
      <span className="font-weight-bold">
        <i className={icon}></i> {title}
      </span>
    </div>
  );
};

export default AppHeaderCard;
