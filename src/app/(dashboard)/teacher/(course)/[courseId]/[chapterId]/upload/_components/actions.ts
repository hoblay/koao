"use server"




import { PutObjectCommand } from "@aws-sdk/client-s3"
import { getSignedUrl } from "@aws-sdk/s3-request-presigner"



import crypto from "crypto"
import { getServerSession } from "next-auth"
import { authOptions } from "@/server/auth"
import { r2 } from "@/lib/cloudfare-r2"
import { db } from "@/server/db"





const allowedFileTypes = [
 "video/webm", "video/mp4", "video/ogg", "video/mov", "video/avi", "video/mpeg"
]

const maxFileSize = 1048576 * 100000 // 1 MB

const generateFileName = (bytes = 32) => crypto.randomBytes(bytes).toString("hex")

type SignedURLResponse = Promise<
  | { failure?: undefined; success: { url: string; id: number } }
  | { failure: string; success?: undefined }
>

type GetSignedURLParams = {
  fileType: string
  fileSize: number
  checksum: string,
  courseId: string,
  chapterId: string,
  title: string,
  duration: number,
}
export const getSignedURL = async ({
  fileType,
  fileSize,
  checksum,
  courseId,
  chapterId,
  title,
  duration
}: GetSignedURLParams) => {
  const session = await getServerSession(authOptions)

  if (!session) {
    return { failure: "not authenticated" }
  }

  if (!allowedFileTypes.includes(fileType)) {
    return { failure: "File type not allowed" }
  }

  if (fileSize > maxFileSize) {
    return { failure: "File size too large" }
  }

  const fileName = generateFileName()
  const lastChapter = await db.lesson.findFirst({
    where: {
      chapterId: chapterId,
    },
    orderBy: {
      position: "desc",
    },
  });

  const newPosition = lastChapter ? lastChapter.position + 1 : 1;
  const lesson = await db.lesson.create({
    data:{
      chapterId,
      position: newPosition,
      title
    }
  })

  const putObjectCommand = new PutObjectCommand({
    Bucket: process.env.R2_BUCKET_NAME,
    Key: `${courseId}${chapterId}${lesson.id}`,
    ContentType: fileType,
    ContentLength: fileSize,
    ChecksumSHA256: checksum,
    
  })

  const signedUrl = await getSignedUrl(
    r2,
    putObjectCommand, 
    { expiresIn: 6000 }
  )

  console.log({ success: signedUrl })


 
  const video = await db.video.create({
    data:{
      lessonId: lesson.id,
      duration,
      sizeInBytes: fileSize,
      commitUrl:`${process.env.R2_DEV_URL}/${courseId}${chapterId}${lesson.id}` 
    }
  })
  return { success: { url: signedUrl,  } }
}