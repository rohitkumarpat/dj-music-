-- CreateEnum
CREATE TYPE "Streamtype" AS ENUM ('Spotify', 'Youtube');

-- CreateEnum
CREATE TYPE "Provider" AS ENUM ('Google');

-- CreateTable
CREATE TABLE "user" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "provider" "Provider" NOT NULL,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "stream" (
    "id" TEXT NOT NULL,
    "type" "Streamtype" NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "userid" TEXT NOT NULL,

    CONSTRAINT "stream_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "upvote" (
    "id" TEXT NOT NULL,
    "userid" TEXT NOT NULL,
    "streamid" TEXT NOT NULL,

    CONSTRAINT "upvote_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "upvote_userid_streamid_key" ON "upvote"("userid", "streamid");

-- AddForeignKey
ALTER TABLE "stream" ADD CONSTRAINT "stream_userid_fkey" FOREIGN KEY ("userid") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "upvote" ADD CONSTRAINT "upvote_userid_fkey" FOREIGN KEY ("userid") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "upvote" ADD CONSTRAINT "upvote_streamid_fkey" FOREIGN KEY ("streamid") REFERENCES "stream"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
