import React from "react";

const AddFarmFieldIcon = ({
  height = "34px",
  width = "34px",
  color = "black",
  ...props
}: React.SVGProps<SVGSVGElement>) => (
  <svg
    style={{ paddingTop: "5x" }}
    width={width}
    height={height}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 29.8847 31.309"
    {...props}
  >
    <circle
      cx="10.5"
      cy="10.5"
      r="10"
      fill="none"
      stroke="#969696"
      strokeMiterlimit="10"
      strokeDasharray="3.1408 3.1408"
    ></circle>
    <line
      x1="10.5"
      y1="5.7"
      x2="10.5"
      y2="15.3"
      fill="none"
      stroke="#969696"
      strokeMiterlimit="10"
    ></line>
    <line
      x1="5.7"
      y1="10.5"
      x2="15.3"
      y2="10.5"
      fill="none"
      stroke="#969696"
      strokeMiterlimit="10"
    ></line>
  </svg>
);

export default AddFarmFieldIcon;
