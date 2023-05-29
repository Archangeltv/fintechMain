import React from "react";
import "../styles/error.css";

const Error = ({ success, message, display, setDisplay }) => {
  return (
    <div className={`${display ? "absolute" : "none"}`}>
      {success ? "Hi" : <IsError />}
    </div>
  );
};

export default Error;
