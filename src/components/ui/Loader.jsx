import React from "react";
import "./loader.css";

const Loader = ({ loader }) => {
  return (
    <div
      className={`${
        loader ? "block" : "hidden"
      } bg-white bg-opacity-50 absolute w-full h-screen`}
    >
      <div className="grid place-items-center h-full">
        <span className="loader"></span>
      </div>
    </div>
  );
};

export default Loader;
