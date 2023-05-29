import React from "react";

const Logo = ({ color, size, text }) => {
  return (
    <div>
      <div className="cursor-pointer flex items-center">
        <div>
          <svg
            className={`${color} ${size}`}
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
        <div className={`${text} ${color} tracking-wide ml-2 font-semibold`}>
          Fintech.
        </div>
      </div>
    </div>
  );
};

export default Logo;
