/*
  Warnings:

  - Added the required column `position` to the `Chapter` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Chapter" ADD COLUMN     "position" INTEGER NOT NULL;
