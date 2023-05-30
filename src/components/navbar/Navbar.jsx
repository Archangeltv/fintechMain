import React from "react";
import { FaHome } from "react-icons/fa";
import { BsFillSendFill } from "react-icons/bs";
import { CgProfile } from "react-icons/cg";

const Navbar = () => {
  return (
    <div className="fixed bottom-0 grid max-w-2xl w-full bg-brandbg">
      <div className="grid grid-cols-3 place-items-center text-text text-2xl p-3">
        <div>
          <FaHome />
        </div>
        <div>
          <BsFillSendFill />
        </div>
        <div>
          <CgProfile />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
