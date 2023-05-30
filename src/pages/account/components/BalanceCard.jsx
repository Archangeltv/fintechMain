import React from "react";
import svg1 from "../../../assets/Ellipse 184.svg";
import svg2 from "../../../assets/Rectangle 4055.svg";
import svg3 from "../../../assets/Rectangle 4056.svg";
import { BsFillArrowRightCircleFill } from "react-icons/bs";

const BalanceCard = ({ amount, mail }) => {
  return (
    <div className="mt-5 relative">
      <div className="bg-brandbg h-[250px] rounded-3xl w-full">
        <img src={svg1} className="absolute bottom-0" alt="" />
        <img src={svg2} alt="" className="top-0 absolute right-0 z-10" />
        <img src={svg3} alt="" className="top-0 absolute right-0 z-0" />
        <div className="p-5 py-10 h-full flex flex-col">
          <p className="text-text text-lg font-medium">Total Balance:</p>
          <p className="text-3xl mt-5 text-text font-medium">${amount}</p>
          <p className="mt-5 text-sm text-text">{mail}</p>
          <div className=" flex items-center gap-3 self-end justify-self-end mt-10 text-text text-lg font-medium">
            Deposit <BsFillArrowRightCircleFill />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BalanceCard;
