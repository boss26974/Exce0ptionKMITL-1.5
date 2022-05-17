-- -------------------------------------------------------
-- Database: exceptionKMITL
-- -------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

CREATE TABLE `ACCOUNT` (
  `acc_id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `acc_fname` varchar(255),
  `acc_lname` varchar(255),
  `acc_password` varchar(255) NOT NULL,
  `acc_email` varchar(255)UNIQUE NOT NULL,
  `create_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`acc_id`),
  UNIQUE KEY `acc_id` (`acc_id`)
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=utf8mb4;

CREATE TABLE `USER` (
  `acc_id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `user_studentid` int(8) UNIQUE NOT NULL,
  `user_status` enum('กำลังศึกษาอยู่','จบการศึกษาแล้ว') NOT NULL,
  PRIMARY KEY (`acc_id`),
  UNIQUE KEY `acc_id` (`acc_id`)
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=utf8mb4;

CREATE TABLE `ADMIN` (
  `acc_id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `rule_manage_acc` boolean,
  `rule_standand_admin` boolean,
  `access_key` int(11),
  PRIMARY KEY (`acc_id`),
  UNIQUE KEY `acc_id` (`acc_id`)
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=utf8mb4;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;