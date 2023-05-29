import React from "react";
import NavbarAcc from "../../components/navbar/Navbar";
import { useState, useEffect } from "react";
import { UserAuth } from "../../context/AuthContext";
import { db } from "../../firebase";
import { doc, onSnapshot, updateDoc } from "firebase/firestore";
import { Link, Navigate } from "react-router-dom";

const Account = () => {
  const [data, setData] = useState(null);
  const { user } = UserAuth();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    onSnapshot(doc(db, "user", `${user?.email}`), (doc) => {
      setData(doc.data());
    });
    setLoading(true);
    if (data?.amount >= 0) {
      setLoading(false);
    }
    console.log(user);
    console.log(data);
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
            <NavbarAcc />

            <div className="padding text-text">
              <h1 className="heading mt-5">Hey {data?.name}! </h1>
              <p>Welcome back, your account's doing just fine.✌</p>

              <div>
                <div></div>
                <div></div>
              </div>
            </div>
          </>
        )}
      </>
    );
  } else {
    return <Navigate to="/login" />;
  }
};

export default Account;
