import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { UserAuth } from "../../context/AuthContext";
import Swal from "sweetalert2";

const Login = () => {
  const [isShow, setIsShow] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [notLoading, setNotLoading] = useState(true);
  const navigate = useNavigate();
  const { user, signIn } = UserAuth();

  //   Handling Redirect

  useEffect(() => {
    if (user) {
      navigate("/account");
    }
  }, []);

  //   on form submit

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      setNotLoading(false);
      await signIn(email, password);
      Swal.fire({
        title: "Success",
        text: "Login Successful, Welcome Back.",
        icon: "success",
        confirmButtonText: "Okay",
      });

      const timeout = setTimeout(() => {
        navigate("/account");
      }, 3000);

      return () => clearTimeout(timeout);
    } catch (error) {
      setError(error.message);
      {
        error.message === "Firebase: Error (auth/network-request-failed)." &&
          Swal.fire({
            title: "Oops...",
            text: "Network Error, Please check your network and try again.",
            icon: "error",
            confirmButtonText: "Okay",
          });
      }
      {
        error.message === "Firebase: Error (auth/user-not-found)." &&
          Swal.fire({
            title: "Oops...",
            text: "We don't have your records with us, Check Email or Create an account.",
            icon: "error",
            confirmButtonText: "Okay",
          });
      }
      {
        error.message === "Firebase: Error (auth/wrong-password)." &&
          Swal.fire({
            title: "Oops...",
            text: "Wrong Password, Check it and try again.",
            icon: "error",
            confirmButtonText: "Okay",
          });
      }
      setNotLoading(true);
    }
  };

  return (
    <>
      <div className="w-full lg:flex items-center justify-center">
        <div className="lg:w-1/2 xl:max-w-screen-sm">
          <Link to="/">
            <div className="py-12 flex justify-center">
              <div className="cursor-pointer flex items-center">
                <div>
                  <svg
                    className="w-10 text-myGreen"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlnsXlink="http://www.w3.org/1999/xlink"
                    version="1.1"
                    id="Layer_1"
                    x="0px"
                    y="0px"
                    viewBox="0 0 225 225"
                    style={{ enableBackground: "new 0 0 225 225" }}
                    xmlSpace="preserve"
                  >
                    <g transform="matrix( 1, 0, 0, 1, 0,0) ">
                      <g>
                        <path
                          id="Layer0_0_1_STROKES"
                          className="st0"
                          d="M173.8,151.5l13.6-13.6 M35.4,89.9l29.1-29 M89.4,34.9v1 M137.4,187.9l-0.6-0.4     M36.6,138.7l0.2-0.2 M56.1,169.1l27.7-27.6 M63.8,111.5l74.3-74.4 M87.1,188.1L187.6,87.6 M110.8,114.5l57.8-57.8"
                        />
                      </g>
                    </g>
                  </svg>
                </div>
                <div className="text-2xl text-myGreen tracking-wide ml-2 font-semibold">
                  Fintech.
                </div>
              </div>
            </div>
          </Link>
          <div className="mt-10 px-12 sm:px-24 md:px-48 lg:px-12 lg:mt-0 xl:px-24 xl:max-w-2xl">
            <h2
              className="text-center text-4xl text-myGreen font-display font-semibold lg:text-center xl:text-5xl
                  xl:text-bold"
            >
              Log in
            </h2>

            {/* Form Starts  */}

            <div className="mt-12">
              <form onSubmit={handleSubmit}>
                {/* mail  */}
                <div>
                  <div className="text-sm font-bold text-brandbg tracking-wide">
                    Email Address
                  </div>
                  <input
                    className={`w-full text-lg py-2 border-b bg-transparent ${
                      error === "Firebase: Error (auth/user-not-found)."
                        ? "border-red-600"
                        : "border-myGreen"
                    } focus:outline-none focus:border-myGreen`}
                    type="email"
                    placeholder="mike@gmail.com"
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setError("");
                    }}
                  />
                </div>
                {/* password  */}
                <div className="mt-8">
                  <div className="flex justify-between items-center">
                    <div className="text-sm font-bold text-brandbg tracking-wide">
                      Password
                    </div>
                    <div>
                      <a
                        className="text-xs font-display font-semibold text-myGreen hover:opacity-70
                                      cursor-pointer"
                      >
                        Forgot Password?
                      </a>
                    </div>
                  </div>
                  <input
                    className={`w-full bg-transparent text-lg py-2 border-b ${
                      error === "Firebase: Error (auth/wrong-password)."
                        ? "border-red-600"
                        : "border-myGreen"
                    } focus:outline-none focus:border-myGreen`}
                    type={isShow ? "text" : "password"}
                    placeholder="Enter your password"
                    onChange={(e) => {
                      setPassword(e.target.value);
                      setError("");
                    }}
                  />
                  <div className="mt-3  ">
                    <input
                      type="checkbox"
                      name="show"
                      id="show"
                      className="cursor-pointer"
                      onChange={(e) => {
                        e.target.checked ? setIsShow(true) : setIsShow(false);
                      }}
                    />{" "}
                    <label htmlFor="show" className="cursor-pointer">
                      Show Password
                    </label>{" "}
                  </div>
                </div>

                {/* cta button  */}

                <div className="mt-10">
                  <button
                    disabled={
                      !notLoading ||
                      email === "" ||
                      password.trim("").length < 6
                    }
                    className="bg-myGreen disabled:cursor-not-allowed disabled:bg-opacity-70 bg-brandbg text-text p-4 w-full rounded-full tracking-wide
                              font-semibold font-display focus:outline-none focus:shadow-outline 
                              shadow-lg"
                  >
                    {notLoading ? (
                      <span className="text-xl">Log In</span>
                    ) : (
                      <div className="flex gap-2 items-center justify-center">
                        <span className="text-xl">Loading</span>
                        <div role="status">
                          <svg
                            aria-hidden="true"
                            className="inline w-4 h-4 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-myGreen"
                            viewBox="0 0 100 101"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                              fill="currentColor"
                            />
                            <path
                              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                              fill="currentFill"
                            />
                          </svg>
                          <span className="sr-only">Loading...</span>
                        </div>
                      </div>
                    )}
                  </button>
                </div>
              </form>
              <div className="mt-12 text-sm font-display font-semibold text-brandbg text-center">
                Don't have an account ?{" "}
                <Link to="/sign-up">
                  <span className="cursor-pointer text-myGreen hover:opacity-70">
                    Sign up
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
