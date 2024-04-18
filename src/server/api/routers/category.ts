import {
  CreateCategorySchema,
  CreateChapterSchema,
  CreateCourseSchema,
  SignUpSchema,
  TSignUpSchema,
} from "@/schemas";
import { publicProcedure, router } from "@/server/api/trpc";
import { authOptions } from "@/server/auth";
import { db } from "@/server/db";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { z } from "zod";

const idSchema = z.string();

export const categoryRouter = router({
  create: publicProcedure.input(CreateCategorySchema).mutation(async (opts) => {
    try {
      const { input } = opts;

      const { categoryName, slug } = input;

      const session = await getServerSession(authOptions);

      if (!session?.user)
        return new NextResponse("Unauthorized", { status: 401 });

      const category = await db.category.create({
        data: {
          name: categoryName,
          slug: slug,
        },
      });
      console.log("category: ", category);
      return category;
    } catch (error) {
      return NextResponse.json(
        { message: "Algo de errado não está certo", error },
        { status: 500 },
      );
    }
  }),
  getAll: publicProcedure.query(async ({ input }) => {
    try {
      const categories = await db.category.findMany({
        include: {
          courses: true,
        },
      });

      return categories;
    } catch (error) {}
  }),
  getCoursesByCategory: publicProcedure
    .input(idSchema)
    .query(async ({ input }) => {
      try {
        const courses = await db.course.findMany({
          where: {
            categoryId: input,
          },
          include: {
            chapters: true,
          },
        });

        return courses;
      } catch (error) {}
    }),
  getBySlug: publicProcedure.input(idSchema).query(async ({ input }) => {
    const session = await getServerSession(authOptions);
    return await db.category.findUnique({
      where: {
        slug: input,
      },
      include: {
        courses: true,
      },
    });
  }),
});
