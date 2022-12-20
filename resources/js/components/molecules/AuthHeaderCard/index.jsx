import React from "react";

const AuthHeaderCard = ({ title, desc }) => {
  return (
    <div className="text-start">
      <h5>{title}</h5>
      {desc && <p className="text-muted">{desc}</p>}
    </div>
  );
};

export default AuthHeaderCard;
