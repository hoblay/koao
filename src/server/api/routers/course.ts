import {
  CreateChapterSchema,
  CreateCourseSchema,
  VisibilitySchema,
} from "@/schemas";
import { publicProcedure, router } from "@/server/api/trpc";
import { authOptions } from "@/server/auth";
import { db } from "@/server/db";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { z } from "zod";

const idSchema = z.string();

export const courseRouter = router({
  create: publicProcedure.input(CreateCourseSchema).mutation(async (opts) => {
    try {
      const { input } = opts;

      const { title } = input;

      const session = await getServerSession(authOptions);

      if (!session)
        return NextResponse.json(
          {
            course: null,
            message: "Tens que estar logado pra poder criar um curso",
          },
          { status: 401 },
        );

      const newCourse = await db.course.create({
        data: {
          title,
          userId: session.user.id,
        },
      });

      return NextResponse.json(
        { course: newCourse, message: "Curso criado com sucesso." },
        { status: 201 },
      );
    } catch (error) {
      return NextResponse.json(
        { message: "Algo de errado não está certo", error },
        { status: 500 },
      );
    }
  }),
  getAllbyUser: publicProcedure.query(async () => {
    try {
      const session = await getServerSession(authOptions);

      const courses = await db.course.findMany({
        orderBy: {
          updatedAt: "desc",
        },
        where: {
          userId: session?.user.id,
        },
        include: {
          category: true,
          author: {
            select: {
              name: true,
              id: true,
              email: true,
              image: true,
            },
          },
          chapters: {
            include: {
              lessons: true,
            },
          },
        },
      });

      return courses;
    } catch (error) {}
  }),
  getAll: publicProcedure.query(async () => {
    try {
      const courses = await db.course.findMany({
        orderBy: {
          createdAt: "desc",
        },
        include: {
          category: true,
          author: {
            select: {
              name: true,
              id: true,
              email: true,
              image: true,
            },
          },
          chapters: {
            include: {
              lessons: true,
            },
          },
        },
      });

      return courses;
    } catch (error) {}
  }),
  getById: publicProcedure.input(idSchema).query(async ({ input }) => {
    const session = await getServerSession(authOptions);
    const course = await db.course.findUnique({
      where: {
        id: input,
      },
      include: {
        category: true,
        author: {
          select: {
            name: true,
            id: true,
            email: true,
            image: true,
          },
        },
        chapters: {
          include: {
            lessons: {
              include: {
                video: {
                  select: {
                    duration: true,
                  },
                },
              },
            },
          },
        },
      },
    });
    return course;
  }),

  getBySearch: publicProcedure.input(idSchema).query(async ({ input }) => {
    const course = await db.course.findMany({
      where: {
        OR: [
          {
            title: {
              search: input.split(" ").join(" | "),
              mode: "insensitive",
            },
          },
          {
            description: {
              search: input.split(" ").join(" | "),
              mode: "insensitive",
            },
          },
          {
            category: {
              name: {
                search: input.split(" ").join(" | "),
                mode: "insensitive",
              },
            },
          },
          {
            author: {
              name: {
                search: input.split(" ").join(" | "),
                mode: "insensitive",
              },
            },
          },
        ],
      },
      orderBy: {
        _relevance: {
          fields: ["title", "description"],
          search: input.trim().replace(/\s\s+/g, " ").split(" ").join(" | "),
          sort: "desc",
        },
      },
      include: {
        category: true,
        author: {
          select: {
            name: true,
            id: true,
            email: true,
            image: true,
          },
        },
        chapters: {
          include: {
            lessons: true,
          },
        },
      },
    });

    return course;
  }),
  updateCourse: publicProcedure
    .input(CreateChapterSchema)
    .mutation(async ({ input }) => {
      const session = await getServerSession(authOptions);
      if (!session?.user) {
        return null;
      }

      const course = await db.course.update({
        where: {
          id: input.courseId,
          userId: session.user.id,
        },
        data: {
          description: input.description,
          title: input.title,
        },
      });

      return course;
    }),
  changeVisibility: publicProcedure
    .input(VisibilitySchema)
    .mutation(async ({ input }) => {
      const session = await getServerSession(authOptions);
      if (!session?.user) {
        return null;
      }

      const course = await db.course.update({
        where: {
          id: input.id,
          userId: session.user.id,
        },
        data: {
          isPublished: input.isPublished,
        },
      });

      return course;
    }),
  deleteCourse: publicProcedure.input(idSchema).mutation(async ({ input }) => {
    const session = await getServerSession(authOptions);

    return await db.course.delete({
      where: {
        id: input,
        userId: session?.user.id,
      },
    });
  }),

  getLastWatch: publicProcedure.query(async () => {
    try {
      const session = await getServerSession(authOptions);
      if (!session?.user) return null;
      const courses = await db.course.findMany({
        where: {
          chapters: {
            some: {
              lessons: {
                some: {
                  userProgress: {
                    some: {
                      userId: session.user.id,
                      isCompleted: false,
                    },
                  },
                },
              },
            },
          },
        },
        include: {
          chapters: true,
        },
      });
      return courses;
    } catch (error) {}
  }),
  getProgress: publicProcedure.input(idSchema).query(async ({ input }) => {
    try {
      const session = await getServerSession(authOptions);
      if (!session?.user) {
        return null;
      }
      const publishedLessons = await db.lesson.findMany({
        where: {
          chapter: {
            course: {
              id: input,
            },
          },
        },
        select: {
          id: true,
        },
      });

      const durationLessons = await db.lesson.findMany({
        where: {
          chapter: {
            course: {
              id: input,
            },
          },
        },
        select: {
          video: {
            select: {
              duration: true,
            },
          },
        },
      });
      let duration = 0;
      durationLessons.map((lesson) => {
        duration = duration + (lesson.video?.duration || 0);
      });

      // create an array of chapter ids
      const publishedLessonIds = publishedLessons.map((lesson) => lesson.id);

      const validCompletedLessons = await db.userProgress.count({
        where: {
          userId: session.user.id,
          lessonId: {
            in: publishedLessonIds,
          },
          isCompleted: true,
        },
      });

      //calucate progress percentage:
      // completed chapters / total published chapters
      const progressPercentage =
        (validCompletedLessons / publishedLessons.length) * 100;
      const pp = {
        progress: progressPercentage || 0,
        nlessons: publishedLessons.length || 0,
        duration: duration || 0,
      };
      return pp;
    } catch (error) {}
  }),
});
