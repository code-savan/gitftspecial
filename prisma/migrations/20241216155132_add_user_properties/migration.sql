-- AlterTable
ALTER TABLE "User" ADD COLUMN     "batteryLevel" INTEGER NOT NULL DEFAULT 100,
ADD COLUMN     "chancesLeft" INTEGER NOT NULL DEFAULT 3,
ADD COLUMN     "points" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "referrerId" TEXT,
ADD COLUMN     "refs" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "wallet" DOUBLE PRECISION NOT NULL DEFAULT 0.0,
ADD COLUMN     "xoWins" INTEGER NOT NULL DEFAULT 0;

-- CreateTable
CREATE TABLE "Referral" (
    "id" TEXT NOT NULL,
    "referredById" TEXT NOT NULL,
    "referredUserId" TEXT NOT NULL,
    "referredUserName" TEXT NOT NULL,
    "referredUserImage" TEXT,
    "referredUserRefs" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "Referral_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Referral" ADD CONSTRAINT "Referral_referredById_fkey" FOREIGN KEY ("referredById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Referral" ADD CONSTRAINT "Referral_referredUserId_fkey" FOREIGN KEY ("referredUserId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
