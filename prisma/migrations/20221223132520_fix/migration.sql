-- CreateTable
CREATE TABLE `exercises` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `howTo` VARCHAR(1000) NOT NULL,
    `img` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `exercises_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `MuscleGroup` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `MuscleGroup_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Users` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `gender` VARCHAR(191) NULL,
    `weight` INTEGER NULL,
    `height` INTEGER NULL,
    `age` INTEGER NULL,
    `injuries` VARCHAR(1000) NULL,
    `auth0Id` VARCHAR(255) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Workouts` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `userId` INTEGER NOT NULL,

    UNIQUE INDEX `Workouts_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Goals` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Goals_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Equipment` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Equipment_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_MuscleGroupToexercises` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_MuscleGroupToexercises_AB_unique`(`A`, `B`),
    INDEX `_MuscleGroupToexercises_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_WorkoutsToexercises` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_WorkoutsToexercises_AB_unique`(`A`, `B`),
    INDEX `_WorkoutsToexercises_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_GoalsToUsers` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_GoalsToUsers_AB_unique`(`A`, `B`),
    INDEX `_GoalsToUsers_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_EquipmentToexercises` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_EquipmentToexercises_AB_unique`(`A`, `B`),
    INDEX `_EquipmentToexercises_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Workouts` ADD CONSTRAINT `Workouts_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `Users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_MuscleGroupToexercises` ADD CONSTRAINT `_MuscleGroupToexercises_A_fkey` FOREIGN KEY (`A`) REFERENCES `MuscleGroup`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_MuscleGroupToexercises` ADD CONSTRAINT `_MuscleGroupToexercises_B_fkey` FOREIGN KEY (`B`) REFERENCES `exercises`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_WorkoutsToexercises` ADD CONSTRAINT `_WorkoutsToexercises_A_fkey` FOREIGN KEY (`A`) REFERENCES `Workouts`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_WorkoutsToexercises` ADD CONSTRAINT `_WorkoutsToexercises_B_fkey` FOREIGN KEY (`B`) REFERENCES `exercises`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_GoalsToUsers` ADD CONSTRAINT `_GoalsToUsers_A_fkey` FOREIGN KEY (`A`) REFERENCES `Goals`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_GoalsToUsers` ADD CONSTRAINT `_GoalsToUsers_B_fkey` FOREIGN KEY (`B`) REFERENCES `Users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_EquipmentToexercises` ADD CONSTRAINT `_EquipmentToexercises_A_fkey` FOREIGN KEY (`A`) REFERENCES `Equipment`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_EquipmentToexercises` ADD CONSTRAINT `_EquipmentToexercises_B_fkey` FOREIGN KEY (`B`) REFERENCES `exercises`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
