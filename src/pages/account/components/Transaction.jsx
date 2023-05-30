import React from "react";
import { Link } from "react-router-dom";

const Transaction = ({ data }) => {
  return (
    <div>
      <div className="mt-7">
        <div>
          <p>Transaction History:</p>
        </div>
        <div className="flex items-center gap-5 mt-5">
          <button className="bg-[#EBB850] px-5 rounded-lg">All</button>
          <button>Deposits</button>
          <button>Withdrawals</button>
        </div>
        <div className="flex gap-5 mt-7 flex-col-reverse">
          <p className="font-medium">
            {data?.length == 0 && "You have not completed any transaction yet."}
          </p>
          {data?.map((item) => {
            return (
              <div
                key={item.id}
                className="flex gap-16 border shadow p-5 rounded-lg justify-between items-center"
              >
                <div>
                  <p className="mb-3 capitalize">{item.source}</p>
                  <p>{item.time.toDate().toString()}</p>
                </div>
                <p
                  className={`${
                    item.type == "deposit" ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {item.type == "deposit" ? "+" : "-"}
                  {item.amount}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Transaction;
