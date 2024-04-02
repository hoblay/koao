import React from "react";

function LogoIcon({className}:{className?:string} ) {

 return (
    <svg
      width="40"
      height="28"
      fill="none"
      viewBox="0 0 40 28"
    >
      <path
        fill={className}
        fillRule="evenodd"
        d="M9.986 4.115L0 14a28.268 28.268 0 006.767 4.947A13.935 13.935 0 0010 23.9c5.523 5.467 14.477 5.467 20 0a13.934 13.934 0 003.233-4.953A28.265 28.265 0 0040 14l-9.978-9.877A4.247 4.247 0 0030 4.1c-5.523-5.468-14.477-5.468-20 0l-.014.014zM29.045 20.73a28.547 28.547 0 01-18.09 0c.316.414.664.811 1.045 1.189 4.418 4.373 11.582 4.373 16 0 .381-.378.73-.775 1.044-1.19zM12.204 5.882a14.267 14.267 0 0015.59 0c-4.363-4.11-11.227-4.11-15.59 0z"
        className="ccustom"
        clipRule="evenodd"
      ></path>
    </svg>
  );
}


export default LogoIcon;
