/*
  Warnings:

  - You are about to drop the column `MediaId` on the `categorie` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `categorie` DROP FOREIGN KEY `Categorie_MediaId_fkey`;

-- AlterTable
ALTER TABLE `categorie` DROP COLUMN `MediaId`;

-- CreateTable
CREATE TABLE `Categorie_Movie` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `categorieId` INTEGER NOT NULL,
    `mediaId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Categorie_Movie` ADD CONSTRAINT `Categorie_Movie_categorieId_fkey` FOREIGN KEY (`categorieId`) REFERENCES `Categorie`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Categorie_Movie` ADD CONSTRAINT `Categorie_Movie_mediaId_fkey` FOREIGN KEY (`mediaId`) REFERENCES `Media`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
