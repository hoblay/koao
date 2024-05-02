import { IconUserCircle, IconUserFilled } from "@tabler/icons-react";
import Image from "next/image";
import React from "react";
import { tv } from "tailwind-variants";

const AvatarStyle = tv({
  base: "inline-flex items-center justify-center   font-semibold leading-none rounded-full  select-none cursor-pointer object-cover hover:opacity-95",
  variants: {
    color: {
      primary:
        "bg-[#ccdfd9] dark:bg-[#00261b]/30 text-[#00261b]  dark:text-[#1a6f56]",
      purple:
        "bg-purple-100 text-purple-800 dark:bg-purple-800/30 dark:text-purple-500",
      green:
        "bg-green-100 text-green-800 dark:bg-green-800/30 dark:text-green-500",
      blue: "bg-blue-100 text-blue-800 dark:bg-blue-800/30 dark:text-blue-500",
      orange:
        "bg-orange-100 text-orange-800 dark:bg-orange-800/30 dark:text-orange-500",
      emerald:
        "bg-emerald-100 text-emerald-800 dark:bg-emerald-800/30 dark:text-emerald-500",
      pink: "bg-pink-100 text-pink-800 dark:bg-pink-800/30 dark:text-pink-500",
      amber:
        "bg-amber-100 text-amber-800 dark:bg-amber-800/30 dark:text-amber-500",
    },
    size: {
      xs: "size-[24px] text-xs text-[9px]",
      sm: "size-[32px] text-sm",
      md: "size-[46px] text-sm",
      lg: "size-[52px] text-lg",
      xl: "size-[118px] text-3xl",
    },
    done: {
      true: " ",
    },
  },
  defaultVariants: {
    color: "primary",
    done: false,
    size: "md",
  },
});

interface AvatarProps {
  image?: string | null | undefined;
  color?: "purple" | "green" | "emerald" | "orange" | "pink" | "blue" | "amber";
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  name: string | null | undefined;
}

function Avatar({ image, color, size, name }: AvatarProps) {
  let firstName = " ";
  let lastName = " ";
  let initials = "sebago";
  if (name) {
    const userName = name.split(" ");
    firstName = userName[0];
    lastName = userName[userName.length - 1];
    initials = `${userName ? firstName[0] + "" + lastName[0] : "sebago"}`;
  }

  if (image !== null && image !== undefined) {
    return (
      <Image
        src={image}
        className={AvatarStyle({ size })}
        width={42}
        height={42}
        unoptimized
        alt="Avatar"
      />
    );
  }
  return (
    <span className={AvatarStyle({ color: color, size })}>
      {initials !== "sebago" ? (
        initials?.toUpperCase()
      ) : (
        <IconUserFilled
          className={"z-2 text-[#00261b] dark:text-white rounded-full w-6 h-6"}
        />
      )}
    </span>
  );
}

export default Avatar;
