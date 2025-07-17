-- AlterTable
ALTER TABLE "stream" ADD COLUMN     "bigimage" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "smallimage" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "title" TEXT NOT NULL DEFAULT '';
