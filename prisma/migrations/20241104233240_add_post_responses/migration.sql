-- CreateTable
CREATE TABLE "PostResponse" (
    "id" TEXT NOT NULL,
    "postId" TEXT NOT NULL,
    "optionChosen" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PostResponse_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "PostResponse_postId_idx" ON "PostResponse"("postId");

-- CreateIndex
CREATE INDEX "PostResponse_createdAt_idx" ON "PostResponse"("createdAt");
