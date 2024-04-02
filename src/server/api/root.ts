import { userRouter } from "./routers/user";
import { publicProcedure, router } from "./trpc";




export const appRouter = router({
  user: userRouter
})


export type AppRouter = typeof appRouter;


