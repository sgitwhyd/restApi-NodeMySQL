-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Feb 10, 2021 at 02:58 PM
-- Server version: 10.4.14-MariaDB
-- PHP Version: 7.2.33

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `crud`
--

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `image` varchar(255) DEFAULT NULL,
  `imagePath` varchar(255) DEFAULT 'https://placekitten.com/320/320',
  `role` varchar(255) NOT NULL DEFAULT 'user',
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `image`, `imagePath`, `role`, `name`, `email`, `password`, `createdAt`, `updatedAt`) VALUES
(1, 'profile-1612964955835.jpg', 'http://localhost:4000/public\\uploads\\profile-1612964955835.jpg', 'user', 'Sigit Wahyudi', 'sigitw@gmail.com', '$2b$10$LMnay625M7DLObfQh9FUqehRLU7LalTF3WEj2GWNKaOlck9pDKJly', '2021-02-10 08:53:07', '2021-02-10 13:49:15'),
(2, 'profile-1612965110345.jpg', 'http://localhost:4000/public\\uploads\\profile-1612965110345.jpg', 'user', 'Sigit Wahyudi', 'sigit@gmail.com', '$2b$10$S/aEieDOmbgg6jOtiE06iuGGg9u/LqPvVF7gMpt2uA5niQy7cMj1m', '2021-02-10 08:53:48', '2021-02-10 13:51:50');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `password` (`password`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
