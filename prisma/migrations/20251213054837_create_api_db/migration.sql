-- CreateTable
CREATE TABLE `admin` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `aguId` CHAR(36) NULL,
    `uname` VARCHAR(255) NOT NULL,
    `password` VARCHAR(255) NOT NULL,
    `email` VARCHAR(255) NOT NULL,
    `its_superadmin` INTEGER NOT NULL,
    `page_access` VARCHAR(255) NOT NULL,
    `first_name` VARCHAR(255) NOT NULL,
    `last_name` VARCHAR(255) NOT NULL,
    `image` VARCHAR(255) NOT NULL,
    `status` INTEGER NOT NULL,
    `role` ENUM('admin', 'superadmin') NOT NULL DEFAULT 'admin',
    `permission` VARCHAR(10) NOT NULL,
    `phone` INTEGER NOT NULL,
    `gender` VARCHAR(1) NOT NULL,
    `dob` DATE NOT NULL,

    UNIQUE INDEX `admin_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `agencies` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `horseId` INTEGER NULL,
    `agencyName` VARCHAR(255) NOT NULL,
    `agencyLotNo` VARCHAR(100) NOT NULL,
    `agencyLogo` VARCHAR(255) NOT NULL,
    `modifiedOn` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),

    INDEX `agencyid_fk`(`horseId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `color` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `color` VARCHAR(255) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `countries` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `cguId` CHAR(36) NULL,
    `countryCode` CHAR(2) NOT NULL DEFAULT '',
    `countryName` VARCHAR(45) NOT NULL DEFAULT '',
    `currencyCode` CHAR(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `eligibility` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `horseId` INTEGER NULL,
    `type` VARCHAR(255) NULL,
    `series` VARCHAR(255) NULL,
    `feeName` VARCHAR(255) NULL,
    `status` ENUM('notpaid', 'paid', 'eligible') NOT NULL DEFAULT 'notpaid',
    `modifiedOn` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),

    INDEX `eligibilityId_fk`(`horseId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `horse_basics` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `hbguId` CHAR(36) NULL,
    `horseId` INTEGER NULL,
    `overview` TEXT NULL,
    `overviewUpdate` DATETIME(0) NULL,
    `catalogue` TEXT NULL,
    `catalogueUpdate` DATETIME(0) NULL,
    `terms` TEXT NULL,
    `article` TEXT NULL,
    `articleUpdate` DATETIME(0) NULL,
    `news` TEXT NULL,
    `newsUpdate` DATETIME(0) NULL,
    `isActive` ENUM('0', '1') NOT NULL DEFAULT 0,
    `createdAt` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),

    INDEX `basicid_fk`(`horseId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `horse_media` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `hmguId` CHAR(36) NULL,
    `horseId` INTEGER NULL,
    `lotNo` VARCHAR(100) NOT NULL DEFAULT '0',
    `name` VARCHAR(255) NULL,
    `path` VARCHAR(255) NULL,
    `caption` VARCHAR(255) NULL,
    `type` ENUM('image', 'video', 'audio') NOT NULL,
    `createdAt` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),

    INDEX `horseMediaHorseId_fk`(`horseId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `horses` (
    `ID` INTEGER NOT NULL AUTO_INCREMENT,
    `hguId` CHAR(36) NULL,
    `name` VARCHAR(255) NULL,
    `freezebrand` VARCHAR(50) NULL,
    `microchip` BIGINT UNSIGNED NULL,
    `foalingDate` DATE NULL,
    `sireName` VARCHAR(255) NULL,
    `sireId` INTEGER NULL,
    `damName` VARCHAR(255) NULL,
    `damId` INTEGER NULL,
    `damSireName` VARCHAR(255) NULL,
    `damSireId` INTEGER NULL,
    `sex` VARCHAR(50) NULL,
    `color` VARCHAR(100) NULL,
    `height` DECIMAL(2, 2) NULL,
    `weight` INTEGER NULL,
    `family` VARCHAR(100) NULL,
    `countryOfBirth` VARCHAR(100) NULL,
    `curr_country` VARCHAR(100) NULL,
    `gait` VARCHAR(10) NULL,
    `earningsString` INTEGER UNSIGNED NULL,
    `starts` INTEGER NULL,
    `first` INTEGER NULL,
    `second` INTEGER NULL,
    `third` INTEGER NULL,
    `bmr` VARCHAR(30) NULL,
    `as_a_2_year` VARCHAR(30) NULL,
    `as_a_2_year_overseas` VARCHAR(30) NULL,
    `as_a_3_year` VARCHAR(30) NULL,
    `as_a_3_year_overseas` VARCHAR(30) NULL,
    `as_a_4_year` VARCHAR(30) NULL,
    `isRetired` ENUM('0', '1') NOT NULL DEFAULT 0,
    `isNameMissing` ENUM('0', '1') NOT NULL DEFAULT 0,
    `modifiedOn` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `createdOn` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `metaphone` VARCHAR(50) NULL,
    `nzId` INTEGER NULL,

    PRIMARY KEY (`ID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `lh_consignor` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `horseId` INTEGER NULL,
    `consignorName` VARCHAR(255) NULL,
    `consignorEmail` VARCHAR(255) NULL,
    `consignorPhone` VARCHAR(50) NULL,
    `isActive` ENUM('0', '1') NOT NULL DEFAULT 1,
    `modifiedOn` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `createdOn` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    INDEX `consignorid_fk`(`horseId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `lots_categories` (
    `category_id` INTEGER NOT NULL AUTO_INCREMENT,
    `category_name` VARCHAR(255) NOT NULL,
    `category_template` VARCHAR(255) NULL,
    `category_order` INTEGER NOT NULL DEFAULT 1,

    PRIMARY KEY (`category_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `lots_horse` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `lguId` CHAR(36) NULL,
    `lotType` VARCHAR(12) NOT NULL DEFAULT 'Direct Sale',
    `lotNo` VARCHAR(100) NOT NULL DEFAULT '0',
    `horseId` INTEGER NULL,
    `defaultLot` ENUM('pic', 'inf') NOT NULL DEFAULT 'pic',
    `auctionId` INTEGER NOT NULL DEFAULT 0,
    `membershipsId` INTEGER NOT NULL DEFAULT 0,
    `placeAdsId` INTEGER NOT NULL DEFAULT 0,
    `horseName` VARCHAR(255) NULL,
    `lotCategory` ENUM('weanling', 'yearling', 'readyToRun', 'racehorse', 'broodmare', 'stallionGuide') NOT NULL DEFAULT 'weanling',
    `forStallionService` ENUM('0', '1') NOT NULL DEFAULT 0,
    `featuredImage` VARCHAR(255) NULL,
    `showAge` ENUM('0', '1') NOT NULL DEFAULT 1,
    `bestOfferFlag` ENUM('0', '1') NOT NULL DEFAULT 1,
    `price` INTEGER UNSIGNED NULL,
    `shareValue` DECIMAL(3, 1) NULL,
    `currency` ENUM('AUD', 'NZD', 'USD', 'EUR', 'GBP') NULL,
    `gst` VARCHAR(50) NULL,
    `status` ENUM('Unsold', 'Sold', 'Passed In', 'Withdrawn', 'Leased', 'Make an offer', 'Under offer') NOT NULL DEFAULT 'Unsold',
    `auFee` INTEGER UNSIGNED NULL,
    `nzFee` INTEGER UNSIGNED NULL,
    `stableNo` VARCHAR(50) NULL,
    `semen` VARCHAR(50) NULL,
    `currentCountry` VARCHAR(255) NULL,
    `state` VARCHAR(255) NULL,
    `locality` VARCHAR(255) NULL,
    `lplts` INTEGER NULL,
    `lts` INTEGER NULL,
    `m400` VARCHAR(255) NULL,
    `m800` VARCHAR(255) NULL,
    `familyValue` VARCHAR(50) NULL,
    `familyValueUp` VARCHAR(50) NULL,
    `familyValueDown` VARCHAR(50) NULL,
    `inFoalOf` VARCHAR(255) NULL,
    `foalAtFoot` VARCHAR(255) NULL,
    `lastDayOfService` DATETIME(0) NULL,
    `standingAt` VARCHAR(255) NULL,
    `trialQuarter` VARCHAR(255) NULL,
    `trialHalf` VARCHAR(255) NULL,
    `startersToWinners` VARCHAR(255) NULL,
    `winner100k` VARCHAR(255) NULL,
    `winner1m` VARCHAR(255) NULL,
    `damSireProgeny100kWinners` VARCHAR(255) NULL,
    `damSire1mWinners` VARCHAR(255) NULL,
    `pedigreeFive` TEXT NULL,
    `pedigreeThree` TEXT NULL,
    `extraUpdate` DATETIME(0) NULL,
    `eligibilityDesc` TEXT NULL,
    `eligibilityUpdate` DATETIME(0) NULL,
    `consignorName` VARCHAR(255) NULL,
    `consignorEmail` VARCHAR(255) NULL,
    `consignorPhone` VARCHAR(25) NULL,
    `companyListedFor` VARCHAR(255) NULL,
    `lotsOrder` INTEGER UNSIGNED NULL,
    `stallionOrder` INTEGER UNSIGNED NULL,
    `showSireBmr` ENUM('0', '1') NOT NULL DEFAULT 0,
    `isPublished` ENUM('0', '1') NOT NULL DEFAULT 0,
    `isArchive` ENUM('0', '1') NOT NULL DEFAULT 0,
    `modifiedOn` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `createdOn` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),

    INDEX `lotId_fk`(`horseId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `media_files` (
    `fId` INTEGER NOT NULL AUTO_INCREMENT,
    `guId` CHAR(36) NULL,
    `fName` VARCHAR(255) NULL,
    `fType` VARCHAR(100) NULL,
    `fPath` VARCHAR(50) NULL,
    `fSlug` VARCHAR(255) NULL,
    `fMime` VARCHAR(10) NULL,
    `createdAt` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),

    PRIMARY KEY (`fId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `members` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `mguId` CHAR(36) NULL,
    `fullName` VARCHAR(255) NULL,
    `email` VARCHAR(255) NOT NULL,
    `primary_number` VARCHAR(50) NULL,
    `country_id` INTEGER NULL,
    `address` VARCHAR(255) NULL,
    `postal_code` VARCHAR(255) NULL,
    `driver_licence` VARCHAR(255) NULL,
    `image_name` VARCHAR(255) NULL,
    `image_slug` VARCHAR(255) NULL,
    `profile_image` VARCHAR(255) NULL,
    `favorites` VARCHAR(255) NULL,
    `username` VARCHAR(100) NULL,
    `password` VARCHAR(255) NOT NULL,
    `hash` VARCHAR(255) NULL,
    `membershipType` ENUM('seller', 'buyer') NOT NULL DEFAULT 'seller',
    `isVerified` ENUM('0', '1') NOT NULL DEFAULT 0,
    `isApproved` ENUM('0', '1') NOT NULL DEFAULT 0,
    `isAuction` ENUM('0', '1') NOT NULL DEFAULT 0,
    `status` ENUM('0', '1', '2') NULL DEFAULT 0,
    `role` ENUM('member', 'seller', 'buyer', 'merchant', 'subadmin') NOT NULL DEFAULT 'member',
    `oauth_provider` VARCHAR(255) NULL,
    `oauth_uid` VARCHAR(255) NULL,
    `modified` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `createdOn` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    UNIQUE INDEX `email`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `membership` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `mbguId` CHAR(36) NULL,
    `mbName` VARCHAR(255) NOT NULL,
    `mbType` ENUM('buyer', 'seller') NOT NULL DEFAULT 'seller',
    `sellerType` ENUM('stallion', 'other', 'none') NOT NULL DEFAULT 'none',
    `mbPrice` INTEGER NOT NULL DEFAULT 0,
    `mbFeatures` TEXT NULL,
    `isPopular` BOOLEAN NULL DEFAULT false,
    `mbOrder` INTEGER NULL,
    `isInView` ENUM('0', '1') NOT NULL DEFAULT 0,
    `isActive` ENUM('0', '1') NOT NULL DEFAULT 0,
    `modifiedOn` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `createdOn` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `page_contents` (
    `content_id` INTEGER NOT NULL AUTO_INCREMENT,
    `pguId` CHAR(36) NULL,
    `content_title` VARCHAR(255) NULL,
    `content_slug` VARCHAR(255) NULL,
    `content` TEXT NULL,
    `content_order` INTEGER NULL DEFAULT 0,
    `content_type` VARCHAR(255) NULL DEFAULT 'text',
    `content_file` VARCHAR(255) NULL,
    `content_limit` INTEGER NULL DEFAULT 0,
    `content_published` ENUM('0', '1') NOT NULL DEFAULT 0,
    `modified_on` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `added_on` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),

    PRIMARY KEY (`content_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `payments` (
    `paymentId` INTEGER NOT NULL AUTO_INCREMENT,
    `payguId` CHAR(36) NULL,
    `orderId` VARCHAR(255) NULL,
    `tokenId` VARCHAR(255) NULL,
    `userEmail` VARCHAR(255) NULL,
    `transactionId` VARCHAR(255) NULL,
    `transactionMsg` ENUM('0', '1') NOT NULL DEFAULT 0,
    `transactionStatus` ENUM('0', '1') NOT NULL DEFAULT 0,
    `paymentAmount` INTEGER NOT NULL DEFAULT 0,
    `paymentCurrency` ENUM('AUD', 'NZD', 'USD', 'EUR', 'GBP') NULL DEFAULT 'USD',
    `paymentMsg` ENUM('0', '1') NOT NULL DEFAULT 0,
    `paymentStatus` ENUM('0', '1') NOT NULL DEFAULT 0,
    `paymentType` VARCHAR(255) NULL,
    `paymentJson` JSON NULL,
    `paymentDate` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `isUsed` ENUM('0', '1') NOT NULL DEFAULT 0,
    `modifiedOn` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `createdOn` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    PRIMARY KEY (`paymentId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `place_ads` (
    `placeAdsId` INTEGER NOT NULL AUTO_INCREMENT,
    `horseId` INTEGER NULL,
    `memberId` CHAR(36) NULL,
    `memberEmail` VARCHAR(255) NULL,
    `membershipUid` CHAR(36) NULL,
    `orderId` CHAR(36) NULL,
    `publishedOn` TIMESTAMP(0) NULL,
    `isPublished` ENUM('0', '1') NOT NULL DEFAULT 0,
    `modifiedOn` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `createdOn` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    INDEX `pads_publish_status`(`isPublished`),
    PRIMARY KEY (`placeAdsId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `races` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `rguId` CHAR(36) NULL,
    `horseId` INTEGER NULL,
    `track` VARCHAR(100) NULL,
    `placing` VARCHAR(100) NULL,
    `lastHalf` DECIMAL(5, 1) NULL,
    `lastQtr` DECIMAL(5, 1) NULL,
    `prizeMoney` INTEGER NULL,
    `race` VARCHAR(255) NULL,
    `trainer` VARCHAR(255) NULL,
    `driver` VARCHAR(255) NULL,
    `age` INTEGER NULL,
    `bmr` VARCHAR(255) NULL,
    `firstWin` INTEGER UNSIGNED NULL,
    `secondWin` INTEGER UNSIGNED NULL,
    `thirdWin` INTEGER UNSIGNED NULL,
    `starts` INTEGER UNSIGNED NULL,
    `notes` TEXT NULL,
    `modifiedOn` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),

    INDEX `racesId_fk`(`horseId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `sales_result` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `horseId` INTEGER NULL,
    `sale` VARCHAR(255) NULL,
    `price` INTEGER NULL,
    `saleAve` INTEGER NULL,
    `relation` VARCHAR(255) NULL,
    `notes` VARCHAR(255) NULL,
    `modifiedOn` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),

    INDEX `salesResultId_fk`(`horseId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `sex` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `sex` VARCHAR(255) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `sitesettings` (
    `field_name` VARCHAR(255) NOT NULL,
    `field_value` VARCHAR(255) NOT NULL,
    `id` INTEGER NOT NULL AUTO_INCREMENT,

    UNIQUE INDEX `field_name`(`field_name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `subscriptions` (
    `subscription_id` INTEGER NOT NULL AUTO_INCREMENT,
    `subscription_orderid` VARCHAR(255) NULL,
    `subscription_member` INTEGER NOT NULL,
    `subscription_membership` INTEGER NOT NULL,
    `subscription_amount` VARCHAR(255) NULL,
    `subscription_date` DATETIME(0) NOT NULL,
    `subscription_status` TINYINT NULL DEFAULT 0,

    PRIMARY KEY (`subscription_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `users` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `username` VARCHAR(255) NOT NULL,
    `email` VARCHAR(255) NOT NULL,
    `password` VARCHAR(255) NOT NULL,
    `created_at` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),

    UNIQUE INDEX `username`(`username`),
    UNIQUE INDEX `email`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `lots_horse` ADD CONSTRAINT `lotId_fk` FOREIGN KEY (`horseId`) REFERENCES `horses`(`ID`) ON DELETE RESTRICT ON UPDATE CASCADE;
