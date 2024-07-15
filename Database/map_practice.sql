-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 15, 2024 at 06:14 PM
-- Server version: 10.4.24-MariaDB
-- PHP Version: 8.1.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `map_practice`
--

-- --------------------------------------------------------

--
-- Table structure for table `employee`
--

CREATE TABLE `employee` (
  `id` varchar(255) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `city` varchar(255) DEFAULT NULL,
  `state` varchar(255) DEFAULT NULL,
  `country` varchar(255) DEFAULT NULL,
  `salary` int(11) DEFAULT NULL,
  `latitude` decimal(10,8) DEFAULT NULL,
  `longitude` decimal(10,8) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `employee`
--

INSERT INTO `employee` (`id`, `name`, `address`, `city`, `state`, `country`, `salary`, `latitude`, `longitude`) VALUES
('0efcfb5d-88cf-4ddf-9d3c-fdc420935ce6', 'James', '238 Jefferson Street', 'Seattle', 'Pennsylvania', 'USA', 45000, 16.78251300, -99.99999999),
('12725ab7-d0a7-4b7a-8616-4ed102152726', 'Liam', '576 Fifth Street', 'Denver', 'South Dakota', 'USA', 29000, -66.21817700, -99.99999999),
('38a3f99a-fcba-4b79-a2f0-73da79f773c6', 'Mia', '1627 Sixth Street', 'Jacksonville', 'West Virginia', 'USA', 24000, 24.85749700, -34.86542900),
('47c5da71-d690-4bc5-8c68-bed3ec1b85ad', 'Olivia', '547 First Street', 'Fort Worth', 'Tennessee', 'USA', 22000, 75.32627000, -26.15285000),
('54567912-b15c-4e2c-a02b-0d9de337a8b0', 'Jackson', '1873 Main Street', 'New York', 'Arkansas', 'USA', 34000, 34.72245100, 63.44892700),
('5fae48cb-38c2-4863-8d51-5776e63ba0f7', 'William', '31 Maple Street', 'San Jose', 'Utah', 'USA', 32000, 8.15287600, 99.99999999),
('61bfc784-ca96-498d-931d-8baeebf86584', 'Charlotte', '208 Second Street', 'Columbus', 'Ohio', 'USA', 36000, -44.44376200, -99.99999999),
('7634c9fe-2142-41a6-843e-ae8a8d64c301', 'Alexander', '664 Maple Street', 'Indianapolis', 'Delaware', 'USA', 38000, 35.28966400, 7.06325500),
('794b3927-0abf-46dd-9884-cf31bc4133bc', 'Emma', '607 Fourth Street', 'Jacksonville', 'Colorado', 'USA', 30000, 0.50558900, -99.99999999),
('7ae50e01-1506-4c4e-9822-e3632e728a7e', 'new3', 'fjkdnji', 'mohali', 'chandigarh', 'India', 20000, 30.67673540, 76.74862140),
('7b10ae3f-5ff8-4d91-9414-77b3f19e78d8', 'Abigail', '996 Oak Street', 'Chicago', 'New Mexico', 'USA', 28000, 44.32130800, -3.72390300),
('7c08d205-9eb4-4e9f-9c17-fcd241b6fa83', 'new', 'fjdknmji', 'chandigarh', 'chandigarh', 'India', 20000, 30.73344210, 76.77971430),
('92240d37-8664-46af-b4df-89cdea7fdb80', 'new2', 'edsnko', 'mohali', 'punjab', 'India', 20000, 30.45076400, 76.04841470),
('a67d4150-78ce-41d8-a321-3853c15440fe', 'Evelyn', '1170 Lincoln Street', 'San Diego', 'Wyoming', 'USA', 37000, -83.31484000, 11.76807100),
('aa7117a7-bfe2-4479-af2f-ce90416811b6', 'Emily', '626 Main Street', 'Phoenix', 'Mississippi', 'USA', 28000, -77.16213000, -92.08482400),
('af8bc114-d4dc-4a56-95df-e5b7e8db86ab', 'Ava', '1197 First Street', 'Fort Worth', 'Rhode Island', 'USA', 27000, -81.19483300, -87.94815800),
('c8ccd890-6371-4cb6-8eb6-8c7c22b79601', 'Ethan', '466 Pine Street', 'San Antonio', 'Louisiana', 'USA', 33000, 74.07491800, -25.31270300),
('cea62a67-b35e-4225-ac8e-a48e3a7543ac', 'Sophia', '1642 Ninth Street', 'Washington', 'Alabama', 'USA', 42000, 45.28936600, 46.83266400),
('d92d611c-47df-4974-bbbf-216be81e8fbf', 'Isabella', '1964 Oak Street', 'New York', 'Utah', 'USA', 31000, 41.33132400, 99.99999999),
('da9b9fc5-1f86-4990-b539-9e84186ec480', 'Logan', '907 Seventh Street', 'Columbus', 'Arkansas', 'USA', 31000, -64.84651600, 99.99999999),
('dbc6d539-a73a-4984-848c-0b301bfed7a3', 'Michael', '385 Fifth Street', 'Houston', 'Alabama', 'USA', 35000, 22.81546800, 99.99999999),
('e4188c74-45d1-4168-9a8b-294e88df2638', 'Avery', '1125 First Street', 'Columbus', 'Iowa', 'USA', 25000, 12.78912700, 85.79259800),
('f9c0adf4-6958-4d20-8c4c-f9d251737caf', 'Noah', '1413 Maple Street', 'New York', 'North Dakota', 'USA', 40000, -25.03770000, -99.99999999);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `employee`
--
ALTER TABLE `employee`
  ADD PRIMARY KEY (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
