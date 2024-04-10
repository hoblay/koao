-- DropForeignKey
ALTER TABLE "Video" DROP CONSTRAINT "Video_lessonId_fkey";

-- AddForeignKey
ALTER TABLE "Video" ADD CONSTRAINT "Video_lessonId_fkey" FOREIGN KEY ("lessonId") REFERENCES "Lesson"("id") ON DELETE CASCADE ON UPDATE CASCADE;
