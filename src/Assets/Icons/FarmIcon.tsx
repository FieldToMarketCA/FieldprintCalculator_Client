import React from "react";

const FarmIcon = ({
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
      d="M7092.446,5958.4425h-4.1687v-4.1687h4.1687v4.1687Zm7.9507-5.29-10.0341-4.0907-10.0361,4.0907-3.5158,8.9413h2.0854v8.8593h7.2958v-8.3395h8.3395v8.3395h7.2958v-8.8593h2.0854Z"
      transform="translate(-7065.888 -5940.2239)"
      fill="none"
      stroke="#949494"
      strokeMiterlimit="10"
    ></path>
    <path
      d="M7078.8941,5951.0842v-4.1062h0.002a6.2541,6.2541,0,1,0-12.5082,0v23.9727h10.4228"
      transform="translate(-7065.888 -5940.2239)"
      fill="none"
      stroke="#949494"
      strokeMiterlimit="10"
    ></path>
    <line
      x1="20.9245"
      y1="22.9599"
      x2="28.5745"
      y2="30.6099"
      fill="none"
      stroke="#949494"
      stroke-linecap="round"
      stroke-linejoin="round"
    ></line>
    <line
      x1="28.1245"
      y1="22.9599"
      x2="20.4745"
      y2="30.6099"
      fill="none"
      stroke="#949494"
      stroke-linecap="round"
      stroke-linejoin="round"
    ></line>
    <line
      x1="19.1245"
      y1="30.7288"
      x2="35.9392"
      y2="30.7288"
      fill="none"
      stroke="#949494"
      strokeMiterlimit="10"
    ></line>
    <line
      x1="0.4495"
      y1="7.2099"
      x2="13.0495"
      y2="7.2099"
      fill="none"
      stroke="#949494"
      strokeMiterlimit="10"
    ></line>
  </svg>
);

export default FarmIcon;
