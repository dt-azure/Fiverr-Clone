import React from "react";
import "./basicBtn.scss";

const BasicButton = ({ text, className, type = "", onClick = null }) => {
  return (
    <button type={type} className={`basic-btn ${className}`} onClick={onClick}>
      {text}
    </button>
  );
};

export default BasicButton;
