"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode, useState } from "react";
import { trpc } from "./client";
import { httpBatchLink } from "@trpc/react-query";
import { getBaseUrl } from "@/utils/trpc";



export default function TrpcProvider({children}: {children: ReactNode}){
  const [queryClient] = useState(() => new QueryClient({}));
  const [trpcClient] = useState(() => trpc.createClient({
    links:[
      httpBatchLink({
        url: `${getBaseUrl()}/api/trpc`,
      }),
    ],
  }));

  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </trpc.Provider>
  )
}