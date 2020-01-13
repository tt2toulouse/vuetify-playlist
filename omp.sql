-- MySQL dump 10.13  Distrib 8.0.16, for macos10.14 (x86_64)
--
-- Host: localhost    Database: omp
-- ------------------------------------------------------
-- Server version	8.0.16

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
 SET NAMES utf8mb4 ;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `agent`
--

DROP TABLE IF EXISTS `agent`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `agent` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `lastname` varchar(100) NOT NULL,
  `firstname` varchar(100) NOT NULL,
  `birthday` date NOT NULL,
  `birth_place` varchar(255) NOT NULL,
  `adress` varchar(100) NOT NULL,
  `zip_code` varchar(100) NOT NULL,
  `city` varchar(100) NOT NULL,
  `country` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `phone` varchar(100) NOT NULL,
  `departure` date NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `agent`
--

LOCK TABLES `agent` WRITE;
/*!40000 ALTER TABLE `agent` DISABLE KEYS */;
INSERT INTO `agent` VALUES (1,'Pasteur','Louis','1822-12-27','Marnes-la- Coquette','4 place de la Bourse','31000','Toulouse','France','louis.pasteur@gmail.com','0635863411','1850-12-31'),(2,'Curie','Marie','1867-11-07','Varsovie','9 rue du Taur','75000','Paris','France','marie.curie@gmail.com','0734526786','1901-04-30'),(3,'Einstein','Albert','1879-03-14','Ulm','23 rue des Lois','31000','Toulouse','France','albert.einstein@gmail.com','0734523456','1910-07-28'),(4,'Descartes','René','1596-03-31','La Haye-en-Touraine','10 place du Capitole','31000','Toulouse','France','rene.descartes@gmail.com','0734526786','1901-04-30');
/*!40000 ALTER TABLE `agent` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `projects`
--

DROP TABLE IF EXISTS `projects`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `projects` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(100) NOT NULL,
  `person` varchar(100) NOT NULL,
  `due` date NOT NULL,
  `status` varchar(100) DEFAULT NULL,
  `content` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `projects`
--

LOCK TABLES `projects` WRITE;
/*!40000 ALTER TABLE `projects` DISABLE KEYS */;
INSERT INTO `projects` VALUES (1,'Span','Hollis','2019-03-02','Male','110.57.37.214'),(3,'Kanlam','Parnell','2019-11-28','Male','152.227.169.251'),(4,'Tresom','Cordi','2019-11-17','Female','17.238.37.92'),(5,'Biodex','Julieta','2019-12-12','Female','24.49.98.57'),(6,'Keylex','Norris','2019-03-25','Male','167.173.240.230'),(7,'Quo Lux','Portia','2019-02-12','Female','58.194.152.122'),(8,'Trippledex','Margret','2019-12-10','Female','232.131.58.206'),(9,'Cardguard','Fredi','2019-10-17','Female','252.115.46.130'),(10,'Redhold','Layla','2019-08-12','Female','216.46.184.138'),(12,'Flexidy','Danell','2019-07-30','Female','160.29.184.77'),(13,'Cookley','Averell','2019-02-13','Male','113.92.0.156'),(14,'Y-find','Jerrylee','2019-05-15','Female','70.175.132.241'),(15,'Lotstring','Adria','2019-10-10','Female','37.229.219.124'),(16,'Voyatouch','Margit','2019-06-21','Female','165.234.55.208'),(17,'Cardify','Tiena','2019-02-04','Female','136.174.17.95'),(18,'Bigtax','Lexy','2019-08-14','Female','126.160.59.27'),(19,'Zathin','Osgood','2019-11-20','Male','5.24.254.19'),(21,'Fintone','Scotty','2019-06-17','Male','231.42.202.35'),(22,'Bytecard','Dallas','2019-12-06','Male','211.204.22.152'),(23,'Daltfresh','Letisha','2019-05-30','Female','163.248.150.29'),(24,'Mat Lam Tam','Clayson','2019-07-16','Male','220.73.83.174');
/*!40000 ALTER TABLE `projects` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-01-13 21:42:42
