import { MutableRefObject, RefObject, useEffect } from "react";

export const useOnOutsideClick = (
  ref: MutableRefObject<HTMLDivElement | null>,
  callback: () => void,
) => {
  const handleClick = (e: any) => {
    if (!ref.current?.contains(e.target)) {
      callback();
      console.log("click");
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("click", handleClick);
    };
  });
};
