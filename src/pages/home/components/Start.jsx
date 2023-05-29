import React, { useRef, useEffect } from "react";
import Logo from "../../../components/ui/Logo";
import { TweenMax, Power3 } from "gsap";

const Start = (props) => {
  let item = useRef(null);

  useEffect(() => {
    TweenMax.to(item, 0.3, {
      css: {
        top: 0,
      },
      ease: Power3.easeIn,
    });

    if (props.loading == false) {
      TweenMax.to(item, 0.3, {
        css: {
          top: -1000,
        },
        ease: Power3.easeInOut,
      });
    }
  }, [item, props]);

  return (
    <div
      ref={(el) => {
        item = el;
      }}
      className="w-full top-[-100%] absolute bg-brandbg grid place-items-center h-screen"
    >
      <Logo color="text-text" size="w-12" text="text-3xl" />
    </div>
  );
};

export default Start;
