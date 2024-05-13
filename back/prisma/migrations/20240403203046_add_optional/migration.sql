-- DropForeignKey
ALTER TABLE `media` DROP FOREIGN KEY `Media_watchingId_fkey`;

-- AlterTable
ALTER TABLE `media` MODIFY `watchingId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `Media` ADD CONSTRAINT `Media_watchingId_fkey` FOREIGN KEY (`watchingId`) REFERENCES `Watching`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
