/*
  Warnings:

  - You are about to drop the `task` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "task";

-- CreateTable
CREATE TABLE "Tarefa" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "status" TEXT NOT NULL DEFAULT 'pendente',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Tarefa_pkey" PRIMARY KEY ("id")
);
