import React from "react";
import "./basicBtn.scss"

const BasicButton = ({ text, className, type="" }) => {
  return <button type={type} className={`basic-btn ${className}`}>{text}</button>;
};

export default BasicButton;
