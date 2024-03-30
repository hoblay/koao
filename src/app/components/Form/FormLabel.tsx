import { LabelHTMLAttributes } from "react";

export function FormLabel(props: LabelHTMLAttributes<HTMLLabelElement>) {
  return (
    <label 
      className="text-sm text-zinc-600 dark:text-zinc-300 flex items-center justify-between"
      {...props}
    />
  )
}