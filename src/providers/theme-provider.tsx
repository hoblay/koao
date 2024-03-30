'use client';

import { ThemeProvider as TP } from "next-themes";

export const ThemeProvider = ({children}:{children: React.ReactNode}) => {
  return (
    <TP attribute="class" defaultTheme="system" enableSystem >
      {children}
    </TP>
  );
  
}