-- CreateTable
CREATE TABLE "RenderTask" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "prompt" TEXT NOT NULL,
    "externalGenerator" TEXT NOT NULL DEFAULT 'REPLICATE',
    "externalGenerationId" TEXT NOT NULL,
    "taskStatus" TEXT NOT NULL,
    "payloadUrl" TEXT NOT NULL
);
