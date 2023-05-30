import React from "react";
import { BsSendFill } from "react-icons/bs";
import {
  BsFillArrowRightCircleFill,
  BsFillSuitHeartFill,
} from "react-icons/bs";
import { MdOutlinePayments } from "react-icons/md";

const Bottom = () => {
  return (
    <div>
      <div className="flex items-center justify-center gap-5 mt-3 flex-wrap">
        <div className=" w-24 text-center p-3  flex flex-col items-center justify-center shadow ">
          <div className="text-3xl  mb-2">
            <BsSendFill />
          </div>
          Transfer
        </div>
        <div className="w-24 text-center  p-3 flex flex-col items-center justify-center shadow">
          <div className="text-3xl  mb-2">
            <BsFillArrowRightCircleFill />
          </div>
          Deposit
        </div>
        <div className="w-24 text-center  p-3 flex flex-col items-center justify-center shadow">
          <div className="text-3xl  mb-2">
            <MdOutlinePayments />
          </div>
          Pay Bills
        </div>
        <div className="w-24 text-center  p-3 flex flex-col items-center justify-center shadow">
          <div className="text-3xl  mb-2">
            <BsFillSuitHeartFill />
          </div>
          Rate Me
        </div>
      </div>
    </div>
  );
};

export default Bottom;
