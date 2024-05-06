import { ReactNode } from "react";

interface TooltipProps {
  message: string;
  children: ReactNode;
  active: boolean;
}

export default function Tooltip({ message, children, active }: TooltipProps) {
  return (
    <div className="group relative flex justify-center items-center">
      {children}
      {active && (
        <span className="invisible left-full ml-2 text-xs z-50 group-hover:visible opacity-0 group-hover:opacity-100 transition bg-[#2d2d2d] border border-[#1f1f1f]/10 dark:border-[#363636] text-zinc-50 p-2 rounded-md absolute whitespace-nowrap">
          {message}
        </span>
      )}
    </div>
  );
}
