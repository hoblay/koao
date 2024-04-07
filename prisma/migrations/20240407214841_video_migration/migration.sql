/*
  Warnings:

  - You are about to drop the column `videoUrl` on the `Lesson` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Lesson" DROP COLUMN "videoUrl";

-- CreateTable
CREATE TABLE "Video" (
    "id" TEXT NOT NULL,
    "uploadBatchId" TEXT,
    "duration" INTEGER NOT NULL,
    "sizeInBytes" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "storageKey" TEXT,
    "audioStorageKey" TEXT,
    "subtitlesStorageKey" TEXT,
    "description" TEXT,
    "externalProviderId" TEXT,
    "processedAt" TIMESTAMP(3),
    "commitUrl" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "lessonId" TEXT NOT NULL,

    CONSTRAINT "Video_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Transcription" (
    "id" TEXT NOT NULL,
    "videoId" TEXT NOT NULL,
    "reviewedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Transcription_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TranscriptionSegment" (
    "id" TEXT NOT NULL,
    "transcriptionId" TEXT NOT NULL,
    "start" DECIMAL(10,2) NOT NULL,
    "end" DECIMAL(10,2) NOT NULL,
    "text" TEXT NOT NULL,

    CONSTRAINT "TranscriptionSegment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UploadBatch" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UploadBatch_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Video_externalProviderId_key" ON "Video"("externalProviderId");

-- CreateIndex
CREATE INDEX "Video_lessonId_idx" ON "Video"("lessonId");

-- CreateIndex
CREATE UNIQUE INDEX "Transcription_videoId_key" ON "Transcription"("videoId");

-- AddForeignKey
ALTER TABLE "Video" ADD CONSTRAINT "Video_lessonId_fkey" FOREIGN KEY ("lessonId") REFERENCES "Lesson"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Video" ADD CONSTRAINT "Video_uploadBatchId_fkey" FOREIGN KEY ("uploadBatchId") REFERENCES "UploadBatch"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transcription" ADD CONSTRAINT "Transcription_videoId_fkey" FOREIGN KEY ("videoId") REFERENCES "Video"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TranscriptionSegment" ADD CONSTRAINT "TranscriptionSegment_transcriptionId_fkey" FOREIGN KEY ("transcriptionId") REFERENCES "Transcription"("id") ON DELETE CASCADE ON UPDATE CASCADE;
