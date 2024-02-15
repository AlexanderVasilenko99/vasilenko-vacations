-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Feb 15, 2024 at 01:44 AM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `vacations`
--
CREATE DATABASE IF NOT EXISTS `vacations` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `vacations`;

-- --------------------------------------------------------

--
-- Table structure for table `followers`
--

CREATE TABLE `followers` (
  `userUUID` varchar(300) NOT NULL,
  `vacationUUID` varchar(300) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `followers`
--

INSERT INTO `followers` (`userUUID`, `vacationUUID`) VALUES
('4b0099c1-f158-4fea-96ac-14691c7efcde', '54edf894-1670-45b6-9e77-d980139a1ce9'),
('4b0099c1-f158-4fea-96ac-14691c7efcde', '8a9e694e-e90f-451f-bfa8-240e397b3596'),
('4b0099c1-f158-4fea-96ac-14691c7efcde', 'f359cdd8-ec19-4080-ac4a-f639038da0ff'),
('56b86c37-3510-45cc-a80f-07f6606e3e35', '012a88dd-b622-4b76-9cdd-7490ccd8c735'),
('56b86c37-3510-45cc-a80f-07f6606e3e35', '2e1e085a-f7d5-4d08-865a-75ceaf0e9c0d'),
('56b86c37-3510-45cc-a80f-07f6606e3e35', '54edf894-1670-45b6-9e77-d980139a1ce9'),
('56b86c37-3510-45cc-a80f-07f6606e3e35', '8b344dbe-c106-4d72-8212-8db10f3a288e'),
('56b86c37-3510-45cc-a80f-07f6606e3e35', 'ef202279-2964-468a-be90-233956552608'),
('9b51bdc8-2d4a-4950-af3a-5c13efd474aa', '012a88dd-b622-4b76-9cdd-7490ccd8c735'),
('9b51bdc8-2d4a-4950-af3a-5c13efd474aa', '2e1e085a-f7d5-4d08-865a-75ceaf0e9c0d'),
('9b51bdc8-2d4a-4950-af3a-5c13efd474aa', '2eeea6c2-36e4-45d8-ae14-f1b094dcab03'),
('9b51bdc8-2d4a-4950-af3a-5c13efd474aa', '54edf894-1670-45b6-9e77-d980139a1ce9'),
('9b51bdc8-2d4a-4950-af3a-5c13efd474aa', '82d8a6a6-9353-4380-b0c4-2c02c175751f'),
('9b51bdc8-2d4a-4950-af3a-5c13efd474aa', '8b344dbe-c106-4d72-8212-8db10f3a288e'),
('9b51bdc8-2d4a-4950-af3a-5c13efd474aa', 'b59028dd-884c-4b15-9814-6dd1e8afcf9a'),
('e55f1a39-e231-462f-b2d7-941099d48146', '012a88dd-b622-4b76-9cdd-7490ccd8c735'),
('e55f1a39-e231-462f-b2d7-941099d48146', '2e1e085a-f7d5-4d08-865a-75ceaf0e9c0d'),
('e55f1a39-e231-462f-b2d7-941099d48146', '54edf894-1670-45b6-9e77-d980139a1ce9'),
('e55f1a39-e231-462f-b2d7-941099d48146', '8a9e694e-e90f-451f-bfa8-240e397b3596');

-- --------------------------------------------------------

--
-- Table structure for table `roles`
--

CREATE TABLE `roles` (
  `userRoleId` int(30) NOT NULL,
  `userRoleName` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `roles`
--

INSERT INTO `roles` (`userRoleId`, `userRoleName`) VALUES
(1, 'admin'),
(2, 'user');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `userId` int(11) NOT NULL,
  `userUUID` varchar(300) NOT NULL,
  `userFirstName` varchar(30) NOT NULL,
  `userLastName` varchar(30) NOT NULL,
  `userEmail` varchar(50) NOT NULL,
  `userPassword` varchar(260) NOT NULL,
  `userImageName` varchar(255) NOT NULL,
  `userRoleId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`userId`, `userUUID`, `userFirstName`, `userLastName`, `userEmail`, `userPassword`, `userImageName`, `userRoleId`) VALUES
(3, '27c19753-7955-4384-a921-4026b8f75d36', 'Alexander', 'Vasilenko', 'alexandervjr1@gmail.com', 'c9325a2951c1978b77495d4e3701a120242262642f552f6b500b89c3ee75d93899857397ef2dcf94d3be56d75d9b3213b7496075215b7fb1c4d078eec60a55d5', '8faf402f-036e-496b-ade5-46920e72f321.jpeg', 1),
(4, '9b51bdc8-2d4a-4950-af3a-5c13efd474aa', 'Ben', 'Dover', 'bendo@gmail.com', 'c9325a2951c1978b77495d4e3701a120242262642f552f6b500b89c3ee75d93899857397ef2dcf94d3be56d75d9b3213b7496075215b7fb1c4d078eec60a55d5', 'edc03a66-055b-4c6d-b5b2-c3d4c7e72d76.png', 2),
(9, 'e55f1a39-e231-462f-b2d7-941099d48146', 'Mike', 'Hawk', 'mikehawk@gmail.com', 'c9325a2951c1978b77495d4e3701a120242262642f552f6b500b89c3ee75d93899857397ef2dcf94d3be56d75d9b3213b7496075215b7fb1c4d078eec60a55d5', '', 2),
(11, '4b0099c1-f158-4fea-96ac-14691c7efcde', 'Dixi', 'Normus', 'dixinormus@gmail.com', 'c9325a2951c1978b77495d4e3701a120242262642f552f6b500b89c3ee75d93899857397ef2dcf94d3be56d75d9b3213b7496075215b7fb1c4d078eec60a55d5', '', 2),
(13, '56b86c37-3510-45cc-a80f-07f6606e3e35', 'Amit', 'Romem', 'AmitRomem@gmail.com', 'c9325a2951c1978b77495d4e3701a120242262642f552f6b500b89c3ee75d93899857397ef2dcf94d3be56d75d9b3213b7496075215b7fb1c4d078eec60a55d5', '', 2);

-- --------------------------------------------------------

--
-- Table structure for table `vacations`
--

CREATE TABLE `vacations` (
  `vacationId` int(11) NOT NULL,
  `vacationUUID` varchar(300) NOT NULL,
  `vacationCountry` varchar(100) NOT NULL,
  `vacationCity` varchar(100) NOT NULL,
  `vacationDescription` varchar(1000) NOT NULL,
  `vacationStartDate` date NOT NULL,
  `vacationEndDate` date NOT NULL,
  `vacationPrice` int(7) NOT NULL,
  `vacationCountryISO` varchar(2) NOT NULL,
  `vacationImageName` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `vacations`
--

INSERT INTO `vacations` (`vacationId`, `vacationUUID`, `vacationCountry`, `vacationCity`, `vacationDescription`, `vacationStartDate`, `vacationEndDate`, `vacationPrice`, `vacationCountryISO`, `vacationImageName`) VALUES
(1, '2eeea6c2-36e4-45d8-ae14-f1b094dcab03', 'Italy', 'Tuscany', 'Known for beautiful landscapes, vineyards, historic cities like Florence, and charming countryside.', '2023-12-01', '2023-12-08', 6900, 'it', 'aad98a2e-3afb-4306-bdd3-423dc16c6452.jpg'),
(2, '54edf894-1670-45b6-9e77-d980139a1ce9', 'Japan', 'Kyoto', 'Renowned for its rich history, traditional tea houses, stunning temples, and the iconic Arashiyama Bamboo Grove.', '2023-12-15', '2023-12-22', 8560, 'jp', '975286bc-440e-462d-8ed7-fe92f42f15c1.jpg'),
(3, '8b344dbe-c106-4d72-8212-8db10f3a288e', 'South Korea', 'Seoul', 'A dynamic city blending modern skyscrapers with historic temples, bustling markets, and vibrant nightlife.', '2023-12-22', '2023-12-29', 9999, 'kr', '02bd0868-219b-4197-832d-c2c8f7fe50a0.jpg'),
(4, '8a9e694e-e90f-451f-bfa8-240e397b3596', 'Croatia', 'Dubrovnik', 'Known for its well-preserved medieval walls, charming old town, and stunning Adriatic Sea views.', '2023-12-30', '2024-01-04', 5369, 'hr', '81124bfc-ee74-44ea-9697-f13942f94530.jpg'),
(5, 'ef202279-2964-468a-be90-233956552608', 'Spain', 'Barcelona', 'Famous for its unique architecture, vibrant culture, and beautiful beaches along the Mediterranean coast.', '2023-12-18', '2024-01-24', 6699, 'es', '99ddb905-4697-456c-a70c-66ec3ce98d0a.jpg'),
(6, '2093ade8-e3d7-4103-a8f9-71daae2081e4', 'The UK', 'Scottish Highlands', 'Offers breathtaking landscapes, rugged mountains, serene lochs, and historic castles.', '2024-07-10', '2024-07-17', 8749, 'gb', '56ba98d1-cdf7-4af8-9f09-6dba3c7b3ae7.jpg'),
(7, 'f359cdd8-ec19-4080-ac4a-f639038da0ff', 'Germany', 'Bavarian Alps', 'Known for picturesque villages, stunning alpine scenery, and opportunities for outdoor activities like hiking and skiing.', '2024-08-03', '2024-08-10', 7199, 'de', 'f32e14c8-118f-45a9-9998-1d456bac7598.jpg'),
(8, '2e1e085a-f7d5-4d08-865a-75ceaf0e9c0d', 'The Netherlands', 'Amsterdam', 'Famous for picturesque canals, historic architecture, world-class museums, and vibrant culture.', '2024-11-01', '2024-11-07', 4699, 'nl', '995d2252-ddec-451c-b14c-3246ce884630.jpg'),
(9, '012a88dd-b622-4b76-9cdd-7490ccd8c735', 'Ukraine', 'Lviv', 'Known for its well-preserved historic architecture, cobblestone streets, rich cultural heritage, and vibrant cafe culture.', '2023-11-02', '2023-11-08', 5899, 'ua', 'd977a5f7-143d-4ac7-a9c6-c7c4a37c75ab.jpg'),
(10, 'e3013e9e-594e-4565-8c05-a2f1716916d9', 'The USA', 'Grand Canyon', 'One of the world\'s most famous natural wonders, offering awe-inspiring vistas, hiking trails, and geological history.', '2024-03-09', '2024-04-01', 6899, 'us', '641a092d-f1dd-440c-b57d-10c1936ed759.jpg'),
(11, '823e9fd5-53e9-4bf9-b44c-54fcd6a7aba7', 'Iceland', 'The Blue Lagoon', 'A geothermal spa known for its milky-blue waters, surrounded by lava fields, offering a relaxing experience.', '2024-12-17', '2024-12-24', 9699, 'is', '853a0b00-7f41-4242-97de-960ee7b74062.jpg'),
(12, '0174cbec-c899-491f-a407-8d94a13ea82e', 'Mexico', 'Guanajuato', 'Famous for its indigenous culture, delicious cuisine, vibrant markets, colorful streets, and rich artistic heritage.', '2024-05-23', '2024-05-27', 5799, 'mx', 'e29fa3df-cc30-46d7-a2ae-1a064644d614.jpg'),
(140, '82d8a6a6-9353-4380-b0c4-2c02c175751f', 'Thailand', 'Phuket', 'Tropical haven with stunning beaches, vibrant culture, and lively nightlife.', '2024-01-31', '2024-02-20', 9449, 'th', '9d66d634-49ae-4e31-980d-93b567f0cb4f.png'),
(141, 'b59028dd-884c-4b15-9814-6dd1e8afcf9a', 'Canada', 'Banff', 'Alpine charm, lakes and peaks. Nature\'s grandeur in the Canadian Rockies for an escape like no other', '2024-03-27', '2024-04-09', 9628, 'ca', 'b2cc76c7-824c-4753-8ea4-6754accdbf63.png'),
(142, 'b53c05d7-8ca8-4d9e-ad07-7e608181dde4', 'Vietnam', 'Hanoi', 'Temples, markets, lakes; Vietnamese charm, historic sites, flavorful street food. Enriching escape!', '2024-02-15', '2024-02-28', 7777, 'vn', 'c85f2992-56a8-4564-bc16-dbc119f17e5f.png');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `followers`
--
ALTER TABLE `followers`
  ADD PRIMARY KEY (`userUUID`,`vacationUUID`),
  ADD KEY `vacationUUID` (`vacationUUID`);

--
-- Indexes for table `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`userRoleId`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`userId`),
  ADD KEY `userRole` (`userRoleId`),
  ADD KEY `userUUID` (`userUUID`);

--
-- Indexes for table `vacations`
--
ALTER TABLE `vacations`
  ADD PRIMARY KEY (`vacationId`),
  ADD KEY `vacationUUID` (`vacationUUID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `roles`
--
ALTER TABLE `roles`
  MODIFY `userRoleId` int(30) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `userId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;

--
-- AUTO_INCREMENT for table `vacations`
--
ALTER TABLE `vacations`
  MODIFY `vacationId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=243;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `followers`
--
ALTER TABLE `followers`
  ADD CONSTRAINT `followers_ibfk_1` FOREIGN KEY (`vacationUUID`) REFERENCES `vacations` (`vacationUUID`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `followers_ibfk_2` FOREIGN KEY (`userUUID`) REFERENCES `users` (`userUUID`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `users_ibfk_1` FOREIGN KEY (`userRoleId`) REFERENCES `roles` (`userRoleId`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
