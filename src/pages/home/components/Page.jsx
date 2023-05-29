import React, { useEffect, useRef } from "react";
import main from "../../../assets/Main.png";
import Container from "../../../components/ui/Container";
import { TweenMax, Power3 } from "gsap";
import { Link } from "react-router-dom";

const Page = () => {
  let item = useRef(null);

  // useEffect(() => {
  //   TweenMax.to(item, 0.3, {
  //     css: {
  //       translateY: 0,
  //     },
  //     ease: Power3.easeOut,
  //   });
  // }, []);

  return (
    <Container className="">
      <main ref={(el) => (item = el)} className="padding">
        <div className="flex mt-10 lg:mt-5 items-center justify-center w-full">
          <img
            src={main}
            alt="Hero Image"
            className="max-w-[320px] text-center w-full"
          />
        </div>
        <h1 className="text-3xl mt-5 lg:mt-0 text-brandbg font-bold text-center">
          Manage your Finances in one app.
        </h1>
        <p className="mt-10 lg:mt-5 text-lg text-center">
          Bla Bla Bla. Honestly, I don't know what to put here, But manage your
          finances in one app and help me rate it at the end.
        </p>
        <div className="my-7 flex items-center gap-7 justify-between">
          <button className="w-full bg-brandbg bg-opacity-10 text-center h-12 rounded-lg text-lg shadow font-medium">
            <Link to="login">
              <span className=" block w-full">Login</span>
            </Link>
          </button>
          <button className="w-full text-center h-12 bg-brandbg rounded-lg text-text text-lg font-medium">
            <Link to="sign-up">
              {" "}
              <span className="block w-full"> Sign Up </span>
            </Link>
          </button>
        </div>
      </main>
    </Container>
  );
};

export default Page;
