-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 05, 2023 at 07:50 PM
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
  `userId` int(11) NOT NULL,
  `vacationId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `followers`
--

INSERT INTO `followers` (`userId`, `vacationId`) VALUES
(4, 1),
(4, 2);

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
(3, '', 'Alexander', 'Vasilenko', 'alexandervjr1@gmail.com', '1234', 1),
(4, '', 'Ben', 'Dover', 'bendo@gmail.com', '1234', 2);

-- --------------------------------------------------------

--
-- Table structure for table `vacations`
--

CREATE TABLE `vacations` (
  `vacationId` int(11) NOT NULL,
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

INSERT INTO `vacations` (`vacationId`, `vacationCountry`, `vacationCity`, `vacationDescription`, `vacationStartDate`, `vacationEndDate`, `vacationPrice`, `vacationImageName`) VALUES
(1, 'Italy', 'Tuscany', 'Known for beautiful landscapes, vineyards, historic cities like Florence, and charming countryside dotted with olive groves and cypress trees.', '2023-12-01', '2023-12-08', 6900, 'aad98a2e-3afb-4306-bdd3-423dc16c6452.jpg'),
(2, 'Japan', 'Kyoto', 'Renowned for its rich history, traditional tea houses, stunning temples, and the iconic Arashiyama Bamboo Grove.', '2023-12-15', '2023-12-22', 8560, '975286bc-440e-462d-8ed7-fe92f42f15c1.jpg'),
(3, 'South Korea', 'Seoul', 'A dynamic city blending modern skyscrapers with historic temples, bustling markets, vibrant nightlife, and delicious street food.', '2023-12-22', '2023-12-29', 9999, '02bd0868-219b-4197-832d-c2c8f7fe50a0.jpg'),
(4, 'Croatia', 'Dubrovnik', 'Known for its well-preserved medieval walls, charming old town, and stunning Adriatic Sea views.', '2023-12-30', '2024-01-04', 5369, '81124bfc-ee74-44ea-9697-f13942f94530.jpg'),
(5, 'Spain', 'Barcelona', 'Famous for its unique architecture, vibrant culture, delicious cuisine, and beautiful beaches along the Mediterranean coast.', '2024-01-19', '2023-12-23', 6599, '99ddb905-4697-456c-a70c-66ec3ce98d0a.jpg'),
(6, 'The UK', 'Scottish Highlands', 'Offers breathtaking landscapes, rugged mountains, serene lochs, and historic castles, providing an escape into stunning natural beauty.', '2024-07-10', '2024-07-17', 8749, '56ba98d1-cdf7-4af8-9f09-6dba3c7b3ae7.jpg'),
(7, 'Germany', 'Bavarian Alps', 'Known for picturesque villages, stunning alpine scenery, and opportunities for outdoor activities like hiking, skiing, and exploring fairy-tale castles.', '2024-08-03', '2024-08-10', 7199, 'f32e14c8-118f-45a9-9998-1d456bac7598.jpg'),
(8, 'The Netherlands', 'Amsterdam', 'Famous for picturesque canals, historic architecture, world-class museums like the Rijksmuseum and Van Gogh Museum, and vibrant culture.', '2024-11-01', '2024-11-07', 4699, '995d2252-ddec-451c-b14c-3246ce884630.jpg'),
(9, 'Ukraine', 'Lviv', 'Known for its well-preserved historic architecture, cobblestone streets, rich cultural heritage, and vibrant cafe culture.', '2023-11-01', '2023-11-07', 5899, 'd977a5f7-143d-4ac7-a9c6-c7c4a37c75ab.jpg'),
(10, 'The USA', 'Grand Canyon', 'One of the world\'s most famous natural wonders, offering awe-inspiring vistas, hiking trails, and a glimpse into geological history.', '2023-10-01', '2023-10-07', 6899, '641a092d-f1dd-440c-b57d-10c1936ed759.jpg'),
(11, 'Iceland', 'The Blue Lagoon', 'A geothermal spa known for its milky-blue waters, surrounded by lava fields, offering a relaxing and otherworldly experience.', '2024-12-17', '2023-12-24', 9699, '853a0b00-7f41-4242-97de-960ee7b74062.jpg'),
(12, 'Mexico', 'Guanajuato', 'Renowned for its colorful streets, colonial architecture, vibrant cultural scene, numerous historic sites including museums and theaters, and the famous Festival Cervantino celebrating the arts.', '2024-05-23', '2024-05-27', 5799, 'e29fa3df-cc30-46d7-a2ae-1a064644d614.jpg');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `followers`
--
ALTER TABLE `followers`
  ADD PRIMARY KEY (`userId`,`vacationId`),
  ADD KEY `vacationId` (`vacationId`);

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
  ADD KEY `userRole` (`userRoleId`);

--
-- Indexes for table `vacations`
--
ALTER TABLE `vacations`
  ADD PRIMARY KEY (`vacationId`);

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
  MODIFY `userId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `vacations`
--
ALTER TABLE `vacations`
  MODIFY `vacationId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `followers`
--
ALTER TABLE `followers`
  ADD CONSTRAINT `followers_ibfk_1` FOREIGN KEY (`vacationId`) REFERENCES `vacations` (`vacationId`),
  ADD CONSTRAINT `followers_ibfk_2` FOREIGN KEY (`userId`) REFERENCES `users` (`userId`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `users_ibfk_1` FOREIGN KEY (`userRoleId`) REFERENCES `roles` (`userRoleId`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
