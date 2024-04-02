import { appRouter } from "@/server/api/root";
import { httpBatchLink } from "@trpc/client";




export const serverClient = appRouter.createCaller({
  links: [
    httpBatchLink({
      url: "http://localhost:3000/api/trpc"
    })
  ]
})