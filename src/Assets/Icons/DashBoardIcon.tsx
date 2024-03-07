import React from "react";

const DashBoardIcon = ({
  height = "24px",
  width = "24px",
  color = "black",
  ...props
}: React.SVGProps<SVGSVGElement>) => (
  <svg
    width={width}
    height={height}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 29.8847 31.309"
    {...props}
  >
    <polyline
      points="4.577 14.013 4.577 25.561 9.268 25.561 9.268 15.735 14.042 15.735 14.042 25.561 25.312 25.561 25.312 14.013"
      fill="none"
      stroke="#00adee"
      strokeMiterlimit="10"
    ></polyline>
    <rect
      x="17.2903"
      y="15.7349"
      width="4.3305"
      height="4.3305"
      fill="none"
      stroke="#00adee"
      strokeMiterlimit="10"
    ></rect>
    <line
      x1="9.5467"
      y1="28.3655"
      x2="14.0425"
      y2="28.3655"
      fill="none"
      stroke="#00adee"
      strokeMiterlimit="10"
    ></line>
    <line
      x1="8.825"
      y1="30.809"
      x2="14.7642"
      y2="30.809"
      fill="none"
      stroke="#00adee"
      strokeMiterlimit="10"
    ></line>
    <polyline
      points="0.329 13.291 14.764 0.661 29.56 13.291"
      fill="none"
      stroke="#00adee"
      strokeMiterlimit="10"
    ></polyline>
    <polyline
      points="21.621 3.909 21.621 2.104 26.312 2.104 26.312 7.878"
      fill="none"
      stroke="#00adee"
      strokeMiterlimit="10"
    ></polyline>
  </svg>
);

export default DashBoardIcon;
