-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 24, 2023 at 08:28 AM
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
('9b51bdc8-2d4a-4950-af3a-5c13efd474aa', '012a88dd-b622-4b76-9cdd-7490ccd8c735'),
('9b51bdc8-2d4a-4950-af3a-5c13efd474aa', '2eeea6c2-36e4-45d8-ae14-f1b094dcab03'),
('9b51bdc8-2d4a-4950-af3a-5c13efd474aa', '8a9e694e-e90f-451f-bfa8-240e397b3596');

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
  `userRoleId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`userId`, `userUUID`, `userFirstName`, `userLastName`, `userEmail`, `userPassword`, `userRoleId`) VALUES
(3, '27c19753-7955-4384-a921-4026b8f75d36', 'Alexander', 'Vasilenko', 'alexandervjr1@gmail.com', 'c9325a2951c1978b77495d4e3701a120242262642f552f6b500b89c3ee75d93899857397ef2dcf94d3be56d75d9b3213b7496075215b7fb1c4d078eec60a55d5', 1),
(4, '9b51bdc8-2d4a-4950-af3a-5c13efd474aa', 'Ben', 'Dover', 'bendo@gmail.com', 'c9325a2951c1978b77495d4e3701a120242262642f552f6b500b89c3ee75d93899857397ef2dcf94d3be56d75d9b3213b7496075215b7fb1c4d078eec60a55d5', 2);

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
  `vacationImageName` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `vacations`
--

INSERT INTO `vacations` (`vacationId`, `vacationUUID`, `vacationCountry`, `vacationCity`, `vacationDescription`, `vacationStartDate`, `vacationEndDate`, `vacationPrice`, `vacationImageName`) VALUES
(1, '2eeea6c2-36e4-45d8-ae14-f1b094dcab03', 'Italy', 'Tuscany', 'Known for beautiful landscapes, vineyards, historic cities like Florence, and charming countryside.', '2023-12-01', '2023-12-08', 6900, 'aad98a2e-3afb-4306-bdd3-423dc16c6452.jpg'),
(2, '54edf894-1670-45b6-9e77-d980139a1ce9', 'Japan', 'Kyoto', 'Renowned for its rich history, traditional tea houses, stunning temples, and the iconic Arashiyama Bamboo Grove.', '2023-12-15', '2023-12-22', 8560, '975286bc-440e-462d-8ed7-fe92f42f15c1.jpg'),
(3, '8b344dbe-c106-4d72-8212-8db10f3a288e', 'South Korea', 'Seoul', 'A dynamic city blending modern skyscrapers with historic temples, bustling markets, and vibrant nightlife.', '2023-12-22', '2023-12-29', 9999, '02bd0868-219b-4197-832d-c2c8f7fe50a0.jpg'),
(4, '8a9e694e-e90f-451f-bfa8-240e397b3596', 'Croatia', 'Dubrovnik', 'Known for its well-preserved medieval walls, charming old town, and stunning Adriatic Sea views.', '2023-12-30', '2024-01-04', 5369, '81124bfc-ee74-44ea-9697-f13942f94530.jpg'),
(5, 'ef202279-2964-468a-be90-233956552608', 'Spain', 'Barcelona', 'Famous for its unique architecture, vibrant culture, and beautiful beaches along the Mediterranean coast.', '2024-01-19', '2023-12-23', 6599, '99ddb905-4697-456c-a70c-66ec3ce98d0a.jpg'),
(6, '2093ade8-e3d7-4103-a8f9-71daae2081e4', 'The UK', 'Scottish Highlands', 'Offers breathtaking landscapes, rugged mountains, serene lochs, and historic castles.', '2024-07-10', '2024-07-17', 8749, '56ba98d1-cdf7-4af8-9f09-6dba3c7b3ae7.jpg'),
(7, 'f359cdd8-ec19-4080-ac4a-f639038da0ff', 'Germany', 'Bavarian Alps', 'Known for picturesque villages, stunning alpine scenery, and opportunities for outdoor activities like hiking and skiing.', '2024-08-03', '2024-08-10', 7199, 'f32e14c8-118f-45a9-9998-1d456bac7598.jpg'),
(8, '2e1e085a-f7d5-4d08-865a-75ceaf0e9c0d', 'The Netherlands', 'Amsterdam', 'Famous for picturesque canals, historic architecture, world-class museums, and vibrant culture.', '2024-11-01', '2024-11-07', 4699, '995d2252-ddec-451c-b14c-3246ce884630.jpg'),
(9, '012a88dd-b622-4b76-9cdd-7490ccd8c735', 'Ukraine', 'Lviv', 'Known for its well-preserved historic architecture, cobblestone streets, rich cultural heritage, and vibrant cafe culture.', '2023-11-01', '2023-11-07', 5899, 'd977a5f7-143d-4ac7-a9c6-c7c4a37c75ab.jpg'),
(10, 'e3013e9e-594e-4565-8c05-a2f1716916d9', 'The USA', 'Grand Canyon', 'One of the world\'s most famous natural wonders, offering awe-inspiring vistas, hiking trails, and geological history.', '2023-10-01', '2023-10-07', 6899, '641a092d-f1dd-440c-b57d-10c1936ed759.jpg'),
(11, '823e9fd5-53e9-4bf9-b44c-54fcd6a7aba7', 'Iceland', 'The Blue Lagoon', 'A geothermal spa known for its milky-blue waters, surrounded by lava fields, offering a relaxing experience.', '2024-12-17', '2023-12-24', 9699, '853a0b00-7f41-4242-97de-960ee7b74062.jpg'),
(12, '0174cbec-c899-491f-a407-8d94a13ea82e', 'Mexico', 'Guanajuato', 'Famous for its indigenous culture, delicious cuisine, vibrant markets, colorful streets, and rich artistic heritage.', '2024-05-23', '2024-05-27', 5799, 'e29fa3df-cc30-46d7-a2ae-1a064644d614.jpg');

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
  MODIFY `userId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `vacations`
--
ALTER TABLE `vacations`
  MODIFY `vacationId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=42;

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
