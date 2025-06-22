-- MySQL dump 10.13  Distrib 8.0.42, for Win64 (x86_64)
--
-- Host: localhost    Database: dev_vacation
-- ------------------------------------------------------
-- Server version	8.0.42

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `followers`
--

DROP TABLE IF EXISTS `followers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `followers` (
  `userId` int NOT NULL,
  `vacationId` int NOT NULL,
  PRIMARY KEY (`userId`,`vacationId`),
  KEY `vacationId` (`vacationId`),
  CONSTRAINT `followers_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`userId`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `followers_ibfk_2` FOREIGN KEY (`vacationId`) REFERENCES `vacations` (`vacationId`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `followers`
--

LOCK TABLES `followers` WRITE;
/*!40000 ALTER TABLE `followers` DISABLE KEYS */;
/*!40000 ALTER TABLE `followers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `roles`
--

DROP TABLE IF EXISTS `roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `roles` (
  `roleId` int NOT NULL AUTO_INCREMENT,
  `roleName` varchar(30) NOT NULL,
  PRIMARY KEY (`roleId`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `roles`
--

LOCK TABLES `roles` WRITE;
/*!40000 ALTER TABLE `roles` DISABLE KEYS */;
INSERT INTO `roles` VALUES (1,'user'),(2,'admin');
/*!40000 ALTER TABLE `roles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `userId` int NOT NULL AUTO_INCREMENT,
  `firstName` varchar(30) NOT NULL,
  `lastName` varchar(30) NOT NULL,
  `username` varchar(30) NOT NULL,
  `password` varchar(128) NOT NULL,
  `roleId` int NOT NULL,
  PRIMARY KEY (`userId`),
  KEY `roleId` (`roleId`),
  CONSTRAINT `users_ibfk_1` FOREIGN KEY (`roleId`) REFERENCES `roles` (`roleId`)
) ENGINE=InnoDB AUTO_INCREMENT=79 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (71,'Ronaldo','Nazario','ronaldo_nazario','6c8cdaebf50dbe5046d7e7533c129e95d2be95e66f0ad5387f45f606829e7c33501ea4af1d3f5294a12f8a229d039bf1fd6f348db70ee8775f6ed099c4e35137',2),(75,'Nip','Hussle','nip12302','e465752465ad0bedb67cfbb08aa36d54438d74a04922c8640702d55d6c5337a510392138be4892be6723a8225901fbdbd29a5325aafb033abccc1cf0ffc99c1d',1),(76,'גש\'גש\'','גש\'גש\'ג','/\'ג/\'ג/\'ג','e05b71903a5e9c88eb67fa8c862fb63df5732b522b5d3edf8d5d95bcad70bde532a340a339065c15a5522029ab396c959dc853ce731faff79c8d460cf1412984',1),(77,'sdsa  sadawdwa ','dasdwdaw','dasdwddsad2212s','75b7dd1d2007095ab2138016c67a5d63ac25eff53a4cc7100d7971cfecb0ee9102a1d90f2d8635d8e8379df6602a448b35caa95acf6b2e19a5f2f424aaa7659c',1),(78,'בנימין ','Smith','binyamin12032','cbec0f7e93835b94ab2788fd1f379cf458abf7115b08c89178159541b9ddfc9b0b97b31bb8bd5716a75678fc758748faeb6bceaaeabcaf6427b30a7f4c6e1cbd',1);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `vacations`
--

DROP TABLE IF EXISTS `vacations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `vacations` (
  `vacationId` int NOT NULL AUTO_INCREMENT,
  `description` varchar(90) NOT NULL,
  `destination` varchar(30) NOT NULL,
  `imageName` varchar(255) DEFAULT NULL,
  `startDate` varchar(10) NOT NULL,
  `endDate` varchar(10) NOT NULL,
  `price` decimal(6,2) NOT NULL,
  PRIMARY KEY (`vacationId`),
  CONSTRAINT `chk_description_length` CHECK ((char_length(`description`) between 5 and 90)),
  CONSTRAINT `chk_destination_length` CHECK ((char_length(`destination`) between 2 and 30)),
  CONSTRAINT `chk_price_range` CHECK (((`price` >= 100) and (`price` <= 10000)))
) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `vacations`
--

LOCK TABLES `vacations` WRITE;
/*!40000 ALTER TABLE `vacations` DISABLE KEYS */;
INSERT INTO `vacations` VALUES (14,'Discover the beauty of Rome and its history.','Rome','https://images.unsplash.com/photo-rome','2025-07-05','2025-07-12',1800.00),(15,'A romantic getaway to the city of lights.','Paris','https://images.unsplash.com/photo-paris','2025-08-10','2025-08-17',2200.00),(16,'Explore London’s top attractions and nightlife.','London','https://images.unsplash.com/photo-london','2025-09-01','2025-09-08',1950.00),(17,'The city that never sleeps awaits you!','New York','https://images.unsplash.com/photo-nyc','2025-10-15','2025-10-22',2600.00),(18,'Experience Tokyo’s vibrant culture and cuisine.','Tokyo','https://images.unsplash.com/photo-tokyo','2025-11-05','2025-11-14',2700.00),(19,'Sun, sea, and the magic of Barcelona.','Barcelona','https://images.unsplash.com/photo-barcelona','2025-07-25','2025-08-01',2000.00),(20,'Relax on the beautiful beaches of Santorini.','Santorini','https://images.unsplash.com/photo-santorini','2025-09-15','2025-09-22',2400.00),(21,'Enjoy the canals and museums of Amsterdam.','Amsterdam','https://images.unsplash.com/photo-amsterdam','2025-08-20','2025-08-27',1750.00),(22,'A fairy-tale city full of castles and culture.','Prague','https://images.unsplash.com/photo-prague','2025-10-02','2025-10-09',1600.00),(23,'Luxury shopping and modern architecture in Dubai.','Dubai','https://images.unsplash.com/photo-dubai','2025-12-01','2025-12-10',3100.00),(24,'Experience the magic of East meets West.','Istanbul','https://images.unsplash.com/photo-istanbul','2025-11-10','2025-11-17',1500.00),(25,'Explore the beaches and culture of Sydney.','Sydney','https://images.unsplash.com/photo-sydney','2026-01-08','2026-01-16',3300.00),(26,'Classical music and stunning palaces in Vienna.','Vienna','https://images.unsplash.com/photo-vienna','2025-09-20','2025-09-27',1850.00),(27,'Nature and adventure await in Cape Town, South Africa.','Cape Town','https://images.unsplash.com/photo-cape-town','2025-12-18','2025-12-26',2500.00);
/*!40000 ALTER TABLE `vacations` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-06-22 21:31:43
