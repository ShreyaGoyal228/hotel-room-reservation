-- CreateTable
CREATE TABLE "Rooms" (
    "id" TEXT NOT NULL,
    "room_number" INTEGER NOT NULL,
    "floor" INTEGER NOT NULL,
    "is_available" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "Rooms_pkey" PRIMARY KEY ("id")
);
