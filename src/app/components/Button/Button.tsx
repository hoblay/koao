import React, { ButtonHTMLAttributes } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<'button'> {
  variant?: string
}

function Button() {
  return (
          <button className="px-6 py-2 w-full font-medium bg-[#015F43] text-white transition-all shadow-[3px_3px_0px_black] dark:shadow-[3px_3px_0px_zinc] hover:shadow-none hover:translate-x-[3px] hover:translate-y-[3px]">
            Hover me
          </button>
      );
    };
    

export default Button