"use server";

import { PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

import crypto from "crypto";
import { getServerSession } from "next-auth";
import { authOptions } from "@/server/auth";
import { r2 } from "@/lib/cloudfare-r2";
import { db } from "@/server/db";

const allowedFileTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

const maxFileSize = 1048576 * 10; // 1 MB

const generateFileName = (bytes = 32) =>
  crypto.randomBytes(bytes).toString("hex");

type SignedURLResponse = Promise<
  | { failure?: undefined; success: { url: string; id: number } }
  | { failure: string; success?: undefined }
>;

type GetSignedURLParams = {
  fileType: string;
  fileSize: number;
  checksum: string;
  courseId: string;
  cover?: boolean;
};
export const getSignedURL = async ({
  fileType,
  fileSize,
  checksum,
  courseId,
  cover,
}: GetSignedURLParams) => {
  const session = await getServerSession(authOptions);

  if (!session) {
    return { failure: "not authenticated" };
  }

  if (!allowedFileTypes.includes(fileType)) {
    return { failure: "File type not allowed" };
  }

  if (fileSize > maxFileSize) {
    return { failure: "File size too large" };
  }

  const fileName = generateFileName();

  const putObjectCommand = new PutObjectCommand({
    Bucket: process.env.R2_BUCKET_NAME,
    Key: cover ? `${courseId}cover` : courseId,
    ContentType: fileType,
    ContentLength: fileSize,
    ChecksumSHA256: checksum,
    Metadata: {
      userId: session.user.id,
      courseId: courseId,
    },
  });

  const signedUrl = await getSignedUrl(r2, putObjectCommand, {
    expiresIn: 6000,
  });

  console.log({ success: signedUrl });
  if (cover) {
    const course = await db.course.update({
      where: {
        id: courseId,
        userId: session.user.id,
      },
      data: {
        cover: `${process.env.R2_DEV_URL}/${courseId}cover`,
      },
    });
    return { success: { url: signedUrl } };
  }
  const course = await db.course.update({
    where: {
      id: courseId,
      userId: session.user.id,
    },
    data: {
      imageUrl: `${process.env.R2_DEV_URL}/${courseId}`,
    },
  });

  return { success: { url: signedUrl } };
};
