-- DropForeignKey
ALTER TABLE "upvote" DROP CONSTRAINT "upvote_streamid_fkey";

-- AddForeignKey
ALTER TABLE "upvote" ADD CONSTRAINT "upvote_streamid_fkey" FOREIGN KEY ("streamid") REFERENCES "stream"("id") ON DELETE CASCADE ON UPDATE CASCADE;
