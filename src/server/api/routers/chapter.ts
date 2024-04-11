import { CreateChapterSchema, CreateCourseSchema, SignUpSchema, TSignUpSchema } from "@/schemas"
import { publicProcedure, router } from "@/server/api/trpc"
import { authOptions } from "@/server/auth";
import { db } from "@/server/db";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { z } from "zod";

const idSchema =  z.string() 

export const chapterRouter = router({


  create: publicProcedure
    .input(CreateChapterSchema)
    .mutation(async (opts) => { 
      try {
        const { input } = opts;
        
        const {title, courseId, description} = input
        
        const session = await getServerSession(authOptions)
        
        if(!session) return new NextResponse("Unauthorized", { status: 401 });
        
    
        const courseOwner = await db.course.findUnique({
          where: {
            id: courseId,
            userId: session.user.id,
          }
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
            description
          }
        });
        console.log(chapter)
        return chapter
      } catch (error) {
        
        return NextResponse.json({message: 'Algo de errado não está certo', error}, { status: 500 })
      }
    }),
  getAllbyCourse:  publicProcedure.input(idSchema).query(async ({input}) => {
    try {
   
    
    
     const chapter = await db.chapter.findMany({
      orderBy: {
        position: 'desc'
      },
      where: {
        courseId: input
      },
      include:{
        lessons: true
      }

    }) 

    return chapter
    } catch (error) {
      
    } 
  }),
  getById: publicProcedure.input(idSchema).query(async ({input}) => {
    const session = await getServerSession(authOptions)
   return await db.chapter.findUnique({
      where: {
        id: input,
      },
      include: {
        course:{
          include:{
            author: {
              select:{
                name: true,
                id: true,
                email: true,
                image: true
              }
            },
          }
        },
        lessons: {
          orderBy: {
            position: 'asc'
          },
          include:{
            video: true
          }
        }
        },
      },
    )
  }),
  

  

});