import React from "react";
import { SiAddthis } from "react-icons/si";

const Head = ({ name }) => {
  return (
    <div className="flex justify-between items-center w-full">
      <div className="flex gap-2 items-center">
        <span className=" text-text text-center text-xl grid place-items-center  h-8 w-8 rounded-full bg-brandbg">
          {name?.charAt(0)}
        </span>
        <p className="text-lg font-medium">Hi {name} 👋🏿</p>
      </div>
      <SiAddthis />
      {/* <div className="text-lg font-medium flex items-center justify-center gap-2">
      </div> */}
    </div>
  );
};

export default Head;
