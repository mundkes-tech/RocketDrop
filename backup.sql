-- MySQL dump 10.13  Distrib 8.0.42, for Win64 (x86_64)
--
-- Host: localhost    Database: rocketdrop_db
-- ------------------------------------------------------
-- Server version	8.0.42

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `addresses`
--

DROP TABLE IF EXISTS `addresses`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `addresses` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `city` varchar(255) NOT NULL,
  `country` varchar(255) NOT NULL,
  `created_at` datetime(6) NOT NULL,
  `pincode` varchar(255) NOT NULL,
  `state` varchar(255) NOT NULL,
  `street` varchar(255) NOT NULL,
  `user_id` bigint NOT NULL,
  `label` varchar(255) DEFAULT NULL,
  `line1` varchar(255) NOT NULL,
  `line2` varchar(255) DEFAULT NULL,
  `zip` varchar(255) DEFAULT NULL,
  `updated_at` datetime(6) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK1fa36y2oqhao3wgg2rw1pi459` (`user_id`),
  CONSTRAINT `FK1fa36y2oqhao3wgg2rw1pi459` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `addresses`
--

LOCK TABLES `addresses` WRITE;
/*!40000 ALTER TABLE `addresses` DISABLE KEYS */;
INSERT INTO `addresses` VALUES (1,'Mumbai','India','2026-04-02 00:54:12.802131','400001','MH','123 Test St',2,'Home','123 Test St','Suite 4',NULL,'2026-04-02 00:54:12.802131'),(2,'Mumbai','India','2026-04-02 00:54:55.943277','123456','Maharastra','123, Street Name',3,'123','123, Street Name',NULL,NULL,'2026-04-02 00:54:55.943277'),(3,'Mumbai','India','2026-04-06 23:58:48.301980','123456','Maharastra','123, Street Name',8,'home','123, Street Name',NULL,NULL,'2026-04-06 23:58:48.301980');
/*!40000 ALTER TABLE `addresses` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cart`
--

DROP TABLE IF EXISTS `cart`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cart` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `created_at` datetime(6) NOT NULL,
  `user_id` bigint NOT NULL,
  `updated_at` datetime(6) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UK9emlp6m95v5er2bcqkjsw48he` (`user_id`),
  CONSTRAINT `FKg5uhi8vpsuy0lgloxk2h4w5o6` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cart`
--

LOCK TABLES `cart` WRITE;
/*!40000 ALTER TABLE `cart` DISABLE KEYS */;
INSERT INTO `cart` VALUES (1,'2026-04-02 00:45:12.825082',2,'2026-04-02 00:45:12.825082'),(2,'2026-04-02 00:46:34.581663',3,'2026-04-02 00:46:34.581663'),(3,'2026-04-06 23:58:08.552716',8,'2026-04-06 23:58:08.552716');
/*!40000 ALTER TABLE `cart` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cart_items`
--

DROP TABLE IF EXISTS `cart_items`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cart_items` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `added_at` datetime(6) NOT NULL,
  `quantity` int NOT NULL,
  `cart_id` bigint NOT NULL,
  `product_id` bigint NOT NULL,
  `user_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK99e0am9jpriwxcm6is7xfedy3` (`cart_id`),
  KEY `FK1re40cjegsfvw58xrkdp6bac6` (`product_id`),
  KEY `FK709eickf3kc0dujx3ub9i7btf` (`user_id`),
  CONSTRAINT `FK1re40cjegsfvw58xrkdp6bac6` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`),
  CONSTRAINT `FK709eickf3kc0dujx3ub9i7btf` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  CONSTRAINT `FK99e0am9jpriwxcm6is7xfedy3` FOREIGN KEY (`cart_id`) REFERENCES `cart` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cart_items`
--

LOCK TABLES `cart_items` WRITE;
/*!40000 ALTER TABLE `cart_items` DISABLE KEYS */;
INSERT INTO `cart_items` VALUES (2,'2026-04-02 00:45:12.849122',1,1,6,2),(5,'2026-04-02 00:47:47.880908',1,2,9,3),(6,'2026-04-06 23:58:08.623004',1,3,1,8);
/*!40000 ALTER TABLE `cart_items` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `categories`
--

DROP TABLE IF EXISTS `categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `categories` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `created_at` datetime(6) NOT NULL,
  `description` text,
  `image_url` varchar(255) DEFAULT NULL,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categories`
--

LOCK TABLES `categories` WRITE;
/*!40000 ALTER TABLE `categories` DISABLE KEYS */;
INSERT INTO `categories` VALUES (3,'2026-04-02 14:21:46.434993',NULL,'https://res.cloudinary.com/dwdytobxv/image/upload/v1775119904/rocketdrop/frllh03dqcn4zzyiendm.jpg','Beauty'),(4,'2026-04-02 14:22:07.429615',NULL,'https://res.cloudinary.com/dwdytobxv/image/upload/v1775119925/rocketdrop/tpfjivznfnlzmwvgkabs.jpg','Electronics'),(5,'2026-04-02 14:22:38.335037',NULL,'https://res.cloudinary.com/dwdytobxv/image/upload/v1775119956/rocketdrop/zcmx4rrvzgvtrct3mxt1.jpg','Digital Wear'),(6,'2026-04-02 14:23:25.774701',NULL,'https://res.cloudinary.com/dwdytobxv/image/upload/v1775120004/rocketdrop/drfanlecdcbwxtcjuszc.jpg','Home & Kitchen'),(7,'2026-04-02 14:23:56.014772',NULL,'https://res.cloudinary.com/dwdytobxv/image/upload/v1775120034/rocketdrop/k21asspvgnwstgkckmae.jpg','Men\'s Wear'),(8,'2026-04-02 14:25:38.053057',NULL,'https://res.cloudinary.com/dwdytobxv/image/upload/v1775120136/rocketdrop/uuoydyui0e4hl4uxdipd.jpg','Sports'),(9,'2026-04-02 14:26:06.282816',NULL,'https://res.cloudinary.com/dwdytobxv/image/upload/v1775120164/rocketdrop/iq6f5ytuh4k2rkfrj3q0.jpg','Toys'),(10,'2026-04-02 14:26:26.054549',NULL,'https://res.cloudinary.com/dwdytobxv/image/upload/v1775120184/rocketdrop/qidis1djnffsoeg9iv3g.jpg','Women\'s Wear'),(11,'2026-04-02 14:26:51.089169',NULL,'https://res.cloudinary.com/dwdytobxv/image/upload/v1775120209/rocketdrop/ifrybvlsxm66ynjuyu4n.jpg','Jewellery');
/*!40000 ALTER TABLE `categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `coupons`
--

