"use client";
import { useFormContext } from 'react-hook-form'

interface ErrorMessageProps {
  field: string
}

function getFieldError(obj: Record<any, any>, path: string) {
  const travel = (regexp: RegExp) =>
    String.prototype.split
      .call(path, regexp)
      .filter(Boolean)
      .reduce((res, key) => (res !== null && res !== undefined ? res[key] : res), obj);

  const result = travel(/[,[\]]+?/) || travel(/[,[\].]+?/);
  
  return result
};

export function FormErrorMessage({ field }: ErrorMessageProps) {
  const { formState: { errors } } = useFormContext()

  const fieldError = getFieldError(errors, field)
    
  if (!fieldError) {
    return null
  }

  return (
    <span className="absolute -bottom-5  text-xs text-red-500 mt-1">{fieldError.message?.toString()}</span>
  
  )
}