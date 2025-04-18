CREATE DATABASE IF NOT EXISTS athledger;

USE athledger;

CREATE TABLE IF NOT EXISTS `user` (
  `username` varchar(255) DEFAULT NULL,
  `userid` varchar(255) NOT NULL,
  `email` varchar(255) DEFAULT NULL,
  `dob` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `role` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`userid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE IF NOT EXISTS `sports` (
  `sportid` varchar(255) NOT NULL,
  `sport` varchar(255) DEFAULT NULL,
  `facility` varchar(255) DEFAULT NULL,
  `capacity` int DEFAULT NULL,
  `sfid` varchar(255) NOT NULL,
  PRIMARY KEY (`sportid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci

CREATE TABLE IF NOT EXISTS `slots` (
  `sport` varchar(255) DEFAULT NULL,
  `slotid` varchar(255) NOT NULL,
  `facility` varchar(255) DEFAULT NULL,
  `start` time(6) DEFAULT NULL,
  `end` time(6) DEFAULT NULL,
  `date` date DEFAULT NULL,
  PRIMARY KEY (`slotid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci

CREATE TABLE IF NOT EXISTS `booking` (
  `bookingid` varchar(255) NOT NULL,
  `bookingdate` date DEFAULT NULL,
  `bookingfrom` time DEFAULT NULL,
  `bookingto` time DEFAULT NULL,
  `sport` varchar(255) DEFAULT NULL,
  `bookingstatus` varchar(20) DEFAULT NULL,
  `facility` varchar(255) DEFAULT NULL,
  `userid` varchar(255) DEFAULT NULL,
  `slotid` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`bookingid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci