-- MySQL dump 10.13  Distrib 8.0.18, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: tahduth
-- ------------------------------------------------------
-- Server version	5.5.5-10.1.36-MariaDB

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
-- Table structure for table `chat`
--

DROP TABLE IF EXISTS `chat`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `chat` (
  `idChat` varchar(50) CHARACTER SET utf8 NOT NULL,
  `idUserA` varchar(50) CHARACTER SET utf8 NOT NULL,
  `idUserB` varchar(50) CHARACTER SET utf8 NOT NULL,
  `CState` int(11) NOT NULL,
  PRIMARY KEY (`idChat`),
  KEY `FCidUsersA_PUidUsers_idx` (`idUserA`),
  KEY `FCidUsersB_PUidUsers_idx` (`idUserB`),
  CONSTRAINT `FCidUsersA_PUidUsers` FOREIGN KEY (`idUserA`) REFERENCES `users` (`idUsers`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `FCidUsersB_PUidUsers` FOREIGN KEY (`idUserB`) REFERENCES `users` (`idUsers`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `chat`
--

LOCK TABLES `chat` WRITE;
/*!40000 ALTER TABLE `chat` DISABLE KEYS */;
/*!40000 ALTER TABLE `chat` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `chat_group`
--

DROP TABLE IF EXISTS `chat_group`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `chat_group` (
  `idChat_Group` varchar(50) CHARACTER SET utf8 NOT NULL,
  `CGUserMod` varchar(50) CHARACTER SET utf8 NOT NULL,
  `CGState` int(11) NOT NULL,
  `CGNameGroup` varchar(50) CHARACTER SET utf8 NOT NULL,
  PRIMARY KEY (`idChat_Group`),
  KEY `FMidUsersMod_PUidUsers_idx` (`CGUserMod`),
  CONSTRAINT `FMidUsersMod_PUidUsers` FOREIGN KEY (`CGUserMod`) REFERENCES `users` (`idUsers`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `chat_group`
--

LOCK TABLES `chat_group` WRITE;
/*!40000 ALTER TABLE `chat_group` DISABLE KEYS */;
INSERT INTO `chat_group` VALUES ('Rgy0LCl34Zt0WnYKgq8u7khQVp6RvYkh0rF1tIhtF91Ia725O2','6Ne7wcpa29Zx6ARBHpxIhkmnd8I6t5ASZgE9cBN6p6gYBqcxUm',1,'LosTresAmigos');
/*!40000 ALTER TABLE `chat_group` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `chat_group_members`
--

DROP TABLE IF EXISTS `chat_group_members`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `chat_group_members` (
  `idchat_group_members` varchar(50) CHARACTER SET utf8 NOT NULL,
  `CGMidChat` varchar(50) CHARACTER SET utf8 NOT NULL,
  `CGMidUsers` varchar(50) CHARACTER SET utf8 NOT NULL,
  PRIMARY KEY (`idchat_group_members`),
  KEY `CGMidUsers_PUidUsers_idx` (`CGMidUsers`),
  KEY `CGMidChat_FKCGidChat_idx` (`CGMidChat`),
  CONSTRAINT `CGMidChat_FKCGidChat` FOREIGN KEY (`CGMidChat`) REFERENCES `chat_group` (`idChat_Group`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `CGMidUsers_PUidUsers` FOREIGN KEY (`CGMidUsers`) REFERENCES `users` (`idUsers`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `chat_group_members`
--

LOCK TABLES `chat_group_members` WRITE;
/*!40000 ALTER TABLE `chat_group_members` DISABLE KEYS */;
INSERT INTO `chat_group_members` VALUES ('7H5mbN0KmW6RhpUf8KEEEpkAAJpLDFQ19KBSOps39QEKJh5kZf','Rgy0LCl34Zt0WnYKgq8u7khQVp6RvYkh0rF1tIhtF91Ia725O2','2vOn7TFpvB4JBkR4fuajfKUWYw6a9Um8yMCGni2Ck9WYwklBrr'),('moL9YaTODucDon4pIz6FDrisOj1H4S8vwc3vVzKEsi2SHYyohs','Rgy0LCl34Zt0WnYKgq8u7khQVp6RvYkh0rF1tIhtF91Ia725O2','6Ne7wcpa29Zx6ARBHpxIhkmnd8I6t5ASZgE9cBN6p6gYBqcxUm'),('OyI9gijJDSCCBmx29sJasSKtslRfPJveiKoVLDmwcTnE8Mw5yg','Rgy0LCl34Zt0WnYKgq8u7khQVp6RvYkh0rF1tIhtF91Ia725O2','tsrPRaZU6zugr7tVG3CllLuBydEWbUR2IOMY8QcV3zSd3vhX0E');
/*!40000 ALTER TABLE `chat_group_members` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `friends`
--

DROP TABLE IF EXISTS `friends`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `friends` (
  `idFriendsA` varchar(50) CHARACTER SET utf8 NOT NULL,
  `idFriendsB` varchar(50) CHARACTER SET utf8 NOT NULL,
  `FState` int(11) NOT NULL,
  `FidRel` varchar(50) CHARACTER SET utf8 NOT NULL,
  PRIMARY KEY (`FidRel`),
  KEY `FFidUsersA_PUidUsers_idx` (`idFriendsA`),
  KEY `FFidUsersB_PUidUsers_idx` (`idFriendsB`),
  CONSTRAINT `FFidUsersA_PUidUsers` FOREIGN KEY (`idFriendsA`) REFERENCES `users` (`idUsers`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `FFidUsersB_PUidUsers` FOREIGN KEY (`idFriendsB`) REFERENCES `users` (`idUsers`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `friends`
--

LOCK TABLES `friends` WRITE;
/*!40000 ALTER TABLE `friends` DISABLE KEYS */;
/*!40000 ALTER TABLE `friends` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `message`
--

DROP TABLE IF EXISTS `message`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `message` (
  `idMessage` varchar(50) CHARACTER SET utf8 NOT NULL,
  `MMessage` varchar(50) CHARACTER SET utf8 NOT NULL,
  `MIdUsers` varchar(50) CHARACTER SET utf8 NOT NULL,
  `MIdChat` varchar(50) CHARACTER SET utf8 NOT NULL,
  PRIMARY KEY (`idMessage`),
  KEY `FMidUsers_PUidUsers_idx` (`MIdUsers`),
  KEY `FMidUsers_PCidChat_idx` (`MIdChat`),
  CONSTRAINT `FMidUsers_PCidChat` FOREIGN KEY (`MIdChat`) REFERENCES `chat` (`idChat`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `FMidUsers_PUidUsers` FOREIGN KEY (`MIdUsers`) REFERENCES `users` (`idUsers`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `message`
--

LOCK TABLES `message` WRITE;
/*!40000 ALTER TABLE `message` DISABLE KEYS */;
/*!40000 ALTER TABLE `message` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `idUsers` varchar(50) CHARACTER SET utf8 NOT NULL,
  `UName` varchar(50) CHARACTER SET utf8 NOT NULL,
  `UPassword` varchar(50) CHARACTER SET utf8 NOT NULL,
  `UState` int(11) NOT NULL,
  `UPhoto` varchar(255) NOT NULL,
  `UCom` varchar(60) CHARACTER SET utf8 DEFAULT NULL,
  `UEmail` varchar(100) CHARACTER SET utf8 NOT NULL,
  PRIMARY KEY (`idUsers`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES ('2vOn7TFpvB4JBkR4fuajfKUWYw6a9Um8yMCGni2Ck9WYwklBrr','Whitedeathlink','Test@123',1,'Whitedeathlink.jpeg','wtf','deathmajoras@gmail.com'),('6Ne7wcpa29Zx6ARBHpxIhkmnd8I6t5ASZgE9cBN6p6gYBqcxUm','Deathmajoras','Test@123',1,'Deathmajoras.jpeg','wtf','zijaham_link@hotmail.com'),('lxppt3LTLJa6fO9Lv7arF2XnhVuH0gTkyDGLTBHe31qCduqYga','Lewis','Test@123',0,'Lewis.png',' ','lewis_honguito@hotmail.com'),('qc1WNIYA5GqsHB8rSzWtJHaxOtjIA3sYVFSAVcxZxyUjrNDn3Q','Linkus','Test@123',1,'Linkus.jpeg',' ','linkus@gmail.com'),('tsrPRaZU6zugr7tVG3CllLuBydEWbUR2IOMY8QcV3zSd3vhX0E','usx','Test@123',1,'usx.jpeg','neeeeh','usx_can@hotmail.com');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping events for database 'tahduth'
--

--
-- Dumping routines for database 'tahduth'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-01-18  2:07:18
