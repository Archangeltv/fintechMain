import React from "react";
import { useState, useEffect, useRef } from "react";
import { UserAuth } from "../../context/AuthContext";
import { db } from "../../firebase";
import { doc, onSnapshot, updateDoc } from "firebase/firestore";
import { Link, Navigate } from "react-router-dom";
import Container from "../../components/ui/Container";
import Navbar from "../../components/navbar/Navbar";
import { MdArrowBackIosNew, MdContactSupport, MdMessage } from "react-icons/md";
import Swal from "sweetalert2";
import Loader from "../../components/ui/Loader";
import ProfileData from "./components/ProfileData";
import { CgLogOut, CgProfile } from "react-icons/cg";

const Profile = () => {
  const [data, setData] = useState(null);
  const { user, logout } = UserAuth();
  const [loading, setLoading] = useState(false);
  const [docRef, setDocref] = useState(null);
  const [loader, setLoader] = useState(false);
  const ref = useRef();

  const [amount, setAmount] = useState("");

  const handleSignOut = async () => {
    setLoader(true);
    try {
      await logout();
      setLoader(false);
      return <Navigate to="/login" />;
    } catch (error) {
      setLoader(false);
      console.log(error.message);
    }
  };

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
            <Loader loader={loader} />
            <Container className="w-full">
              <Navbar />
              <main className="padding my-5 w-full">
                <div className="text-2xl">
                  <Link to="/account">
                    <MdArrowBackIosNew />
                  </Link>
                </div>
                <section className="flex justify-between my-3">
                  <div>
                    <h2 className="text-3xl font-semibold">My Profile</h2>
                    <p className="mt-1">{data?.name}</p>
                  </div>
                  <span className=" text-text text-center text-xl grid place-items-center  h-8 w-8 rounded-full bg-brandbg">
                    {data?.name?.charAt(0)}
                  </span>
                </section>
                <div>
                  <ProfileData
                    link="/account"
                    text="BASIC DATA"
                    icon={<CgProfile />}
                  />
                  <ProfileData
                    link="/"
                    text="CONTACT DEV"
                    icon={<MdMessage />}
                  />
                </div>
                <div
                  onClick={handleSignOut}
                  className="w-full flex gap-10 items-center h-24 my-5 shadow text-red-600 rounded-lg border-red-600 border px-5 "
                >
                  <CgLogOut /> <h3>LOG-OUT</h3>
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

export default Profile;
