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

const Deposit = () => {
  const [data, setData] = useState(null);
  const { user } = UserAuth();
  const [loading, setLoading] = useState(false);
  const [docRef, setDocref] = useState(null);
  const [loader, setLoader] = useState(false);
  const ref = useRef();

  const [amount, setAmount] = useState("");

  async function send() {
    if (data?.pin == null) {
      Swal.fire({
        title: "Oops...",
        text: `Please set a pin first.`,
        icon: "error",
        confirmButtonText: "Okay",
      });
      return;
    }

    const datum = {
      balance: Number(data?.balance) + Number(amount),
    };

    const format = {
      history: [
        ...data?.history,
        {
          id: data?.history.length + 1,
          time: new Date(),
          amount: amount,
          type: "deposit",
          source: "imagination",
        },
      ],
    };

    setLoader(true);

    const { value: pin } = await Swal.fire({
      title: "Enter your PIN",
      input: "number",
      inputLabel: "4 digit Pin",
      inputValue: "",
      showCancelButton: true,
      inputValidator: (value) => {
        if (!value) {
          return;
        }
      },
    });

    if (pin == data?.pin) {
      await updateDoc(docRef, datum)
        .then((doc) => {
          updateDoc(docRef, format);
          Swal.fire({
            title: "Success",
            text: `You just deposited a sum of $${amount}. Spend the way you like.`,
            icon: "success",
            confirmButtonText: "Okay",
          });
        })
        .catch((error) =>
          Swal.fire({
            title: "Oops...",
            text: "An error occured, Please try again.",
            icon: "error",
            confirmButtonText: "Okay",
          })
        );
    } else
      Swal.fire({
        title: "Oops...",
        text: "Pin incorrect, Try again.",
        icon: "error",
        confirmButtonText: "Okay",
      });

    setLoader(false);

    ref.current.value = "";
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
                  <Link to="/account">
                    <MdArrowBackIosNew />
                  </Link>
                </div>
                <div className="my-10">
                  <h2 className="text-2xl font-medium mb-5">Deposit Funds</h2>
                  <div className="border flex h-16 px-5">
                    <p className="h-full text-2xl font-medium grid place-items-center">
                      $
                    </p>
                    <input
                      ref={ref}
                      value={amount}
                      type="number"
                      placeholder="amount"
                      onChange={(e) => {
                        setAmount(e.target.value.toLocaleString());
                      }}
                      className="text-center text-2xl font-medium h-full w-full outline-none "
                    />
                  </div>
                  <p
                    className="text-center mt-5"
                    onClick={() => console.log(amount.length)}
                  >
                    Please note that you are depositing imaginary funds😂😂.
                  </p>
                </div>
                <div className="grid place-items-center">
                  <button
                    onClick={send}
                    disabled={amount === ""}
                    className="max-w-[350px] h-12  bg-brandbg w-full rounded-lg text-text disabled:bg-opacity-70 disabled:cursor-not-allowed"
                  >
                    Deposit
                  </button>
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

export default Deposit;
