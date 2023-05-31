import React from "react";
import { Link } from "react-router-dom";

const Transaction = ({ data }) => {
  return (
    <div>
      <div className="mt-7">
        <div className="flex justify-between items-center gap-5 mt-5">
          <div>
            <p>Transaction History:</p>
          </div>
          <Link to="/account/history">
            <p className="text-green-600">Show ALL</p>
          </Link>
        </div>
        <div className="flex gap-5 mt-7 flex-col-reverse">
          <p className="font-medium">
            {data?.length == 0 && "You have not completed any transaction yet."}
          </p>
          {data?.slice(-3)?.map((item) => {
            return (
              <div
                key={item.id}
                className="flex gap-16 border shadow p-5 rounded-lg justify-between items-center"
              >
                <div>
                  <p className="mb-3 capitalize">From: {item.source}</p>
                  <p>
                    {item.time.toDate().toLocaleString("en-US", {
                      weekday: "long",
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                      hour: "numeric",
                      minute: "numeric",
                    })}
                  </p>
                </div>
                <p
                  className={`${
                    item.type == "deposit" ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {item.type == "deposit" ? "+" : "-"}
                  {Number(item.amount).toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
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