DROP TABLE IF EXISTS `coupons`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `coupons` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `active` bit(1) NOT NULL,
  `code` varchar(50) NOT NULL,
  `created_at` datetime(6) DEFAULT NULL,
  `discount_percentage` int NOT NULL,
  `updated_at` datetime(6) DEFAULT NULL,
  `usage_count` int NOT NULL,
  `valid_from` datetime(6) DEFAULT NULL,
  `valid_to` datetime(6) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UKeplt0kkm9yf2of2lnx6c1oy9b` (`code`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `coupons`
--

LOCK TABLES `coupons` WRITE;
/*!40000 ALTER TABLE `coupons` DISABLE KEYS */;
/*!40000 ALTER TABLE `coupons` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `drop_queues`
--

DROP TABLE IF EXISTS `drop_queues`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `drop_queues` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `joined_at` datetime(6) DEFAULT NULL,
  `position` int NOT NULL,
  `product_id` bigint NOT NULL,
  `user_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FKfmn6jqubur7lvr3qvsnj0b43g` (`product_id`),
  KEY `FKleqgyukocpwhx316lct9w3t4y` (`user_id`),
  CONSTRAINT `FKfmn6jqubur7lvr3qvsnj0b43g` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`),
  CONSTRAINT `FKleqgyukocpwhx316lct9w3t4y` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `drop_queues`
--

