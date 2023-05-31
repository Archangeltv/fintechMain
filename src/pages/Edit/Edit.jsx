import React from "react";
import NavbarAcc from "../../components/navbar/Navbar";
import { useState, useEffect, useRef } from "react";
import { UserAuth } from "../../context/AuthContext";
import { db } from "../../firebase";
import { doc, onSnapshot, updateDoc } from "firebase/firestore";
import { Await, Link, Navigate } from "react-router-dom";
import Container from "../../components/ui/Container";
import Navbar from "../../components/navbar/Navbar";
import { MdArrowBackIosNew } from "react-icons/md";
import Swal from "sweetalert2";
import Loader from "../../components/ui/Loader";
import { Collapse } from "react-collapse";
import Individual from "./components/Individual";

const Edit = () => {
  const [data, setData] = useState(null);
  const { user } = UserAuth();
  const [loading, setLoading] = useState(false);
  const [docRef, setDocref] = useState(null);
  const [loader, setLoader] = useState(false);
  const ref = useRef();
  const [openUsername, setOpenUsername] = useState(false);
  const [name, setName] = useState("");
  const [pin, setPin] = useState("");

  const [amount, setAmount] = useState("");

  async function changeUsername() {
    if (name == "" || name.length < 3) {
      Swal.fire({
        icon: "error",
        title: "Ooops...",
        text: "New username must be more than 3 characters",
        confirmButtonText: "Okay",
      });
      return;
    }

    setLoader(true);

    const format = {
      name: name,
    };

    updateDoc(docRef, format)
      .then((res) => {
        Swal.fire({
          icon: "success",
          title: "Success",
          text: "You successfully changed your name",
          confirmButtonText: "Okay",
        });
        setName("");
      })
      .catch((error) =>
        Swal.fire({
          icon: "error",
          title: "Oops.....",
          text: "Your request wasn't successful",
          confirmButtonText: "Okay",
        })
      );

    setLoader(false);
  }

  async function changePin() {
    if (pin == "" || pin.length > 4 || pin.length < 4) {
      Swal.fire({
        icon: "error",
        title: "Ooops...",
        text: "New pin must be exactly 4 characters",
        confirmButtonText: "Okay",
      });
      return;
    }

    setLoader(true);

    const format = {
      pin: pin,
    };

    updateDoc(docRef, format)
      .then((res) => {
        Swal.fire({
          icon: "success",
          title: "Success",
          text: "You successfully changed your pin",
          confirmButtonText: "Okay",
        });
        setPin("");
      })
      .catch((error) =>
        Swal.fire({
          icon: "error",
          title: "Oops.....",
          text: "Your request wasn't successful",
          confirmButtonText: "Okay",
        })
      );

    setLoader(false);
  }

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
                  <Link to="/account/profile">
                    <MdArrowBackIosNew />
                  </Link>
                </div>
                <div className="my-10">
                  <h2 className="text-2xl font-medium mb-5">Deposit Funds</h2>
                  <Individual
                    type="text"
                    name={name}
                    placeholder="Enter new username"
                    text="Change Username"
                    setName={setName}
                    onClick={changeUsername}
                  />
                  <Individual
                    type="number"
                    name={pin}
                    placeholder="Enter new pin"
                    text="Change Pin"
                    setName={setPin}
                    onClick={changePin}
                  />
                  <Link to="/resetpass">
                    <div className="border p-5 mb-5">
                      <p className="text-lg">Reset Password</p>
                    </div>
                  </Link>
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

export default Edit;
