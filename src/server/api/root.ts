import { categoryRouter } from "./routers/category";
import { chapterRouter } from "./routers/chapter";
import { courseRouter } from "./routers/course";
import { lessonRouter } from "./routers/lesson";
import { userRouter } from "./routers/user";
import { publicProcedure, router } from "./trpc";

export const appRouter = router({
  user: userRouter,
  course: courseRouter,
  chapter: chapterRouter,
  lesson: lessonRouter,
  category: categoryRouter,
});

export type AppRouter = typeof appRouter;
