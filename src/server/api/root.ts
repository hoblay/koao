import { chapterRouter } from "./routers/chapter";
import { courseRouter } from "./routers/course";
import { userRouter } from "./routers/user";
import { publicProcedure, router } from "./trpc";




export const appRouter = router({
  user: userRouter,
  course: courseRouter,
  chapter: chapterRouter
})


export type AppRouter = typeof appRouter;


