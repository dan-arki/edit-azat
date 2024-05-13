/*
  Warnings:

  - You are about to drop the column `watchingId` on the `media` table. All the data in the column will be lost.
  - Added the required column `mediaId` to the `Watching` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `media` DROP FOREIGN KEY `Media_watchingId_fkey`;

-- AlterTable
ALTER TABLE `media` DROP COLUMN `watchingId`;

-- AlterTable
ALTER TABLE `watching` ADD COLUMN `mediaId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `Watching` ADD CONSTRAINT `Watching_mediaId_fkey` FOREIGN KEY (`mediaId`) REFERENCES `Media`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
