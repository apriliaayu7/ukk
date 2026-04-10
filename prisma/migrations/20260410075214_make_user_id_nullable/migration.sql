-- DropForeignKey
ALTER TABLE `participant` DROP FOREIGN KEY `Participant_userId_fkey`;

-- AlterTable
ALTER TABLE `participant` MODIFY `userId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `Participant` ADD CONSTRAINT `Participant_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
