import React from "react";
import { CgBell } from "react-icons/cg";
import { Link } from "react-router-dom";

const Head = ({ name, amount }) => {
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
      <Link to="/account/notification">
        <div className=" relative cursor-pointer text-2xl">
          {amount > 0 && (
            <span className="absolute text-sm right-[-5px]  text-text bg-brandbg w-5 h-5 place-items-center grid top-[-10px] rounded-full">
              {amount}
            </span>
          )}
          {amount > 9 && (
            <span className="absolute text-sm right-[-5px]  text-text bg-brandbg w-5 h-5 place-items-center grid top-[-10px] rounded-full">
              9+
            </span>
          )}
          <CgBell />
        </div>
      </Link>
    </div>
  );
};

export default Head;
