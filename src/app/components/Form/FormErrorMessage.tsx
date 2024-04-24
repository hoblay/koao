"use client";
import { IconAlertCircleFilled } from "@tabler/icons-react";
import { useFormContext } from "react-hook-form";

interface ErrorMessageProps {
  field: string;
}

function getFieldError(obj: Record<any, any>, path: string) {
  const travel = (regexp: RegExp) =>
    String.prototype.split
      .call(path, regexp)
      .filter(Boolean)
      .reduce(
        (res, key) => (res !== null && res !== undefined ? res[key] : res),
        obj,
      );

  const result = travel(/[,[\]]+?/) || travel(/[,[\].]+?/);

  return result;
}

export function FormErrorMessage({ field }: ErrorMessageProps) {
  const {
    formState: { errors },
  } = useFormContext();

  const fieldError = getFieldError(errors, field);

  if (!fieldError) {
    return null;
  }

  return (
    <span className="flex gap-1  text-xs text-red-500 mt-1 items-center ">
      <IconAlertCircleFilled className="size-4" />
      {fieldError.message?.toString()}
    </span>
  );
}
