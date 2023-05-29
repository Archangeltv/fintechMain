import React from "react";

const Container = ({ children, className }) => {
  return (
    <div className="w-full grid place-items-center">
      <div className={` ${className} max-w-2xl min-h-screen `}>{children}</div>
    </div>
  );
};

export default Container;
