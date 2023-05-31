import React, { useState } from "react";
import { Collapse } from "react-collapse";
import { MdMoveDown } from "react-icons/md";

const Individual = ({ type, placeholder, text, name, onClick, setName }) => {
  const [Isopen, setIsOpen] = useState(false);

  return (
    <div className="border p-5 mb-5">
      <div onClick={() => setIsOpen(!Isopen)}>
        <p className="text-lg">{text}</p>
      </div>
      <Collapse isOpened={Isopen}>
        <div className="border rounded-lg mt-5 flex h-12 px-5">
          <input
            value={name}
            type={type}
            placeholder={placeholder}
            onChange={(e) => {
              setName(e.target.value);
            }}
            className="text-lg font-medium h-full w-full outline-none "
          />
        </div>
        <div className="grid place-items-center">
          <button
            onClick={onClick}
            className=" mt-5 max-w-[350px] h-12  bg-brandbg w-full rounded-lg text-text "
          >
            Change
          </button>
        </div>
      </Collapse>
    </div>
  );
};

export default Individual;
