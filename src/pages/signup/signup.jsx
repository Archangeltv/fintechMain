import React from "react";
import { useEffect, useState, useRef } from "react";
import { UserAuth } from "../../context/AuthContext";
import { Navigate, useNavigate, Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SignUp = () => {
  const { user, signUp } = UserAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const navigate = useNavigate();
  const [isShow, setIsShow] = useState(false);
  const [notLoading, setNotLoading] = useState(true);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setNotLoading(false);
      await signUp(name, email, password);
      toast.success("Sign-Up Successful");
      const timeout = setTimeout(() => {
        navigate("/account");
      }, 3000);
      return () => clearTimeout(timeout);
    } catch (e) {
      setNotLoading(true);
      e.message === "Firebase: Error (auth/email-already-in-use)." &&
        toast.error("Email already in use!");
      e.message === "Firebase: Error (auth/network-request-failed)." &&
        toast.error("Network Error");
    }
  };

  useEffect(() => {
    // if (user) {
    //   navigate("/account");
    //   console.log(user);
    // }
  }, [user, navigate]);

  return (
    <>
      {/* head  */}
      <div className="w-full lg:flex items-center justify-center">
        <div className="lg:w-1/2 xl:max-w-screen-sm">
          <Link to="/">
            <div className="py-10 flex justify-center">
              <div className="cursor-pointer flex items-center">
                <div>
                  <svg
                    className="w-10 text-text"
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
                <div className="text-2xl text-text tracking-wide ml-2 font-semibold">
                  Fintech.
                </div>
              </div>
            </div>
          </Link>
          <div className="mt-10 px-12 sm:px-24 md:px-48 lg:px-12 lg:mt-0 xl:px-24 xl:max-w-2xl">
            <h2
              className="text-center text-2xl text-text font-display font-semibold lg:text-center xl:text-3xl
              xl:text-bold"
            >
              Create a new Account with us.
            </h2>

            {/* Form Starts  */}

            <div className="mt-12">
              <form onSubmit={handleSubmit}>
                {/* name  */}
                <div>
                  <div className="text-sm font-bold text-white tracking-wide">
                    Your Name
                  </div>
                  <input
                    className="w-full text-text text-lg py-2 border-b bg-transparent focus:outline-none"
                    type="text"
                    required
                    placeholder="Your name here"
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>

                {/* email  */}

                <div className="mt-8">
                  <div className="text-sm font-bold text-text tracking-wide">
                    Email Address
                  </div>
                  <input
                    className="w-full text-text text-lg py-2 border-b bg-transparent border-text focus:outline-none focus:border-text"
                    type="email"
                    required
                    placeholder="e.g: mike@gmail.com"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                {/* Password  */}

                <div className="mt-8">
                  <div className="flex justify-between items-center">
                    <div className="text-sm font-bold text-text tracking-wide">
                      Password
                    </div>
                    <div>
                      <a
                        className="text-xs  font-display font-semibold text-text hover:opacity-70
                                  cursor-pointer"
                      >
                        Atleast 6 characters.
                      </a>
                    </div>
                  </div>
                  <input
                    className={`w-full bg-transparent text-text text-lg py-2 border-b ${
                      error ? "border-red-600" : "border-text"
                    } focus:outline-none focus:border-text`}
                    type={isShow ? "text" : "password"}
                    placeholder="Enter your password"
                    required
                    onChange={(e) => {
                      setPassword(e.target.value);
                      if (e.target.value === confirmPassword) {
                        setError(false);
                      } else {
                        setError(true);
                      }
                    }}
                  />

                  {/* Show password  */}

                  <div className="mt-3  ">
                    <input
                      type="checkbox"
                      name="show"
                      id="show"
                      className="cursor-pointer checked:bg-text"
                      onChange={(e) => {
                        e.target.checked ? setIsShow(true) : setIsShow(false);
                      }}
                    />{" "}
                    <label htmlFor="show" className="cursor-pointer">
                      Show Password
                    </label>{" "}
                  </div>
                </div>

                {/* confirmPassword  */}

                <div className="mt-4">
                  <div className="flex justify-between items-center">
                    <div className="text-sm font-bold text-text  tracking-wide">
                      Confirm Password
                    </div>
                    <div></div>
                  </div>
                  <input
                    className={`w-full text-text bg-transparent text-lg py-2 border-b ${
                      error ? "border-red-600" : "border-text"
                    } focus:outline-none focus:border-text`}
                    type={isShow ? "text" : "password"}
                    required
                    placeholder="Enter your password"
                    onChange={(e) => {
                      setConfirmPassword(e.target.value);
                      if (e.target.value === password) {
                        setError(false);
                      } else {
                        setError(true);
                      }
                    }}
                  />
                </div>

                {/* Sign Up button  */}

                <div className="mt-10">
                  <button
                    disabled={
                      !notLoading ||
                      error ||
                      password === "" ||
                      confirmPassword === "" ||
                      name === "" ||
                      email === "" ||
                      password.trim("").length < 6
                    }
                    className="grad text-text disabled:cursor-not-allowed p-4 w-full rounded-full tracking-wide
                            font-semibold font-display focus:outline-none focus:shadow-outline 
                            shadow-lg"
                  >
                    {notLoading ? (
                      <span className="text-xl">Register</span>
                    ) : (
                      <div className="flex gap-2 items-center justify-center">
                        <span className="text-xl">Loading</span>
                        <div role="status">
                          <svg
                            aria-hidden="true"
                            className="inline w-4 h-4 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-text"
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

              {/* Redirect  */}

              <div className="mt-12 pb-20 text-sm font-display font-semibold text-text text-center">
                Already have an account ?{" "}
                <Link to="/login">
                  <span className="cursor-pointer text-text hover:opacity-70">
                    Login
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer
        position="top-left"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        draggable
        pauseOnHover
      />
    </>
  );
};

export default SignUp;
