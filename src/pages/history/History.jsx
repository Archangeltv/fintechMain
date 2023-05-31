import React from "react";
import NavbarAcc from "../../components/navbar/Navbar";
import { useState, useEffect, useRef } from "react";
import { UserAuth } from "../../context/AuthContext";
import { db } from "../../firebase";
import { doc, onSnapshot, updateDoc } from "firebase/firestore";
import { Link, Navigate } from "react-router-dom";
import Container from "../../components/ui/Container";
import Navbar from "../../components/navbar/Navbar";
import { MdArrowBackIosNew } from "react-icons/md";
import Swal from "sweetalert2";
import Loader from "../../components/ui/Loader";

const History = () => {
  const [data, setData] = useState(null);
  const { user } = UserAuth();
  const [loading, setLoading] = useState(false);
  const [docRef, setDocref] = useState(null);
  const ref = useRef();
  const [filter, setFilter] = useState("All");

  const buttonNames = ["All", "Deposits", "Withdrawals"];

  useEffect(() => {
    onSnapshot(doc(db, "user", `${user?.email}`), (doc1) => {
      setData(doc1.data());
      setDocref(doc(db, "user", user?.email));
    });
  }, [user?.email, user, data?.amount]);

  if (user) {
    return (
      <>
        {loading ? (
          <div className="h-[calc(100vh-300px)] flex flex-col items-center justify-center w-full ">
            <span className="loader"></span>
            <h1 className="mt-5 text-2xl font-medium text-center">
              We are preparing your dashboard, Please hold on...
            </h1>
          </div>
        ) : (
          <>
            <Container className="w-full">
              <Navbar />
              <main className="padding my-5 w-full">
                <div className="text-2xl">
                  <Link to="/account">
                    <MdArrowBackIosNew />
                  </Link>
                </div>
                <div>
                  <div className="mt-7">
                    <div className="flex items-center gap-5 mt-5">
                      <div>
                        <p className="text-xl font-medium">
                          Transaction History:
                        </p>
                      </div>
                    </div>
                    <div className="flex mt-3 gap-5">
                      <button
                        onClick={() => setFilter(buttonNames[0])}
                        className={`${
                          filter === buttonNames[0]
                            ? "bg-green-600"
                            : "bg-gray-500"
                        } px-3 py-1 rounded-lg text-text `}
                      >
                        {buttonNames[0]}
                      </button>
                      <button
                        onClick={() => setFilter(buttonNames[1])}
                        className={`${
                          filter === buttonNames[1]
                            ? "bg-green-600"
                            : "bg-gray-500"
                        } px-3 py-1 rounded-lg text-text `}
                      >
                        {buttonNames[1]}
                      </button>
                      <button
                        onClick={() => setFilter(buttonNames[2])}
                        className={`${
                          filter === buttonNames[2]
                            ? "bg-green-600"
                            : "bg-gray-500"
                        } px-3 py-1 rounded-lg text-text `}
                      >
                        {buttonNames[2]}
                      </button>
                    </div>
                    <div className="flex gap-5 mt-7 flex-col-reverse">
                      <p className="font-medium">
                        {data?.length == 0 &&
                          "You have not completed any transaction yet."}
                      </p>

                      {filter == "All" &&
                        data?.history?.map((item) => {
                          return (
                            <div
                              key={item.id}
                              className="flex gap-10 border break-words text-ellipsis shadow p-5 rounded-lg justify-between items-center"
                            >
                              <div className=" basis-3/5 grow-0 shrink-0 ">
                                <p className="mb-3 capitalize">
                                  From: {item.source}
                                </p>
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
                                className={`  ${
                                  item.type == "deposit"
                                    ? "text-green-600"
                                    : "text-red-600"
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

                      {filter == "Deposits" &&
                        data?.history
                          ?.filter((item) => item.type === "deposit")
                          .map((item) => {
                            return (
                              <div
                                key={item.id}
                                className="flex gap-10 border break-words text-ellipsis shadow p-5 rounded-lg justify-between items-center"
                              >
                                <div className=" basis-3/5 grow-0 shrink-0 ">
                                  <p className="mb-3 capitalize">
                                    From: {item.source}
                                  </p>
                                  <p>
                                    {item.time
                                      .toDate()
                                      .toLocaleString("en-US", {
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
                                  className={`  ${
                                    item.type == "deposit"
                                      ? "text-green-600"
                                      : "text-red-600"
                                  }`}
                                >
                                  {item.type == "deposit" ? "+" : "-"}
                                  {Number(item.amount).toLocaleString(
                                    undefined,
                                    {
                                      minimumFractionDigits: 2,
                                      maximumFractionDigits: 2,
                                    }
                                  )}
                                </p>
                              </div>
                            );
                          })}

                      {filter == "Withdrawals" &&
                        data?.history
                          ?.filter((item) => item.type === "withdrawal")
                          .map((item) => {
                            return (
                              <div
                                key={item.id}
                                className="flex gap-10 border break-words text-ellipsis shadow p-5 rounded-lg justify-between items-center"
                              >
                                <div className=" basis-3/5 grow-0 shrink-0 ">
                                  <p className="mb-3 capitalize">
                                    From: {item.source}
                                  </p>
                                  <p>
                                    {item.time
                                      .toDate()
                                      .toLocaleString("en-US", {
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
                                  className={`  ${
                                    item.type == "deposit"
                                      ? "text-green-600"
                                      : "text-red-600"
                                  }`}
                                >
                                  {item.type == "deposit" ? "+" : "-"}
                                  {Number(item.amount).toLocaleString(
                                    undefined,
                                    {
                                      minimumFractionDigits: 2,
                                      maximumFractionDigits: 2,
                                    }
                                  )}
                                </p>
                              </div>
                            );
                          })}
                    </div>
                  </div>
                </div>
              </main>
            </Container>
          </>
        )}
      </>
    );
  } else {
    return <Navigate to="/login" />;
  }
};

export default History;
