import React, { useState } from "react";
import { UserAuth } from "../../context/AuthContext";
import Container from "../../components/ui/Container";
import Logo from "../../components/ui/Logo";
import Swal from "sweetalert2";

const Reset = () => {
  const { passwordReset } = UserAuth();

  const [email, setEmail] = useState("");
  const [emailMessage, setEmailMessage] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      //   await passwordReset(email);
      Swal.fire({
        title: "Sorry..",
        text: "I've not hardcoded this functionality yet",
        icon: "info",
        confirmButtonText: "Okay",
      });
      //   setEmailMessage(true);
    } catch (error) {
      if (error.code === "auth/user-not-found") {
        Swal.fire({
          title: "Oops...",
          text: "User not found, Please check email and try again",
          icon: "error",
          confirmButtonText: "Okay",
        });
      } else if (error.code === "auth/network-request-failed") {
        Swal.fire({
          title: "Oops...",
          text: "Network error, Please check your network and try again",
          icon: "error",
          confirmButtonText: "Okay",
        });
      }
    }
  };

  return (
    <Container className="w-full">
      <div className="w-full mt-5 padding h-100vh">
        <div className="w-full mb-10 grid place-items-center">
          <Logo color="text-brandbg" size="w-12" text="text-3xl" />
        </div>
        {emailMessage ? (
          <h3>The Email has been sent; Check your Inbox!</h3>
        ) : (
          <form onSubmit={handleSubmit}>
            <p className="text-xl mb-10 font-medium">Reset Password</p>
            <div className="border rounded-lg mt-5 flex h-12 px-5">
              <input
                type="email"
                name="email"
                placeholder="Enter registered email here"
                onChange={(e) => setEmail(e.target.value)}
                className="text-lg font-medium h-full w-full outline-none"
                required
              />
            </div>
            <div className="grid place-items-center">
              <button
                className=" mt-5 max-w-[350px] h-12  bg-brandbg w-full rounded-lg text-text "
                type="submit"
              >
                Reset Your Password
              </button>
            </div>
          </form>
        )}
      </div>
    </Container>
  );
};

export default Reset;
