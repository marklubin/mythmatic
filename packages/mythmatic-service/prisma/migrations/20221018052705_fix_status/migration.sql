/*
  Warnings:

  - You are about to drop the column `taskStatus` on the `RenderTask` table. All the data in the column will be lost.
  - Added the required column `status` to the `RenderTask` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_RenderTask" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "prompt" TEXT NOT NULL,
    "externalGenerator" TEXT NOT NULL DEFAULT 'REPLICATE',
    "externalGenerationId" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "payloadUrl" TEXT NOT NULL
);
INSERT INTO "new_RenderTask" ("createdAt", "externalGenerationId", "externalGenerator", "id", "payloadUrl", "prompt") SELECT "createdAt", "externalGenerationId", "externalGenerator", "id", "payloadUrl", "prompt" FROM "RenderTask";
DROP TABLE "RenderTask";
ALTER TABLE "new_RenderTask" RENAME TO "RenderTask";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
