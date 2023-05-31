import React, { useState, useRef, useEffect } from "react";
import { UserAuth } from "../../context/AuthContext";
import { db } from "../../firebase";
import { doc, onSnapshot, updateDoc } from "firebase/firestore";
import { Link, Navigate } from "react-router-dom";
import Logo from "../../components/ui/Logo";
import Container from "../../components/ui/Container";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const SetPin = () => {
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [disabled, setDisabled] = useState(true);
  const { user } = UserAuth();
  const [loading, setLoading] = useState(true);
  const [docRef, setDocref] = useState(null);
  const ref1 = useRef();
  const ref2 = useRef();
  const ref3 = useRef();
  const ref4 = useRef();
  const button = useRef();

  useEffect(() => {
    onSnapshot(doc(db, "user", `${user?.email}`), (doc1) => {
      setData(doc1.data());
      setDocref(doc(db, "user", user?.email));
    });

    setLoading(true);
    if (data?.amount >= 0) {
      setLoading(false);
    }
  }, [data, user?.email]);

  useEffect(() => {
    if (typeof data?.pin == "number") {
      navigate("/account");
    }
  }, []);

  useEffect(() => {
    ref1.current.focus();
  }, []);

  const inputRefs = [ref1, ref2, ref3, ref4];

  function focusAndSelect(ref) {
    ref.current.focus();
    ref.current.select();
  }

  function buildCode() {
    let code = "";
    inputRefs.forEach((ref) => {
      code += ref.current.value;
    });
    return code;
  }

  async function verifyCode() {
    const data = {
      pin: Number(buildCode()),
    };

    await updateDoc(docRef, data)
      .then((docRef) => console.log(docRef))
      .catch((error) =>
        Swal.fire({
          title: "Oops...",
          text: "An error occured, Please try again.",
          icon: "error",
          confirmButtonText: "Okay",
        })
      );

    await Swal.fire({
      title: "Success",
      text: "Pin successfuly set. I genuinely pray you remember it, Please continue testing out my app.",
      icon: "success",
      confirmButtonText: "Okay",
    });

    navigate("/account");
  }

  const refHasValue = (currentRef) => currentRef.current.value;

  function allRefsPopulated() {
    return inputRefs.every(refHasValue);
  }

  function handleInput(currentRef, nextRef = currentRef) {
    if (allRefsPopulated()) {
      ref4.current.blur();
      setDisabled(false);
    } else if (currentRef.current.value) {
      focusAndSelect(nextRef);
    }

    event.preventDefault();
  }

  return (
    <Container>
      <main className="padding">
        <div className="grid place-items-center mt-12">
          <Logo color="text-brandbg" size="w-12" text="text-3xl" />
        </div>
        <h1 className="text-center mt-12 font-medium text-2xl mb-7  text-gray-900">
          Set a Pin for your Transactions.
        </h1>

        <p className="italic text-center text-sm font-medium text-gray-500">
          (This pin will help you approve transactions in your account. Please
          don't forget it, I've not implemented the reset feature yet.)
        </p>

        <div className="w-full max-w-md mx-auto mt-8 flex item-center justify-center mb-6 gap-2 text-4xl">
          <input
            className="w-1/4 appearance-none h-20 border border-grey-color text-center"
            name="input1"
            maxLength="1"
            type="number"
            ref={ref1}
            onInput={() => {
              handleInput(ref1, ref2);
            }}
            onChange={(e) => {
              if (e.target.value.length > 1) {
                e.target.value = e.target.value.slice(0, 1);
              }
            }}
          />
          <input
            className="w-1/4 h-20 border border-grey-color text-center"
            name="input2"
            maxLength="1"
            type="number"
            ref={ref2}
            onInput={() => {
              handleInput(ref2, ref3);
            }}
            onChange={(e) => {
              if (e.target.value.length > 1) {
                e.target.value = e.target.value.slice(0, 1);
              }
            }}
          />
          <input
            className="w-1/4 h-20 border border-grey-color text-center"
            name="input3"
            maxLength="1"
            type="number"
            ref={ref3}
            onInput={() => {
              handleInput(ref3, ref4);
            }}
            onChange={(e) => {
              if (e.target.value.length > 1) {
                e.target.value = e.target.value.slice(0, 1);
              }
            }}
          />
          <input
            className="w-1/4 h-20 border border-grey-color text-center"
            name="input4"
            maxLength="1"
            type="number"
            ref={ref4}
            onInput={() => {
              handleInput(ref4);
            }}
            onChange={(e) => {
              if (e.target.value.length > 1) {
                e.target.value = e.target.value.slice(0, 1);
              }
            }}
          />
        </div>

        <div className="grid mt-10 place-items-center">
          <button
            ref={button}
            className="max-w-[350px] h-12 bg-brandbg w-full rounded-lg text-text disabled:bg-opacity-70 disabled:cursor-not-allowed"
            onClick={verifyCode}
            disabled={disabled}
          >
            Submit Pin
          </button>
        </div>
      </main>
    </Container>
  );
};

export default SetPin;
