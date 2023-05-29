import { Link, Navigate } from "react-router-dom";
import Hamburger from "./Hamburger";
import { useState } from "react";
import { Collapse } from "react-collapse";
import { UserAuth } from "../../context/AuthContext";

const NavbarAcc = () => {
  const [isOpen, setIsOpen] = useState(false);
  const onClick = () => {
    setIsOpen(!isOpen);
  };

  const { logout } = UserAuth();

  const handleSignOut = async () => {
    try {
      await logout();
      return <Navigate to="/login" />;
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <>
      <div className=" bg-brandbg text-text py-2 px-3 text-sm text-center  ">
        Welcome Back✨.
      </div>
      <header className="  border-y padding shadow text-xl h-[60px] flex items-center justify-between ">
        <Link to="/">
          <h1 className="cursor-pointer flex items-center">
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
            <span className="text-text"> Fintech.</span>
          </h1>
        </Link>
        <div className="">
          <Hamburger isOpen={isOpen} onClick={onClick} />
        </div>
      </header>

      {/* collapse  */}

      <Collapse isOpened={isOpen}>
        <nav className=" bg-brandbg text-text shadow pb-5">
          <ul
            className={`flex text-lg gap-5 padding pt-3 flex-col md:gap-7 lg:gap-10 `}
          >
            <li>
              <span href="#" className="flex items-center p-2  rounded-lg ">
                <svg
                  aria-hidden="true"
                  className="w-6 h-6 text-myGreen transition duration-75 "
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"></path>
                  <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"></path>
                </svg>
                <span className="ml-3">Dashboard</span>
              </span>
            </li>
            <li>
              <span href="#" className="flex items-center p-2  rounded-lg ">
                <svg
                  aria-hidden="true"
                  className="flex-shrink-0 w-6 h-6 text-myGreen transition duration-75 "
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M8.707 7.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l2-2a1 1 0 00-1.414-1.414L11 7.586V3a1 1 0 10-2 0v4.586l-.293-.293z"></path>
                  <path d="M3 5a2 2 0 012-2h1a1 1 0 010 2H5v7h2l1 2h4l1-2h2V5h-1a1 1 0 110-2h1a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V5z"></path>
                </svg>
                <span className="flex-1 ml-3 whitespace-nowrap">Deposit</span>
              </span>
            </li>
            <li>
              <span href="#" className="flex items-center p-2  rounded-lg ">
                <svg
                  aria-hidden="true"
                  className="flex-shrink-0 w-6 h-6 text-myGreen transition duration-75 "
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 2a4 4 0 00-4 4v1H5a1 1 0 00-.994.89l-1 9A1 1 0 004 18h12a1 1 0 00.994-1.11l-1-9A1 1 0 0015 7h-1V6a4 4 0 00-4-4zm2 5V6a2 2 0 10-4 0v1h4zm-6 3a1 1 0 112 0 1 1 0 01-2 0zm7-1a1 1 0 100 2 1 1 0 000-2z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                <span className="flex-1 ml-3 whitespace-nowrap">Products</span>
              </span>
            </li>
            <li onClick={handleSignOut}>
              <span href="#" className="flex items-center p-2  rounded-lg ">
                <svg
                  aria-hidden="true"
                  className="flex-shrink-0 w-6 h-6 text-myGreen transition duration-75 "
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                <span className="flex-1 ml-3 whitespace-nowrap">Sign Out</span>
              </span>
            </li>
          </ul>
        </nav>
      </Collapse>
    </>
  );
};

export default NavbarAcc;
