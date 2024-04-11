import React from "react";

export type Icon = {
  className?: string,
}

function HalfStarIcon({className}:Icon) {
  return (
    <svg
    className={className}
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      stroke="currentColor"
      strokeWidth="0"
      viewBox="0 0 512 512"
    >
      <path
        fill="none"
        strokeLinejoin="round"
        strokeWidth="32"
        d="M480 208H308L256 48l-52 160H32l140 96-54 160 138-100 138 100-54-160z"
      ></path>
      <path d="M256 48v316L118 464l54-160-140-96h172l52-160z"></path>
    </svg>
  );
}

export default HalfStarIcon;