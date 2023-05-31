import React from "react";
import { Link } from "react-router-dom";

const ProfileData = ({ link, text, icon }) => {
  return (
    <div className="w-full">
      <Link to={link}>
        <div className="w-full flex gap-10 items-center h-24 my-5 shadow rounded-lg border px-5 ">
          {icon} <h3>{text}</h3>
        </div>
      </Link>
    </div>
  );
};

export default ProfileData;
