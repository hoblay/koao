"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "@/server/auth";
import { r2 } from "@/lib/cloudfare-r2";
import { db } from "@/server/db";

import { DeleteObjectCommand } from "@aws-sdk/client-s3";

export async function deleteLesson(lessonId: string) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return { failure: "not authenticated" };
    }
    const lesson = await db.lesson.findUnique({
      where: {
        id: lessonId,
      },
      include: {
        chapter: {
          select: {
            courseId: true,
            id: true,
          },
        },
      },
    });

    const deletedMedia = await db.lesson.delete({
      where: {
        id: lessonId,
      },
    });

    if (deletedMedia) {
      const key = `${lesson?.chapter.courseId}${lesson?.chapterId}${lessonId}`;
      const deleteParams = {
        Bucket: process.env.R2_BUCKET_NAME,
        Key: key,
      };

      await r2.send(new DeleteObjectCommand(deleteParams));
    }
  } catch (e) {
    console.error(e);
  }
}
