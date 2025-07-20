-- CreateTable
CREATE TABLE `User` (
    `id` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `User_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Trade` (
    `id` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `platform` VARCHAR(191) NOT NULL,
    `symbol` VARCHAR(191) NOT NULL,
    `direction` VARCHAR(191) NOT NULL,
    `entryTime` DATETIME(3) NOT NULL,
    `exitTime` DATETIME(3) NOT NULL,
    `entryPrice` DOUBLE NOT NULL,
    `exitPrice` DOUBLE NOT NULL,
    `quantity` DOUBLE NOT NULL,
    `result` DOUBLE NOT NULL,
    `ticketId` VARCHAR(191) NOT NULL,
    `tags` JSON NOT NULL,
    `notes` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `Trade_ticketId_key`(`ticketId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Trade` ADD CONSTRAINT `Trade_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
