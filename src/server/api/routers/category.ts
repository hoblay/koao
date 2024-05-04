import { AddCategoryToCourseSchema, CreateCategorySchema } from "@/schemas";
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

      if (!session?.user) return null;

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
  addtoCourse: publicProcedure
    .input(AddCategoryToCourseSchema)
    .mutation(async ({ input }) => {
      try {
        const session = await getServerSession(authOptions);

        if (!session?.user) return null;

        const category = await db.course.update({
          where: { id: input.courseId },
          data: {
            categoryId: input.categoryId,
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
            category: true,
          },
        });

        return courses;
      } catch (error) {}
    }),
  getBySlug: publicProcedure.input(idSchema).query(async ({ input }) => {
    return await db.category.findUnique({
      where: {
        slug: input,
      },
      include: {
        courses: true,
      },
    });
  }),
  delete: publicProcedure.input(idSchema).mutation(async ({ input }) => {
    return await db.category.delete({
      where: {
        id: input,
      },
    });
  }),
});
