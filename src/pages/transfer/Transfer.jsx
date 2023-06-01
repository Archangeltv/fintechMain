import React from "react";
import { useState, useEffect, useRef } from "react";
import { UserAuth } from "../../context/AuthContext";
import { db } from "../../firebase";
import {
  doc,
  onSnapshot,
  updateDoc,
  getDoc,
  getFirestore,
  collection,
} from "firebase/firestore";
import { Link, Navigate } from "react-router-dom";
import Container from "../../components/ui/Container";
import Navbar from "../../components/navbar/Navbar";
import { MdArrowBackIosNew } from "react-icons/md";
import Swal from "sweetalert2";
import Loader from "../../components/ui/Loader";

const Transfer = () => {
  const [data, setData] = useState(null);
  const [display, setDisplay] = useState(true);
  const [data1, setData1] = useState(null);
  const { user } = UserAuth();
  const [loading, setLoading] = useState(false);
  const [docRef, setDocref] = useState(null);
  const [loader, setLoader] = useState(false);
  const ref = useRef();
  const [docss, setDocss] = useState(null);

  const [amount, setAmount] = useState("");
  const [mail, setEmail] = useState("");

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
      balance: Number(data?.balance) - Number(amount),
    };

    const format = {
      history: [
        ...data?.history,
        {
          id: data?.history.length + 1,
          time: new Date(),
          amount: amount,
          type: "withdrawal",
          source: "You",
        },
      ],
    };

    const hist = {
      history: [
        ...docss?.history,
        {
          id: docss?.history.length + 1,
          time: new Date(),
          amount: amount,
          type: "deposit",
          source: data?.name,
        },
      ],
    };

    const notifSender = {
      notification: [
        ...data?.notification,
        {
          id: data?.notification?.length + 1,
          read: false,
          name: docss?.name,
          type: "sent",
          time: new Date(),
          amount: amount,
        },
      ],
    };

    const notifReciever = {
      notification: [
        ...docss?.notification,
        {
          id: docss?.notification?.length + 1,
          read: false,
          name: data?.name,
          type: "recieved",
          time: new Date(),
          amount: amount,
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

    const add = {
      balance: Number(docss?.balance) + Number(amount),
    };

    if (pin == data?.pin) {
      if (amount <= data?.balance) {
        await updateDoc(docRef, datum)
          .then((docc) => {
            updateDoc(docRef, format);
            updateDoc(doc(db, "user", mail), add);
            updateDoc(doc(db, "user", mail), notifReciever);
            updateDoc(docRef, notifSender);
            updateDoc(doc(db, "user", mail), hist);
            Swal.fire({
              title: "Success",
              text: `You just sent a sum of $${amount} to ${docss?.name}`,
              icon: "success",
              confirmButtonText: "Okay",
            });
          })
          .catch((error) => {
            Swal.fire({
              title: "Oops...",
              text: "An error occured, Please try again.",
              icon: "error",
              confirmButtonText: "Okay",
            });
            console.log(error);
          });
      } else
        Swal.fire({
          title: "Oops...",
          text: "You don't have enough funds to carry on with this transaction, please make a deposit",
          icon: "error",
          confirmButtonText: "Okay",
        });

      setLoader(false);

      setAmount("");
      setEmail("");
      setDisplay(true);
    } else {
      Swal.fire({
        title: "Oops...",
        text: "Please check your pin and try again",
        icon: "error",
        confirmButtonText: "Okay",
      });
      setLoader(false);
    }
  }

  useEffect(() => {
    onSnapshot(doc(db, "user", `${user?.email}`), (doc1) => {
      setData(doc1.data());
      setDocref(doc(db, "user", user?.email));
    });

    // setLoading(true);
    // if (data?.balance >= 0) {
    //   setLoading(false);
    // }
  }, [user?.email, user, data?.amount]);

  async function Check() {
    const docReff = doc(db, "user", mail);
    const docSnap = await getDoc(docReff);

    if (docSnap.exists()) {
      setDisplay(false);
      setDocss(docSnap.data());
    } else {
      // docSnap.data() will be undefined in this case
      Swal.fire({
        title: "Oops...",
        text: "Email not found, Please check again.",
        icon: "error",
        confirmButtonText: "Okay",
      });
    }
  }

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
                  <h2 className="text-2xl font-medium mb-5">
                    Transfer Funds to Loved Ones.
                  </h2>
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
                        setAmount(e.target.value);
                      }}
                      className="text-center text-2xl font-medium h-full w-full outline-none "
                    />
                  </div>
                  <p className="my-5 text-center text-lg font-medium ">TO</p>
                  <div className="border flex h-16 px-5">
                    <input
                      //   ref={ref}
                      type="email"
                      value={mail}
                      placeholder="email"
                      onChange={(e) => {
                        setEmail(e.target.value);
                      }}
                      className="text-center text-2xl font-medium h-full w-full outline-none "
                    />
                  </div>
                  <p className="text-center mt-5">
                    Please note that you are sending imaginary funds😂😂.
                  </p>
                </div>
                <div
                  className={` place-items-center ${
                    display ? "grid" : "hidden"
                  }`}
                >
                  <button
                    onClick={Check}
                    disabled={
                      mail === "" ||
                      amount == "" ||
                      Number(amount) < 1 ||
                      mail == user?.email
                    }
                    className="max-w-[350px] h-12  bg-brandbg w-full rounded-lg text-text disabled:bg-opacity-70 disabled:cursor-not-allowed"
                  >
                    Confirm
                  </button>
                </div>
                <div className={`  ${display ? "hidden" : "Block"}`}>
                  <Confirm name={docss?.name} amount={amount} email={mail} />
                  <div
                    className={` place-items-center grid
                  `}
                  >
                    <button
                      onClick={send}
                      className="max-w-[350px] h-12  bg-brandbg w-full rounded-lg text-text disabled:bg-opacity-70 disabled:cursor-not-allowed"
                    >
                      Confirm
                    </button>
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

const Confirm = ({ name, amount, email }) => {
  return (
    <section>
      <p className="text-center text-lg font-medium mb-10">
        You are about to send ${amount} to {name} with email: {email}.
      </p>
    </section>
  );
};

export default Transfer;
