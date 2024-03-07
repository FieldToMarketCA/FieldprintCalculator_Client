import React from "react";

const FieldIcon = ({
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
    <path
      d="M61.7688,231.5875a22.8,22.8,0,0,1,22.8,22.8"
      transform="translate(-61.7687 -231.0875)"
      fill="none"
      stroke="#969696"
      strokeMiterlimit="10"
    ></path>
    <path
      d="M61.7688,238.3563A16.0312,16.0312,0,0,1,77.8,254.3875"
      transform="translate(-61.7687 -231.0875)"
      fill="none"
      stroke="#969696"
      strokeMiterlimit="10"
    ></path>
    <path
      d="M61.7688,245.25a9.1378,9.1378,0,0,1,9.1378,9.1378"
      transform="translate(-61.7687 -231.0875)"
      fill="none"
      stroke="#969696"
      strokeMiterlimit="10"
    ></path>
    <path
      d="M76.3749,236.88a22.7078,22.7078,0,0,1,14.6063-5.2923"
      transform="translate(-61.7687 -231.0875)"
      fill="none"
      stroke="#969696"
      strokeMiterlimit="10"
    ></path>
    <path
      d="M80.8755,241.942a15.9646,15.9646,0,0,1,10.1058-3.5857"
      transform="translate(-61.7687 -231.0875)"
      fill="none"
      stroke="#969696"
      strokeMiterlimit="10"
    ></path>
    <path
      d="M83.8922,248.6212a9.12,9.12,0,0,1,7.089-3.3715"
      transform="translate(-61.7687 -231.0875)"
      fill="none"
      stroke="#969696"
      strokeMiterlimit="10"
    ></path>
  </svg>
);

export default FieldIcon;
