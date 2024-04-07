/*
  Warnings:

  - You are about to drop the `MuxData` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "MuxData" DROP CONSTRAINT "MuxData_lessonId_fkey";

-- DropTable
DROP TABLE "MuxData";
