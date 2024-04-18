import { CreateChapterSchema, CreateCourseSchema } from "@/schemas";
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
          createdAt: "desc",
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
          author: true,
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
        return new NextResponse("Unauthorized", { status: 401 });
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
  deleteCourse: publicProcedure.input(idSchema).mutation(async ({ input }) => {
    const session = await getServerSession(authOptions);

    return await db.course.delete({
      where: {
        id: input,
        userId: session?.user.id,
      },
    });
  }),
});
