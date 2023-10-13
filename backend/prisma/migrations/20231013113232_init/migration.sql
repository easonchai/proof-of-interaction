-- CreateTable
CREATE TABLE "Scan" (
    "e" TEXT NOT NULL,
    "c" TEXT NOT NULL,
    "geolocation" TEXT,
    "hash" TEXT NOT NULL,
    "tokenId" TEXT NOT NULL,
    "valid" BOOLEAN NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Scan_hash_key" ON "Scan"("hash");
