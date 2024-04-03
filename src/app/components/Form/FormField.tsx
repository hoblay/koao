import { HTMLAttributes } from "react";

interface FieldProps extends HTMLAttributes<HTMLDivElement> {}

export function FormField(props: FieldProps) {
  return (
    <div className="relative flex flex-col gap-2" {...props} />
  )
}