LOCK TABLES `drop_queues` WRITE;
/*!40000 ALTER TABLE `drop_queues` DISABLE KEYS */;
/*!40000 ALTER TABLE `drop_queues` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `order_items`
--

DROP TABLE IF EXISTS `order_items`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `order_items` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `price` decimal(38,2) NOT NULL,
  `quantity` int NOT NULL,
  `order_id` bigint NOT NULL,
  `product_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FKbioxgbv59vetrxe0ejfubep1w` (`order_id`),
  KEY `FKocimc7dtr037rh4ls4l95nlfi` (`product_id`),
  CONSTRAINT `FKbioxgbv59vetrxe0ejfubep1w` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`),
  CONSTRAINT `FKocimc7dtr037rh4ls4l95nlfi` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `order_items`
--

LOCK TABLES `order_items` WRITE;
/*!40000 ALTER TABLE `order_items` DISABLE KEYS */;
/*!40000 ALTER TABLE `order_items` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orders`
--

DROP TABLE IF EXISTS `orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `orders` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `created_at` datetime(6) NOT NULL,
  `status` enum('CANCELLED','DELIVERED','PLACED','SHIPPED') NOT NULL,
  `total_price` decimal(38,2) NOT NULL,
  `address_id` bigint NOT NULL,
  `user_id` bigint NOT NULL,
  `updated_at` datetime(6) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKhlglkvf5i60dv6dn397ethgpt` (`address_id`),
  KEY `FK32ql8ubntj5uh44ph9659tiih` (`user_id`),
  CONSTRAINT `FK32ql8ubntj5uh44ph9659tiih` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  CONSTRAINT `FKhlglkvf5i60dv6dn397ethgpt` FOREIGN KEY (`address_id`) REFERENCES `addresses` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orders`
--

LOCK TABLES `orders` WRITE;
/*!40000 ALTER TABLE `orders` DISABLE KEYS */;
/*!40000 ALTER TABLE `orders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product_drops`
--

DROP TABLE IF EXISTS `product_drops`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product_drops` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `created_at` datetime(6) NOT NULL,
  `current_stock` int NOT NULL,
  `drop_description` text,
  `drop_time` datetime(6) NOT NULL,
  `initial_stock` int NOT NULL,
  `status` enum('CANCELLED','LIVE','SCHEDULED','SOLD_OUT') NOT NULL,
  `version` int DEFAULT NULL,
  `product_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FKc8t8rd4io882uwviryafh4cxj` (`product_id`),
  CONSTRAINT `FKc8t8rd4io882uwviryafh4cxj` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product_drops`
--

LOCK TABLES `product_drops` WRITE;
/*!40000 ALTER TABLE `product_drops` DISABLE KEYS */;
INSERT INTO `product_drops` VALUES (6,'2026-03-30 22:11:50.230672',210,'Limited Afterburn Tee launch window.','2026-03-30 17:11:50.129784',210,'LIVE',0,6),(8,'2026-03-30 22:11:50.234673',180,'Limited DropCap Snapback launch window.','2026-04-03 22:11:50.129784',180,'SCHEDULED',0,8),(9,'2026-03-30 22:11:50.235671',260,'Limited Photon Crew Socks launch window.','2026-03-30 21:11:50.129784',260,'LIVE',0,9),(10,'2026-03-30 22:11:50.237722',40,'Limited RocketDrop Figure S1 launch window.','2026-04-04 22:11:50.129784',40,'SCHEDULED',0,10),(11,'2026-03-30 22:11:50.240091',55,'Limited Arcade Cartridge Set launch window.','2026-04-05 22:11:50.129784',55,'SCHEDULED',0,11),(12,'2026-03-30 22:11:50.241099',70,'Limited Signed Drop Poster launch window.','2026-04-01 22:11:50.129784',70,'SCHEDULED',0,12);
/*!40000 ALTER TABLE `product_drops` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product_images`
--

DROP TABLE IF EXISTS `product_images`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product_images` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `created_at` datetime(6) NOT NULL,
  `image_url` varchar(255) NOT NULL,
  `is_primary` bit(1) NOT NULL,
  `product_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FKqnq71xsohugpqwf3c9gxmsuy` (`product_id`),
  CONSTRAINT `FKqnq71xsohugpqwf3c9gxmsuy` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=56 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product_images`
--

LOCK TABLES `product_images` WRITE;
/*!40000 ALTER TABLE `product_images` DISABLE KEYS */;
INSERT INTO `product_images` VALUES (16,'2026-03-30 22:11:50.183417','https://images.unsplash.com/photo-1514996937319-344454492b37',_binary '',6),(17,'2026-03-30 22:11:50.185411','https://images.unsplash.com/photo-1460353581641-37baddab0fa2',_binary '\0',6),(18,'2026-03-30 22:11:50.186457','https://images.unsplash.com/photo-1491553895911-0055eca6402d',_binary '\0',6),(22,'2026-03-30 22:11:50.191410','https://images.unsplash.com/photo-1514996937319-344454492b37',_binary '',8),(23,'2026-03-30 22:11:50.192411','https://images.unsplash.com/photo-1460353581641-37baddab0fa2',_binary '\0',8),(24,'2026-03-30 22:11:50.194412','https://images.unsplash.com/photo-1491553895911-0055eca6402d',_binary '\0',8),(25,'2026-03-30 22:11:50.195415','https://images.unsplash.com/photo-1514996937319-344454492b37',_binary '',9),(26,'2026-03-30 22:11:50.196453','https://images.unsplash.com/photo-1460353581641-37baddab0fa2',_binary '\0',9),(27,'2026-03-30 22:11:50.198446','https://images.unsplash.com/photo-1491553895911-0055eca6402d',_binary '\0',9),(28,'2026-03-30 22:11:50.199412','https://images.unsplash.com/photo-1514996937319-344454492b37',_binary '',10),(29,'2026-03-30 22:11:50.201449','https://images.unsplash.com/photo-1460353581641-37baddab0fa2',_binary '\0',10),(30,'2026-03-30 22:11:50.202413','https://images.unsplash.com/photo-1491553895911-0055eca6402d',_binary '\0',10),(31,'2026-03-30 22:11:50.204412','https://images.unsplash.com/photo-1514996937319-344454492b37',_binary '',11),(32,'2026-03-30 22:11:50.205412','https://images.unsplash.com/photo-1460353581641-37baddab0fa2',_binary '\0',11),(33,'2026-03-30 22:11:50.206411','https://images.unsplash.com/photo-1491553895911-0055eca6402d',_binary '\0',11),(34,'2026-03-30 22:11:50.207554','https://images.unsplash.com/photo-1514996937319-344454492b37',_binary '',12),(35,'2026-03-30 22:11:50.209565','https://images.unsplash.com/photo-1460353581641-37baddab0fa2',_binary '\0',12),(36,'2026-03-30 22:11:50.210563','https://images.unsplash.com/photo-1491553895911-0055eca6402d',_binary '\0',12),(38,'2026-04-02 12:40:57.094252','https://res.cloudinary.com/dwdytobxv/image/upload/v1775113854/rocketdrop/hqq6sb0zzjnyuyc0cm7y.svg',_binary '',8),(39,'2026-04-03 23:40:47.143453','https://res.cloudinary.com/dwdytobxv/image/upload/v1775239843/rocketdrop/iaxvpyjgvxutwjg5akxw.png',_binary '',45),(40,'2026-04-03 23:40:51.636712','https://res.cloudinary.com/dwdytobxv/image/upload/v1775239848/rocketdrop/hy5cymxvrn89vyor0wby.png',_binary '',45),(41,'2026-04-03 23:42:26.434205','https://res.cloudinary.com/dwdytobxv/image/upload/v1775239943/rocketdrop/zgy7nvrgv0hj45fpx1a0.png',_binary '',44),(42,'2026-04-03 23:42:49.921326','https://res.cloudinary.com/dwdytobxv/image/upload/v1775239966/rocketdrop/vevfwsx1h4nr1yivskbn.png',_binary '',43),(43,'2026-04-03 23:43:09.036824','https://res.cloudinary.com/dwdytobxv/image/upload/v1775239985/rocketdrop/ahj3hvwogbjgihdwhc4x.png',_binary '',42),(44,'2026-04-03 23:43:31.939516','https://res.cloudinary.com/dwdytobxv/image/upload/v1775240008/rocketdrop/w4dkrl1kgz0lhemvryqj.png',_binary '',41),(45,'2026-04-03 23:53:58.632108','https://res.cloudinary.com/dwdytobxv/image/upload/v1775240635/rocketdrop/gkboh16nclnyk9juuppy.png',_binary '',40),(46,'2026-04-03 23:54:29.739478','https://res.cloudinary.com/dwdytobxv/image/upload/v1775240666/rocketdrop/senlc93pbxgnfhl4uguz.png',_binary '',39),(47,'2026-04-03 23:55:09.238501','https://res.cloudinary.com/dwdytobxv/image/upload/v1775240666/rocketdrop/senlc93pbxgnfhl4uguz.png',_binary '',39),(48,'2026-04-03 23:55:09.242201','https://res.cloudinary.com/dwdytobxv/image/upload/v1775240706/rocketdrop/ryuvxvqajinxngax2plp.png',_binary '\0',39),(49,'2026-04-03 23:58:58.060461','https://res.cloudinary.com/dwdytobxv/image/upload/v1775240935/rocketdrop/canwrsn6alaowydab6au.jpg',_binary '',34),(50,'2026-04-03 23:59:18.204594','https://res.cloudinary.com/dwdytobxv/image/upload/v1775240955/rocketdrop/cqowqkk7q7xohl17ct93.jpg',_binary '',33),(51,'2026-04-03 23:59:44.950352','https://res.cloudinary.com/dwdytobxv/image/upload/v1775240981/rocketdrop/jb1yuzfurd1jgg5affpf.jpg',_binary '',32),(52,'2026-04-04 00:00:33.704258','https://res.cloudinary.com/dwdytobxv/image/upload/v1775241030/rocketdrop/ys1exdgtodevtieexiek.jpg',_binary '',31),(53,'2026-04-04 00:05:26.489783','https://res.cloudinary.com/dwdytobxv/image/upload/v1775241323/rocketdrop/miowkfe986rfeugxonwk.jpg',_binary '',37),(54,'2026-04-04 00:05:51.228163','https://res.cloudinary.com/dwdytobxv/image/upload/v1775241348/rocketdrop/dqrpzrnld2t4aafyeilj.jpg',_binary '',36),(55,'2026-04-04 00:06:30.864967','https://res.cloudinary.com/dwdytobxv/image/upload/v1775241387/rocketdrop/mnccwhhk9fpwtquen9ys.jpg',_binary '',38);
/*!40000 ALTER TABLE `product_images` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `products` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `created_at` datetime(6) NOT NULL,
  `description` varchar(1000) DEFAULT NULL,
  `drop_time` datetime(6) DEFAULT NULL,
  `name` varchar(255) NOT NULL,
  `price` decimal(38,2) NOT NULL,
  `stock` int NOT NULL,
  `updated_at` datetime(6) NOT NULL,
  `category_id` bigint NOT NULL,
  `rating` double DEFAULT NULL,
  `sold_out` bit(1) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKog2rp4qthbtt2lfyhfo32lsw9` (`category_id`),
  CONSTRAINT `FKog2rp4qthbtt2lfyhfo32lsw9` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=46 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES (1,'2026-04-03 22:28:40.351032','A revolutionary moisture-lock formula blending high-molecular-weight hyaluronic acid with hand-picked Bulgarian rose petals. It absorbs instantly to provide a dewy, glass-skin finish without the grease.',NULL,'Luxe Rose Serum',2499.00,45,'2026-04-03 22:28:40.348967',3,0,_binary '\0'),(2,'2026-04-03 22:37:52.277777','High-pigment liquid luxury. This waterproof formula stays locked for 12 hours. Enriched with Vitamin E to ensure your lips stay hydrated while maintaining a flawless, non-transfer matte finish.',NULL,'Matte Velvet Kit',1850.00,120,'2026-04-03 22:37:52.277777',3,0,_binary '\0'),(3,'2026-04-03 22:38:34.591722','Authentic, cooling rose quartz sourced for its energetic properties. Use it daily to stimulate lymphatic drainage, reduce puffiness, and sculpt your facial contours for a natural, lifted look.',NULL,'Quartz Glow Roller',1200.00,80,'2026-04-03 22:38:34.591722',3,0,_binary '\0'),(4,'2026-04-03 22:39:15.985176','A professional-grade treatment combining activated charcoal and volcanic ash. It acts like a vacuum for your pores, pulling out impurities and environmental toxins in just 10 minutes.',NULL,'Charcoal Detox Mask',999.00,200,'2026-04-03 22:39:15.985176',3,0,_binary '\0'),(5,'2026-04-03 22:39:50.123588','The ultimate overnight repair. Infused with micro-encapsulated retinol and silk peptides, it works with your body’s circadian rhythm to smooth fine lines and brighten skin tone while you sleep.',NULL,'Midnight Silk Cream',3100.00,30,'2026-04-03 22:39:50.123588',3,0,_binary '\0'),(6,'2026-04-03 22:40:37.634864','Crafted from aerospace-grade titanium with a stunning Always-On AMOLED display. Features dual-band GPS, advanced heart-rate tracking, and 5ATM water resistance for the elite athlete.',NULL,'Titan Smartwatch Pro',14999.00,55,'2026-04-03 22:40:37.633771',5,0,_binary '\0'),(7,'2026-04-03 22:41:29.293173','Minimalism meets bio-metric precision. A feather-light tracker that monitors blood oxygen ($SpO_2$), stress levels, and sleep stages. Seamlessly syncs with all major health ecosystems.',NULL,'Aura Fitness Band',4500.00,150,'2026-04-03 22:41:29.293173',5,0,_binary '\0'),(8,'2026-04-03 22:42:06.706757','Designed for the modern professional. These precision-engineered lenses filter 90% of harmful blue light, reducing digital eye strain and improving focus during late-night deep-work sessions.',NULL,'Vision Blue-Light Frames',2200.00,90,'2026-04-03 22:42:06.706757',5,0,_binary '\0'),(9,'2026-04-03 22:43:36.116676','The pinnacle of wearable tech. A sleek zirconia ceramic ring that allows for gesture control and secure contactless payments. It’s the smart device you’ll forget you’re wearing.',NULL,'Sonic Ring V1',8999.00,24,'2026-04-03 22:43:36.116676',5,0,_binary '\0'),(10,'2026-04-03 22:44:13.830340','Experience the metaverse in high definition. Ultra-lightweight construction with adjustable 4K lenses and integrated spatial audio, designed for comfort during extended virtual exploration.',NULL,'VR Neo Lite',6500.00,40,'2026-04-03 22:44:13.830340',5,0,_binary '\0'),(11,'2026-04-03 22:44:55.357845','Audiophile-grade sound featuring hybrid Active Noise Cancellation (ANC). 40mm custom drivers deliver deep bass and crisp highs, with a 50-hour battery life for uninterrupted focus.',NULL,'ZenCloud Headphones',18500.00,60,'2026-04-03 22:44:55.357845',4,0,_binary '\0'),(12,'2026-04-03 22:45:57.861090','A minimalist 15W Qi-certified wireless charger. Features a magnetic alignment system that ensures your device hits the \"sweet spot\" every time, housed in a premium aluminum and fabric finish.',NULL,'MagCharge Pad',2800.00,300,'2026-04-03 22:45:57.861090',4,0,_binary '\0'),(13,'2026-04-03 22:46:28.084787','ower without limits. This 30,000mAh monster supports 65W Power Delivery, capable of charging a laptop and two smartphones simultaneously at maximum speed.',NULL,'VoltBank Ultra',4200.00,110,'2026-04-03 22:46:28.084787',4,0,_binary '\0'),(14,'2026-04-03 22:47:09.016795','A 75% layout mechanical keyboard with hot-swappable tactile switches. Features per-key RGB lighting and a CNC-machined aluminum frame for a heavy, premium typing experience.',NULL,'Click-Master Mech',7499.00,45,'2026-04-03 22:47:09.016795',4,0,_binary '\0'),(15,'2026-04-03 22:47:47.342070','Blazing fast 1050MB/s read/write speeds in a chassis no larger than a credit card. Drop-resistant and encrypted, it’s the ultimate vault for your most important source code and media.',NULL,'Terabyte Nano SSD',9800.00,75,'2026-04-03 22:47:47.342070',4,0,_binary '\0'),(16,'2026-04-03 22:48:28.574826','Master the art of the perfect pull. A high-pressure 15-bar Italian pump and integrated steam wand allow you to create cafe-quality lattes and cappuccinos from your own kitchen.',NULL,'Artisan Espresso Maker',1299.00,15,'2026-04-03 22:48:28.574826',6,0,_binary '\0'),(17,'2026-04-03 22:49:02.516933','Healthy cooking at the touch of a button. Uses 360° rapid air technology to achieve a perfect crunch with 85% less oil. Featuring a sleek digital touch interface and 8 presets.',NULL,'Air-Fry Pro 5L',6800.00,65,'2026-04-03 22:49:02.516933',6,0,_binary '\0'),(18,'2026-04-03 22:50:09.368705','Hand-glazed ceramic dinnerware with a unique matte charcoal finish. Each piece is chip-resistant, microwave-safe, and designed with a stackable silhouette to save cabinet space.',NULL,'Minimalist Bowl Set',3500.00,40,'2026-04-03 22:50:09.368705',6,0,_binary '\0'),(19,'2026-04-03 22:50:39.424650','Precision boiling for tea enthusiasts. Borosilicate glass construction with a 5-color LED system that indicates water temperature. Features an auto-shutoff and boil-dry protection.',NULL,'Smart Glass Kettle',2900.00,100,'2026-04-03 22:50:39.424650',6,0,_binary '\0'),(20,'2026-04-03 22:51:14.612015','A masterpiece of Japanese steel. 67 layers of high-carbon Damascus steel forged for razor-sharp edge retention. Features an ergonomic G10 handle for maximum control.',NULL,'Damascus Chef\'s Knife',5400.00,20,'2026-04-03 22:51:14.612015',6,0,_binary '\0'),(21,'2026-04-03 22:52:05.681065','A timeless classic reimagined. Cut from 100% heavy-weight Egyptian cotton with a subtle texture. Features a refined button-down collar and a slim, modern silhouette.',NULL,'Heritage Oxford Shirt',2100.00,150,'2026-04-03 22:52:05.681065',7,0,_binary '\0'),(22,'2026-04-03 22:52:41.764172','The intersection of style and utility. Four-way stretch twill fabric provides unrestricted movement, while the tapered fit ensures you look sharp from the office to the evening.',NULL,'Urban Chino Pants',2800.00,200,'2026-04-03 22:52:41.764172',7,0,_binary '\0'),(23,'2026-04-03 22:53:10.022542','Artisanal footwear at its best. Hand-stitched premium calfskin leather with a breathable lining and a cushioned memory foam insole for all-day luxury comfort.',NULL,'Classic Tan Loafers',4500.00,85,'2026-04-03 22:53:10.022542',7,0,_binary '\0'),(24,'2026-04-03 22:53:39.457804','Raw, 14oz selvedge denim that breaks in over time to create a unique patina personal to you. Reinforced stitching and a mid-rise straight cut for a rugged, premium feel.',NULL,'Selvedge Indigo Denim',3900.00,59,'2026-04-03 22:53:39.457804',7,0,_binary '\0'),(25,'2026-04-03 22:54:07.657672','A modern take on the flight jacket. Water-repellent nylon shell with a breathable mesh lining. Minimalist hardware and hidden pockets make it the perfect travel companion.',NULL,'Tech-Knit Bomber',4200.00,39,'2026-04-03 22:54:07.657672',7,0,_binary '\0'),(26,'2026-04-03 22:54:53.000985','Sustainable performance. Made from high-density, biodegradable natural rubber. The 6mm cushioning provides superior joint support while the laser-etched alignment lines guide your practice.',NULL,'Eco-Grip Yoga Mat',1500.00,120,'2026-04-03 22:54:53.000985',8,0,_binary '\0'),(27,'2026-04-03 22:55:28.589642','Engineered for the court. Features a moisture-wicking composite leather cover for ultimate grip and a deep-channel design for better shooting control and aerodynamic stability.',NULL,'Pro-Ball Basketball',2200.00,200,'2026-04-03 22:55:28.589642',8,0,_binary '\0'),(28,'2026-04-03 22:56:10.363659','Your entire gym in one pair. A patented dial system allows you to adjust weights from 2kg to 24kg instantly. Space-saving design with a durable, noise-reducing molding.',NULL,'Flex-Adjust Dumbbells',19500.00,30,'2026-04-03 22:56:10.363659',8,0,_binary '\0'),(29,'2026-04-03 22:56:48.385614','Designed for speed. Features a triple-layer mesh upper for maximum airflow and a responsive carbon-fiber plate in the sole to propel you forward with every stride.',NULL,'Aero-Run Sneakers',5600.00,110,'2026-04-03 22:56:48.385614',8,0,_binary '\0'),(30,'2026-04-03 22:58:10.509379','Hydration meets intelligence. A 1L stainless steel bottle with an integrated sensor that tracks your intake and glows to remind you when it\'s time to drink.',NULL,'Hydro-Track Bottle',1800.00,300,'2026-04-03 22:58:10.509379',8,0,_binary '\0'),(31,'2026-04-03 22:58:45.763927','Adrenaline-fueled fun. This 1:16 scale monster truck features independent suspension, 4WD capability, and a brushless motor that hits speeds of 40km/h on any terrain.',NULL,'Velocity RC Racer',3200.00,50,'2026-04-03 22:58:45.763927',9,0,_binary '\0'),(32,'2026-04-03 22:59:14.672841','1500 precision-molded pieces to build a sprawling space station. Includes integrated LED light kits and five poseable astronaut figures for an immersive building experience.',NULL,'Galactic Block Set',4800.00,34,'2026-04-03 22:59:14.672841',9,0,_binary '\0'),(33,'2026-04-03 23:00:03.803102','A companion for life. Hand-sewn with premium hypoallergenic plush fur and weighted with eco-friendly beads. Features a signature silk bow and embroidered detailing.',NULL,'Classic Heirloom Bear',1400.00,100,'2026-04-03 23:00:03.803102',9,0,_binary '\0'),(34,'2026-04-03 23:00:37.502338','The ultimate introduction to coding. Build and program your own robot using a simple drag-and-drop interface. Features ultrasonic sensors for obstacle avoidance and line-following.',NULL,'STEM Robot Kit',5999.00,22,'2026-04-03 23:00:37.501331',9,0,_binary '\0'),(35,'2026-04-03 23:01:14.413970','Open-ended play for growing minds. 100 high-transparency magnetic tiles in various geometric shapes. BPA-free and ultrasonically welded for maximum safety and durability.',NULL,'Magnetic Tiler Pro',2600.00,148,'2026-04-03 23:01:14.413970',8,0,_binary '\0'),(36,'2026-04-03 23:01:56.420689','Engineered to flatter. Our signature \"Sculpt\" denim technology provides maximum hold and recovery, while the high-waist cut creates a sleek, elongated silhouette.',NULL,'Sculpt High-Rise Jeans',3200.00,180,'2026-04-03 23:01:56.420689',10,0,_binary '\0'),(37,'2026-04-03 23:02:38.418475','A layering powerhouse. Crafted from 100% organic pima cotton with a fine rib texture. Features a high neckline and reinforced seams for a fit that never loses its shape.',NULL,'Ribbed Essential Tank',999.00,400,'2026-04-03 23:02:38.418475',10,0,_binary '\0'),(38,'2026-04-03 23:03:11.188267','Pure indulgence. Sourced from the highlands of Mongolia, this 100% cashmere sweater is incredibly soft, lightweight, and designed with a relaxed, effortless drape.',NULL,'Pure Cashmere Knit',7500.00,42,'2026-04-03 23:03:11.188267',10,0,_binary '\0'),(39,'2026-04-03 23:03:41.479574','A statement in minimalism. Genuine pebble-grain leather with a structured frame and polished gold-tone hardware. Perfectly sized for your daily essentials with an adjustable strap.',NULL,'Luna Crossbody Bag',4800.00,70,'2026-04-03 23:03:41.479574',10,0,_binary '\0'),(40,'2026-04-03 23:04:19.036807','Timeless sophistication. Cut on the bias from heavy-weight 22-momme mulberry silk. Features a subtle cowl neck and adjustable spaghetti straps for a liquid-like fit.',NULL,'Silk Slip Evening Dress',6400.00,30,'2026-04-03 23:04:19.036807',10,0,_binary '\0'),(41,'2026-04-03 23:05:00.491643','A daily luxury. These thick, hollow-core hoops are plated in 18K gold over sterling silver, offering a bold look without the weight. Tarnish-resistant and hypoallergenic.',NULL,'18K Gold Hoops',2200.00,110,'2026-04-03 23:05:00.491643',11,0,_binary '\0'),(42,'2026-04-03 23:05:36.272325','Pure brilliance. A 1-carat lab-grown diamond with VVS1 clarity, held in a classic 4-prong setting on a delicate 14K white gold Venetian box chain.',NULL,'Solitaire Pendant',24000.00,12,'2026-04-03 23:05:36.272325',11,0,_binary '\0'),(43,'2026-04-03 23:05:56.091319','The art of stacking. A curated set of three sterling silver bands, one featuring a pavé of micro-cubic zirconia that catches the light from every angle.',NULL,'Starlight Ring Set',1500.00,200,'2026-04-03 23:05:56.091319',11,0,_binary '\0'),(44,'2026-04-03 23:06:28.592298','Naturally elegant. A 7-inch bracelet featuring hand-selected 6mm freshwater pearls with a high luster, finished with a signature filigree silver lobster clasp.',NULL,'Classic Pearl Strand',3800.00,55,'2026-04-03 23:06:28.592298',11,0,_binary '\0'),(45,'2026-04-03 23:06:56.884715','Power and grace. A 36mm matte black surgical-grade steel case with a sapphire crystal lens. Features a minimalist sundial and a flexible Milanese mesh strap.',NULL,'Midnight Chrono Watch',5200.00,90,'2026-04-03 23:06:56.884715',11,0,_binary '\0');
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `reviews`
--

DROP TABLE IF EXISTS `reviews`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `reviews` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `comment` varchar(255) DEFAULT NULL,
  `created_at` datetime(6) NOT NULL,
  `rating` int NOT NULL,
  `product_id` bigint NOT NULL,
  `user_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FKpl51cejpw4gy5swfar8br9ngi` (`product_id`),
  KEY `FKcgy7qjc1r99dp117y9en6lxye` (`user_id`),
  CONSTRAINT `FKcgy7qjc1r99dp117y9en6lxye` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  CONSTRAINT `FKpl51cejpw4gy5swfar8br9ngi` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`),
  CONSTRAINT `reviews_chk_1` CHECK (((`rating` <= 5) and (`rating` >= 1)))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reviews`
--

LOCK TABLES `reviews` WRITE;
/*!40000 ALTER TABLE `reviews` DISABLE KEYS */;
/*!40000 ALTER TABLE `reviews` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `created_at` datetime(6) NOT NULL,
  `email` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `role` varchar(32) NOT NULL,
  `updated_at` datetime(6) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UK6dotkott2kjsp8vw4d0m25fb7` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (2,'2026-04-02 00:32:41.168169','test1775070161094@example.com','Test User','$2a$10$0iButkp4SgKWDAWE6evoLOoayNb2G3rV5.8fKkhF3Jxyf98uiQ5hG','9999999999','CUSTOMER','2026-04-02 00:32:41.168169'),(3,'2026-04-02 00:33:26.089259','abc@gmail.com','abc','$2a$10$Myf4X9tuhB2N.hfNI7d1BOqi8HHhPc2.VwCwNFL.BdE5Zb2PZL.V6','1234567890','CUSTOMER','2026-04-02 00:49:05.003726'),(8,'2026-04-03 16:45:27.655360','john@example.com','john doe','$2a$10$UnwMPNHRtd7cOrD8ez846.WFzlgLy0Lwoo/blBsJ.JVOdABRAnKgq','2546310879','CUSTOMER','2026-04-03 16:45:27.656368'),(9,'2026-04-03 16:54:27.639682','user1775235267@rocketdrop.test','Flow User','$2a$10$ASuQeLiJa8ji83Cug80fb.N3CHv.oyiRS1Z9vB6KCmL65buxmsRGC','9876543210','CUSTOMER','2026-04-03 16:54:27.639682'),(12,'2026-04-03 17:36:44.119445','mohil@rocketdrop.com','Admin','$2a$10$0bt2ktYAOkCbeXYlnEDkj.KruxSE8Z.DebHLsU7A7UCgKAPuT69Jq',NULL,'ADMIN','2026-04-03 17:36:44.119445');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `wishlist`
--

DROP TABLE IF EXISTS `wishlist`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `wishlist` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `created_at` datetime(6) NOT NULL,
  `product_id` bigint NOT NULL,
  `user_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK6p7qhvy1bfkri13u29x6pu8au` (`product_id`),
  KEY `FKtrd6335blsefl2gxpb8lr0gr7` (`user_id`),
  CONSTRAINT `FK6p7qhvy1bfkri13u29x6pu8au` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`),
  CONSTRAINT `FKtrd6335blsefl2gxpb8lr0gr7` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `wishlist`
--

LOCK TABLES `wishlist` WRITE;
/*!40000 ALTER TABLE `wishlist` DISABLE KEYS */;
/*!40000 ALTER TABLE `wishlist` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `wishlist_items`
--

DROP TABLE IF EXISTS `wishlist_items`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `wishlist_items` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `product_id` bigint NOT NULL,
  `user_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FKqxj7lncd242b59fb78rqegyxj` (`product_id`),
  KEY `FKmmj2k1i459yu449k3h1vx5abp` (`user_id`),
  CONSTRAINT `FKmmj2k1i459yu449k3h1vx5abp` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  CONSTRAINT `FKqxj7lncd242b59fb78rqegyxj` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `wishlist_items`
--

LOCK TABLES `wishlist_items` WRITE;
/*!40000 ALTER TABLE `wishlist_items` DISABLE KEYS */;
/*!40000 ALTER TABLE `wishlist_items` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-04-11 21:09:53
