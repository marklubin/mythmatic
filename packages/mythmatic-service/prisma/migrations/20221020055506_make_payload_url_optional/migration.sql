-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_RenderTask" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "prompt" TEXT NOT NULL,
    "externalGenerator" TEXT NOT NULL DEFAULT 'REPLICATE',
    "externalGenerationId" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "payloadUrl" TEXT
);
INSERT INTO "new_RenderTask" ("createdAt", "externalGenerationId", "externalGenerator", "id", "payloadUrl", "prompt", "status") SELECT "createdAt", "externalGenerationId", "externalGenerator", "id", "payloadUrl", "prompt", "status" FROM "RenderTask";
DROP TABLE "RenderTask";
ALTER TABLE "new_RenderTask" RENAME TO "RenderTask";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
