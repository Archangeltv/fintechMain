import React from "react";
import NavbarAcc from "../../components/navbar/Navbar";
import { useState, useEffect } from "react";
import { UserAuth } from "../../context/AuthContext";
import { db } from "../../firebase";
import { doc, onSnapshot, updateDoc } from "firebase/firestore";
import { Link, Navigate } from "react-router-dom";
import Container from "../../components/ui/Container";
import Head from "./components/Head";
import BalanceCard from "./components/BalanceCard";
import Bottom from "./components/Bottom";
import Navbar from "../../components/navbar/Navbar";

const Account = () => {
  const [data, setData] = useState(null);
  const { user } = UserAuth();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    onSnapshot(doc(db, "user", `${user?.email}`), (doc) => {
      setData(doc.data());
    });
    // setLoading(true);
    // if (data?.balance >= 0) {
    //   setLoading(false);
    // }
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
            <Container className="w-full">
              <Navbar />
              <main className="padding my-5 w-full">
                <Head name={data?.name} />
                <BalanceCard amount={data?.balance} mail={user?.email} />
                <p className="text-center mt-3 text-sm">
                  Note: Send and recieve money with your email.
                </p>
                <Bottom />
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

export default Account;
