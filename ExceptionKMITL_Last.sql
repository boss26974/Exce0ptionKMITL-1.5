-- MySQL dump 10.13  Distrib 8.0.28, for Win64 (x86_64)
--
-- Host: localhost    Database: exceptionkmitl1.5
-- ------------------------------------------------------
-- Server version	8.0.28

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
-- Table structure for table `account`
--

DROP TABLE IF EXISTS `account`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `account` (
  `acc_id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `acc_fname` varchar(255) DEFAULT NULL,
  `acc_lname` varchar(255) DEFAULT NULL,
  `acc_password` varchar(255) NOT NULL,
  `acc_email` varchar(255) NOT NULL,
  `create_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`acc_id`),
  UNIQUE KEY `acc_email` (`acc_email`),
  UNIQUE KEY `acc_id` (`acc_id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `account`
--

LOCK TABLES `account` WRITE;
/*!40000 ALTER TABLE `account` DISABLE KEYS */;
INSERT INTO `account` VALUES (5,'Pitchaya','Singmeesri','$2b$10$hC.5/7MeZ1UaZvX7Kef5M.oDC4gMH1qRDAIpyuDIDqkjhrtqUek2m','pitchaya232@gmail.com','2022-05-23 09:22:56');
/*!40000 ALTER TABLE `account` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `admin`
--

DROP TABLE IF EXISTS `admin`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `admin` (
  `acc_id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `rule_manage_acc` tinyint(1) DEFAULT NULL,
  `rule_standand_admin` tinyint(1) DEFAULT NULL,
  `access_key` int DEFAULT NULL,
  PRIMARY KEY (`acc_id`),
  UNIQUE KEY `acc_id` (`acc_id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `admin`
--

LOCK TABLES `admin` WRITE;
/*!40000 ALTER TABLE `admin` DISABLE KEYS */;
INSERT INTO `admin` VALUES (5,1,1,1234);
/*!40000 ALTER TABLE `admin` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `environment_report_form`
--

DROP TABLE IF EXISTS `environment_report_form`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `environment_report_form` (
  `report_form_id` int NOT NULL AUTO_INCREMENT,
  `environment_location` varchar(255) DEFAULT NULL,
  `problem_description` text,
  `condition_of_submission` enum('ด่วน','ไม่ด่วน') DEFAULT NULL,
  `status` int DEFAULT NULL,
  PRIMARY KEY (`report_form_id`),
  CONSTRAINT `environment_form_id` FOREIGN KEY (`report_form_id`) REFERENCES `report_form` (`report_form_id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `environment_report_form`
--

LOCK TABLES `environment_report_form` WRITE;
/*!40000 ALTER TABLE `environment_report_form` DISABLE KEYS */;
/*!40000 ALTER TABLE `environment_report_form` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `forum`
--

DROP TABLE IF EXISTS `forum`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `forum` (
  `forum_id` int NOT NULL AUTO_INCREMENT,
  `forum_topic` varchar(255) DEFAULT NULL,
  `forum_description` text,
  `forum_release_date` date DEFAULT NULL,
  `forum_type` varchar(255) DEFAULT NULL,
  `acc_id` int NOT NULL,
  `image_address` text NOT NULL,
  PRIMARY KEY (`forum_id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `forum`
--

LOCK TABLES `forum` WRITE;
/*!40000 ALTER TABLE `forum` DISABLE KEYS */;
/*!40000 ALTER TABLE `forum` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `register_system_report_form`
--

DROP TABLE IF EXISTS `register_system_report_form`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `register_system_report_form` (
  `report_form_id` int NOT NULL AUTO_INCREMENT,
  `regis_subject` varchar(255) DEFAULT NULL,
  `problem_description` text,
  `condition_of_submission` enum('ด่วน','ไม่ด่วน') DEFAULT NULL,
  `status` int DEFAULT NULL,
  PRIMARY KEY (`report_form_id`),
  CONSTRAINT `register_system_form_id` FOREIGN KEY (`report_form_id`) REFERENCES `report_form` (`report_form_id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `register_system_report_form`
--

LOCK TABLES `register_system_report_form` WRITE;
/*!40000 ALTER TABLE `register_system_report_form` DISABLE KEYS */;
/*!40000 ALTER TABLE `register_system_report_form` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `report_form`
--

DROP TABLE IF EXISTS `report_form`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `report_form` (
  `report_form_id` int NOT NULL AUTO_INCREMENT,
  `report_form_date_time` datetime DEFAULT NULL,
  `report_form_topic` varchar(255) DEFAULT NULL,
  `type` varchar(255) NOT NULL,
  `acc_id` int NOT NULL,
  PRIMARY KEY (`report_form_id`),
  KEY `acc_id_idx` (`acc_id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `report_form`
--

LOCK TABLES `report_form` WRITE;
/*!40000 ALTER TABLE `report_form` DISABLE KEYS */;
INSERT INTO `report_form` VALUES (1,'2022-05-23 16:48:29','testtesttesttesttesttest','สภาพสังคม',5),(2,'2022-05-23 16:49:37','2222222222222222222222222','สภาพสังคม',5);
/*!40000 ALTER TABLE `report_form` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `scholarship_report_form`
--

DROP TABLE IF EXISTS `scholarship_report_form`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `scholarship_report_form` (
  `report_form_id` int NOT NULL AUTO_INCREMENT,
  `scholarship_type` varchar(255) DEFAULT NULL,
  `problem_description` text,
  `condition_of_submission` enum('ด่วน','ไม่ด่วน') DEFAULT NULL,
  `status` int DEFAULT NULL,
  PRIMARY KEY (`report_form_id`),
  CONSTRAINT `scholarship_report_id` FOREIGN KEY (`report_form_id`) REFERENCES `report_form` (`report_form_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `scholarship_report_form`
--

LOCK TABLES `scholarship_report_form` WRITE;
/*!40000 ALTER TABLE `scholarship_report_form` DISABLE KEYS */;
/*!40000 ALTER TABLE `scholarship_report_form` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sociality_report_form`
--

DROP TABLE IF EXISTS `sociality_report_form`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sociality_report_form` (
  `report_form_id` int NOT NULL AUTO_INCREMENT,
  `social_location` varchar(255) DEFAULT NULL,
  `problem_description` text,
  `condition_of_submission` enum('ด่วน','ไม่ด่วน') DEFAULT NULL,
  `status` int DEFAULT NULL,
  PRIMARY KEY (`report_form_id`),
  CONSTRAINT `sociality_form_id` FOREIGN KEY (`report_form_id`) REFERENCES `report_form` (`report_form_id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sociality_report_form`
--

LOCK TABLES `sociality_report_form` WRITE;
/*!40000 ALTER TABLE `sociality_report_form` DISABLE KEYS */;
INSERT INTO `sociality_report_form` VALUES (1,'testtesttesttesttest','testtesttesttesttesttesttesttesttesttesttesttesttest','ด่วน',2),(2,'2222222222222222222222222','22222222222222222222222222222222222222222222222222','ด่วน',0);
/*!40000 ALTER TABLE `sociality_report_form` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `studying_report_form`
--

DROP TABLE IF EXISTS `studying_report_form`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `studying_report_form` (
  `report_form_id` int NOT NULL AUTO_INCREMENT,
  `studying_subject_id` char(8) DEFAULT NULL,
  `problem_description` text,
  `condition_of_submission` enum('ด่วน','ไม่ด่วน') DEFAULT NULL,
  `status` int DEFAULT NULL,
  PRIMARY KEY (`report_form_id`),
  CONSTRAINT `studying_form_id` FOREIGN KEY (`report_form_id`) REFERENCES `report_form` (`report_form_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `studying_report_form`
--

LOCK TABLES `studying_report_form` WRITE;
/*!40000 ALTER TABLE `studying_report_form` DISABLE KEYS */;
/*!40000 ALTER TABLE `studying_report_form` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tokens`
--

DROP TABLE IF EXISTS `tokens`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tokens` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `token` varchar(255) NOT NULL,
  `acc_id` bigint unsigned DEFAULT NULL,
  `time_login` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `acc_id_UNIQUE` (`acc_id`),
  CONSTRAINT `fk_acc_id` FOREIGN KEY (`acc_id`) REFERENCES `account` (`acc_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tokens`
--

LOCK TABLES `tokens` WRITE;
/*!40000 ALTER TABLE `tokens` DISABLE KEYS */;
INSERT INTO `tokens` VALUES (2,'#iNsgdUG=W64^Tu05JYUuAMSd^lilN$nKoMj7fSkml!BqS#R-TmRfEE0SA3VYm!FE6m/9gMiXR^m6i9K*-dLKWf2l=wmskTDza!/',5,'2022-05-23 09:29:47');
/*!40000 ALTER TABLE `tokens` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `acc_id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `user_studentid` int NOT NULL,
  `user_status` enum('กำลังศึกษาอยู่','จบการศึกษาแล้ว') NOT NULL,
  PRIMARY KEY (`acc_id`),
  UNIQUE KEY `user_studentid` (`user_studentid`),
  UNIQUE KEY `acc_id` (`acc_id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (5,62070139,'กำลังศึกษาอยู่');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-05-23 17:11:33
