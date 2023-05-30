import React from "react";
import { FaHome } from "react-icons/fa";
import { BsFillSendFill } from "react-icons/bs";
import { CgProfile } from "react-icons/cg";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="fixed bottom-0 grid max-w-2xl w-full bg-brandbg">
      <div className="grid grid-cols-3 place-items-center text-text text-2xl p-3">
        <Link to="/account">
          <div>
            <FaHome />
          </div>
        </Link>
        <Link to="/account/deposit">
          <div>
            <BsFillSendFill />
          </div>
        </Link>
        <Link to="/account/profile">
          <div>
            <CgProfile />
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
