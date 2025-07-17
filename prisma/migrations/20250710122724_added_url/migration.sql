/*
  Warnings:

  - Added the required column `extractedid` to the `stream` table without a default value. This is not possible if the table is not empty.
  - Added the required column `url` to the `stream` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "stream" ADD COLUMN     "extractedid" TEXT NOT NULL,
ADD COLUMN     "url" TEXT NOT NULL;
