import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/styles/globals.css";
import { ThemeProvider } from "@/providers/theme-provider";
import SessionProvider from "@/providers/session-provider";
import TrpcProvider from "./_trpc/trpcProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Koao",
  description: "Koao",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full" suppressHydrationWarning={true}>
      <body className={`${inter.className} dark:bg-[#101012] h-full w-full`}>
        <TrpcProvider>
          <SessionProvider>
            <ThemeProvider>{children}</ThemeProvider>
          </SessionProvider>
        </TrpcProvider>
      </body>
    </html>
  );
}
