-- CreateEnum
CREATE TYPE "Category" AS ENUM ('EDUCATIONAL', 'MEDICAL', 'ALL');

-- CreateTable
CREATE TABLE "Session" (
    "id" TEXT NOT NULL,
    "sid" VARCHAR(255) NOT NULL,
    "data" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "admin" (
    "id" UUID NOT NULL,
    "fullname" TEXT NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "password" VARCHAR(255) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "isEmailverify" BOOLEAN NOT NULL DEFAULT false,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "donee" (
    "id" UUID NOT NULL,
    "fullname" TEXT NOT NULL,
    "email" VARCHAR(255),
    "mobileNumber" TEXT NOT NULL,
    "address" VARCHAR(1000),
    "content" TEXT NOT NULL,
    "amount" DECIMAL(65,30) NOT NULL,
    "category" "Category" DEFAULT E'ALL',
    "accountNumber" TEXT NOT NULL,
    "bank" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "imageFile" JSONB NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "donations" (
    "id" UUID NOT NULL,
    "reference" TEXT NOT NULL,
    "doneeId" UUID NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Session.sid_unique" ON "Session"("sid");

-- CreateIndex
CREATE UNIQUE INDEX "admin.email_unique" ON "admin"("email");

-- CreateIndex
CREATE UNIQUE INDEX "donee.email_unique" ON "donee"("email");

-- CreateIndex
CREATE UNIQUE INDEX "donee.mobileNumber_unique" ON "donee"("mobileNumber");

-- AddForeignKey
ALTER TABLE "donations" ADD FOREIGN KEY ("doneeId") REFERENCES "donee"("id") ON DELETE CASCADE ON UPDATE CASCADE;
