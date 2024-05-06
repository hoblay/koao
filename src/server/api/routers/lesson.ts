import {
  CompleteLessonSchema,
  CreateChapterSchema,
  UpdateDurationSchema,
  UpdateLessonTitleSchema,
} from "@/schemas";
import { publicProcedure, router } from "@/server/api/trpc";
import { authOptions } from "@/server/auth";
import { db } from "@/server/db";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { run } from "node:test";
import { addIssueToContext, z } from "zod";

const idSchema = z.string();

export const lessonRouter = router({
  create: publicProcedure.input(CreateChapterSchema).mutation(async (opts) => {
    try {
      const { input } = opts;

      const { title, courseId, description } = input;

      const session = await getServerSession(authOptions);

      if (!session) return null;
      const courseOwner = await db.course.findUnique({
        where: {
          id: courseId,
          userId: session.user.id,
        },
      });

      if (!courseOwner) {
        return null;
      }

      const lastChapter = await db.chapter.findFirst({
        where: {
          courseId: courseId,
        },
        orderBy: {
          position: "desc",
        },
      });

      const newPosition = lastChapter ? lastChapter.position + 1 : 1;

      const chapter = await db.chapter.create({
        data: {
          title,
          courseId,
          position: newPosition,
          description,
        },
      });
      return chapter;
    } catch (error) {
      return NextResponse.json(
        { message: "Algo de errado não está certo", error },
        { status: 500 },
      );
    }
  }),
  getAllbyChapter: publicProcedure.input(idSchema).query(async ({ input }) => {
    try {
      const lessons = await db.lesson.findMany({
        orderBy: {
          position: "desc",
        },
        where: {
          chapterId: input,
        },
      });

      return lessons;
    } catch (error) {}
  }),
  getById: publicProcedure.input(idSchema).query(async ({ input }) => {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return null;
    }
    return await db.lesson.findUnique({
      where: {
        id: input,
      },
      include: {
        chapter: {
          include: {
            course: {
              include: {
                author: true,
                chapters: {
                  include: {
                    lessons: true,
                  },
                },
              },
            },
          },
        },
        video: true,
        userProgress: {
          where: {
            userId: session.user.id,
            lessonId: input,
          },
          select: {
            isCompleted: true,
            lessonId: true,
            userId: true,
          },
        },
      },
    });
  }),
  updateVideoDuration: publicProcedure
    .input(UpdateDurationSchema)
    .mutation(async ({ input }) => {
      const session = await getServerSession(authOptions);
      if (!session?.user) {
        return null;
      }

      const video = await db.video.update({
        where: {
          id: input.videoId,
        },
        data: {
          duration: input.duration,
        },
      });

      return video;
    }),
  updateLessonTitle: publicProcedure
    .input(UpdateLessonTitleSchema)
    .mutation(async ({ input }) => {
      const session = await getServerSession(authOptions);
      if (!session?.user) {
        return null;
      }

      const lesson = await db.lesson.update({
        where: {
          id: input.lessonId,
        },
        data: {
          title: input.title,
        },
      });

      return lesson;
    }),
  deleteById: publicProcedure.input(idSchema).mutation(async ({ input }) => {
    const session = await getServerSession(authOptions);
    if (!session) return null;
    return await db.lesson.delete({
      where: {
        id: input,
      },
    });
  }),
  enroll: publicProcedure.input(idSchema).mutation(async ({ input }) => {
    const session = await getServerSession(authOptions);
    if (!session?.user) return null;
    const progressExists = await db.userProgress.findFirst({
      where: {
        lessonId: input,
        userId: session.user.id,
      },
    });
    if (progressExists) {
      return progressExists;
    }
    const progress = await db.userProgress.create({
      data: {
        userId: session.user.id,
        lessonId: input,
      },
    });
    return progress;
  }),

  complete: publicProcedure
    .input(CompleteLessonSchema)
    .mutation(async ({ input }) => {
      const session = await getServerSession(authOptions);
      if (!session?.user) return null;

      const completedProgress = await db.userProgress.upsert({
        where: {
          userId_lessonId: {
            lessonId: input.lessonId,
            userId: session.user.id,
          },
        },
        update: {
          isCompleted: input.isCompleted,
        },
        create: {
          lessonId: input.lessonId,
          userId: session.user.id,
          isCompleted: input.isCompleted,
        },
      });
      return completedProgress;
    }),
  getLastWatch: publicProcedure.query(async () => {
    try {
      const session = await getServerSession(authOptions);
      if (!session?.user) return null;
      const lessons = await db.lesson.findMany({
        orderBy: {
          updatedAt: "desc",
        },
        where: {
          userProgress: {
            some: {
              userId: session.user.id,
              isCompleted: false,
            },
          },
        },
        include: {
          chapter: {
            select: {
              course: {
                select: {
                  imageUrl: true,
                  title: true,
                  id: true,
                },
              },
            },
          },
        },
      });

      return lessons;
    } catch (error) {}
  }),
  getLastWatchByCourse: publicProcedure
    .input(idSchema)
    .query(async ({ input }) => {
      try {
        const session = await getServerSession(authOptions);
        if (!session?.user) return null;
        const lessons = await db.lesson.findFirst({
          where: {
            userProgress: {
              some: {
                userId: session.user.id,
                isCompleted: false,
              },
            },
            chapter: {
              courseId: input,
            },
          },
          include: {
            chapter: {
              select: {
                course: {
                  select: {
                    imageUrl: true,
                    title: true,
                    id: true,
                  },
                },
              },
            },
          },
        });

        return lessons;
      } catch (error) {}
    }),
  checkDone: publicProcedure.input(idSchema).query(async ({ input }) => {
    try {
      const session = await getServerSession(authOptions);
      if (!session?.user) return null;
      const lesson = await db.lesson.findFirst({
        where: {
          userProgress: {
            some: {
              userId: session.user.id,
              lessonId: input,
              isCompleted: true,
            },
          },
        },
      });

      return !!lesson;
    } catch (error) {}
  }),
  checkIfProgress: publicProcedure.input(idSchema).query(async ({ input }) => {
    try {
      const session = await getServerSession(authOptions);
      if (!session?.user) return null;
      const lesson = await db.lesson.findFirst({
        where: {
          userProgress: {
            some: {
              userId: session.user.id,
              lessonId: input,
            },
          },
        },
      });

      return !!lesson;
    } catch (error) {}
  }),
});
