import { appRouter } from "@/server/api/root";
import { getBaseUrl } from "@/utils/trpc";
import { httpBatchLink } from "@trpc/client";




export const serverClient = appRouter.createCaller({
  links: [
    httpBatchLink({
      url: `https://koao.vercel.app/api/trpc`
    })
  ]
})
 
