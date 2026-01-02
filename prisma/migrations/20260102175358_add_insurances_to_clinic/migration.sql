-- AlterTable
ALTER TABLE "Clinic" ADD COLUMN     "insurances" TEXT[] DEFAULT ARRAY[]::TEXT[];
