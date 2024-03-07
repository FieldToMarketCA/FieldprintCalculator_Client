import React from "react";

const SupportIcon = ({
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
    <circle
      cx="13.6"
      cy="13.6"
      r="13.1"
      fill="none"
      stroke="#616161"
      strokeMiterlimit="10"
    ></circle>
    <path
      d="M42.0067,633.6374a3.4077,3.4077,0,0,1,3.6984-3.2874,3.2362,3.2362,0,0,1,3.2882,3.2874c0,0.83-.258,1.7868-1.7714,3.3s-1.7219,2.3-1.7219,3.0191V640.83"
      transform="translate(-31.9 -624.3)"
      fill="none"
      stroke="#616161"
      strokeMiterlimit="10"
    ></path>
    <circle
      cx="13.6"
      cy="20.15"
      r="0.8733"
      fill="none"
      stroke="#616161"
      strokeMiterlimit="10"
    ></circle>
  </svg>
);

export default SupportIcon;
