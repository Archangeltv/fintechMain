import React from "react";
import { CgBell } from "react-icons/cg";
import { Link } from "react-router-dom";

const Head = ({ name }) => {
  return (
    <div className="flex justify-between items-center w-full">
      <Link to="/account/profile">
        <div className="flex gap-2 items-center">
          <span className=" text-text text-center text-xl grid place-items-center  h-8 w-8 rounded-full bg-brandbg">
            {name?.charAt(0)}
          </span>
          <p className="text-lg font-medium">Hi {name} 👋🏿</p>
        </div>
      </Link>
      <div className="cursor-pointer text-2xl">
        <CgBell />
      </div>
    </div>
  );
};

export default Head;
