/*
  Warnings:

  - The `status` column on the `Consultation` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "public"."ConsultStatus" AS ENUM ('NEW', 'TRIAGED', 'IN_PROGRESS', 'RESOLVED');

-- AlterTable
ALTER TABLE "public"."Consultation" DROP COLUMN "status",
ADD COLUMN     "status" "public"."ConsultStatus" NOT NULL DEFAULT 'NEW';
