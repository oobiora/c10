/*
  Warnings:

  - You are about to drop the `PostResponse` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "PostResponse";

-- CreateTable
CREATE TABLE "postResponse" (
    "id" TEXT NOT NULL,
    "postId" TEXT NOT NULL,
    "optionChosen" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "postResponse_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "postResponse_postId_idx" ON "postResponse"("postId");

-- CreateIndex
CREATE INDEX "postResponse_createdAt_idx" ON "postResponse"("createdAt");
