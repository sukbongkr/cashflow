-- CreateTable
CREATE TABLE "Asset" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "income" INTEGER NOT NULL,
    "outcome" INTEGER NOT NULL,
    "price" INTEGER NOT NULL,
    "dept" INTEGER NOT NULL
);
