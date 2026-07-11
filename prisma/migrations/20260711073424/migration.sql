/*
  Warnings:

  - The primary key for the `slot` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - A unique constraint covering the columns `[eventTypeId,startTime,endTime]` on the table `slot` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "bookings" DROP CONSTRAINT "bookings_slotId_fkey";

-- AlterTable
ALTER TABLE "bookings" ALTER COLUMN "slotId" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "slot" DROP CONSTRAINT "slot_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "slot_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "slot_id_seq";

-- CreateIndex
CREATE INDEX "slot_userId_startTime_endTime_idx" ON "slot"("userId", "startTime", "endTime");

-- CreateIndex
CREATE UNIQUE INDEX "slot_eventTypeId_startTime_endTime_key" ON "slot"("eventTypeId", "startTime", "endTime");

-- AddForeignKey
ALTER TABLE "bookings" ADD CONSTRAINT "bookings_slotId_fkey" FOREIGN KEY ("slotId") REFERENCES "slot"("id") ON DELETE CASCADE ON UPDATE CASCADE;
