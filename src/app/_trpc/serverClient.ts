import { appRouter } from "@/server/api/root";
import { httpBatchLink } from "@trpc/client";




export const serverClient = appRouter.createCaller({
  links: [
    httpBatchLink({
      url: `${process.env.NEXTAUTH_URL}/api/trpc`
    })
  ]
})