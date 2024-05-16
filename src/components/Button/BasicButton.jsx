import React from "react";
import "./basicBtn.scss"

const BasicButton = ({ text, className }) => {
  return <button className={`basic-btn ${className}`}>{text}</button>;
};

export default BasicButton;
