import React from "react";

const CheckIcon = ({
  height = "24px",
  width = "24px",
  color = "black",
  ...props
}: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    viewBox="0 0 24 24"
    {...props}
  >
    <circle cx="12" cy="12" r="3.2" fill={color} />
    <path
      d="M9 2L7.17 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2h-3.17L15 2H9zm3 15c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5z"
      fill={color}
    />
    <path d="M0 0h24v24H0z" fill="none" />
  </svg>
);

export default CheckIcon;
