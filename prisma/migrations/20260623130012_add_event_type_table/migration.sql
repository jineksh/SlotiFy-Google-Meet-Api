-- CreateTable
CREATE TABLE "event_type" (
    "id" SERIAL NOT NULL,
    "hostId" INTEGER NOT NULL,
    "description" TEXT,
    "locationType" TEXT NOT NULL DEFAULT 'Online',
    "locationValue" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "duration" INTEGER NOT NULL,
    "bufferBeforeMinutes" INTEGER NOT NULL DEFAULT 0,
    "bufferAfterMinutes" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "event_type_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "event_type" ADD CONSTRAINT "event_type_hostId_fkey" FOREIGN KEY ("hostId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
