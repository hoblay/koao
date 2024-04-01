"use client";
import React, { ReactNode } from 'react'
import { FormProvider, useFormContext } from 'react-hook-form'





export function FormRoot(props?: any, onSubmit?: () => void, children?: ReactNode | ReactNode[]) {
  const { handleSubmit } = useFormContext()
  return (
    <FormProvider {...props}>
      <form 
          onSubmit={onSubmit}
          className="flex flex-col gap-4 w-full max-w-xs"
        >
          {children}
      </form>
    </FormProvider>
  )
}

 