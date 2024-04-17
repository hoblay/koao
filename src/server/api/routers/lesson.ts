import { CreateChapterSchema, UpdateDurationSchema } from "@/schemas";
import { publicProcedure, router } from "@/server/api/trpc";
import { authOptions } from "@/server/auth";
import { db } from "@/server/db";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { run } from "node:test";
import { z } from "zod";

const idSchema = z.string();

export const lessonRouter = router({
  create: publicProcedure.input(CreateChapterSchema).mutation(async (opts) => {
    try {
      const { input } = opts;

      const { title, courseId, description } = input;

      const session = await getServerSession(authOptions);

      if (!session) return new NextResponse("Unauthorized", { status: 401 });

      const courseOwner = await db.course.findUnique({
        where: {
          id: courseId,
          userId: session.user.id,
        },
      });

      if (!courseOwner) {
        return new NextResponse("Unauthorized", { status: 401 });
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
      console.log(chapter);
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
    return await db.lesson.findUnique({
      where: {
        id: input,
      },
      include: {
        chapter: {
          include: {
            course: {
              include: {
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
      },
    });
  }),
  updateVideoDuration: publicProcedure
    .input(UpdateDurationSchema)
    .mutation(async ({ input }) => {
      const session = await getServerSession(authOptions);
      if (!session?.user) {
        return new NextResponse("Unauthorized", { status: 401 });
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
  deleteById: publicProcedure.input(idSchema).mutation(async ({ input }) => {
    const session = await getServerSession(authOptions);
    if (!session) return null;
    return await db.lesson.delete({
      where: {
        id: input,
      },
    });
  }),
});
