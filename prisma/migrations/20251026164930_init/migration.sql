-- CreateTable
CREATE TABLE `Charge` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `amount` DOUBLE NOT NULL,
    `paymentType` ENUM('CREDIT_CARD', 'PIX') NOT NULL,
    `status` ENUM('PENDING', 'PAID', 'DENIED') NOT NULL,
    `pixCode` VARCHAR(191) NULL,
    `chargeCode` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
