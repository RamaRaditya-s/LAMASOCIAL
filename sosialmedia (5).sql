-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 28, 2025 at 10:25 AM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.0.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `sosialmedia`
--

-- --------------------------------------------------------

--
-- Table structure for table `ads`
--

CREATE TABLE `ads` (
  `id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `logo` varchar(255) DEFAULT NULL,
  `button_text` varchar(100) DEFAULT NULL,
  `size` enum('sm','md','lg') DEFAULT 'md'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `ads`
--

INSERT INTO `ads` (`id`, `title`, `description`, `image`, `logo`, `button_text`, `size`) VALUES
(1, 'BigChef Lounge', 'Nikmati makanan terbaik dengan resep rahasia BigChef!', 'https://images.pexels.com/photos/23193135/pexels-photo-23193135.jpeg?auto=compress&cs=tinysrgb&w=800&lazy=load', 'https://images.pexels.com/photos/23193135/pexels-photo-23193135.jpeg?auto=compress&cs=tinysrgb&w=800&lazy=load', 'Learn more', 'lg'),
(2, 'TechZone Pro', 'Dapatkan promo gadget terbaru bulan ini!', 'https://images.pexels.com/photos/248528/pexels-photo-248528.jpeg', 'https://images.pexels.com/photos/23193135/pexels-photo-23193135.jpeg?auto=compress&cs=tinysrgb&w=800&lazy=load', 'Check now', 'md'),
(3, 'HealthyLife', 'Mulai hidup sehat dengan produk kami!', 'https://images.pexels.com/photos/4174773/pexels-photo-4174773.jpeg', 'https://images.pexels.com/photos/1351238/pexels-photo-1351238.jpeg', 'Explore', 'sm');

-- --------------------------------------------------------

--
-- Table structure for table `events`
--

CREATE TABLE `events` (
  `id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `date` datetime NOT NULL,
  `location` varchar(255) DEFAULT NULL,
  `cover` varchar(255) DEFAULT NULL,
  `category` varchar(100) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `attendees` int(11) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `events`
--

INSERT INTO `events` (`id`, `title`, `date`, `location`, `cover`, `category`, `description`, `attendees`) VALUES
(1, 'EVENT 1', '2025-10-12 18:00:00', 'Taman Sari, Yogyakarta', '/dummyCover.png', 'Festival', 'Event nonton film bersama di bioskop', 128),
(2, 'EVENT 2', '2025-11-05 13:00:00', 'Online Event', '/dummyCover.png', 'Technology', 'Event online tentang teknologi', 210),
(3, 'EVENT 3', '2025-09-30 06:00:00', 'GBK Senayan, Jakarta', '/dummyCover.png', 'Sports', 'Event olahraga di GBK', 60);

-- --------------------------------------------------------

--
-- Table structure for table `feed_posts`
--

CREATE TABLE `feed_posts` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `text` text DEFAULT NULL,
  `avatar_url` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `feed_posts`
--

INSERT INTO `feed_posts` (`id`, `user_id`, `text`, `avatar_url`, `created_at`) VALUES
(1, 1, 'Just finished my workout!', 'https://images.pexels.com/photos/31442391/pexels-photo-31442391.jpeg', '2025-11-17 10:31:54'),
(2, 2, 'Reading a great book today.', 'https://images.pexels.com/photos/31072029/pexels-photo-31072029.jpeg', '2025-11-17 10:31:54'),
(3, 3, 'Loving the new movie release!', 'https://images.pexels.com/photos/863807/pexels-photo-863807.jpeg', '2025-11-17 10:31:54');

-- --------------------------------------------------------

--
-- Table structure for table `friendrequests`
--

CREATE TABLE `friendrequests` (
  `id` int(11) NOT NULL,
  `sender_id` int(11) NOT NULL,
  `sender_username` varchar(100) NOT NULL,
  `sender_name` varchar(100) NOT NULL,
  `sender_surname` varchar(100) NOT NULL,
  `sender_avatar` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `friendrequests`
--

INSERT INTO `friendrequests` (`id`, `sender_id`, `sender_username`, `sender_name`, `sender_surname`, `sender_avatar`) VALUES
(1, 2, 'janedoe', 'Jane', 'Doe', 'https://images.pexels.com/photos/27701137/pexels-photo-27701137.jpeg'),
(2, 3, 'michael', 'Michael', 'Smith', 'https://images.pexels.com/photos/27544962/pexels-photo-27544962.jpeg'),
(3, 4, 'linda', 'Linda', 'Johnson', 'https://images.pexels.com/photos/30361918/pexels-photo-30361918.jpeg');

-- --------------------------------------------------------

--
-- Table structure for table `friends`
--

CREATE TABLE `friends` (
  `id` int(11) NOT NULL,
  `name` varchar(100) DEFAULT NULL,
  `username` varchar(100) DEFAULT NULL,
  `avatar_url` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `friends`
--

INSERT INTO `friends` (`id`, `name`, `username`, `avatar_url`) VALUES
(1, 'Alex Morgan', 'alexm', 'https://images.pexels.com/photos/29531015/pexels-photo-29531015.jpeg'),
(2, 'Sarah Kim', 'sarahk', 'https://images.pexels.com/photos/34232651/pexels-photo-34232651.jpeg'),
(3, 'Leonardo', 'leoc', 'https://images.pexels.com/photos/32798644/pexels-photo-32798644.jpeg'),
(4, 'Nadia Putri', 'nadiap', 'https://images.pexels.com/photos/33438441/pexels-photo-33438441.jpeg'),
(5, 'Michael Chen', 'mikec', 'https://images.pexels.com/photos/34594456/pexels-photo-34594456.jpeg');

-- --------------------------------------------------------

--
-- Table structure for table `lists`
--

CREATE TABLE `lists` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `cover` varchar(255) DEFAULT '/noCover.png',
  `privacy` enum('Private','Public') DEFAULT 'Private',
  `updated_at` date DEFAULT curdate()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `lists`
--

INSERT INTO `lists` (`id`, `name`, `cover`, `privacy`, `updated_at`) VALUES
(1, 'Inspiration Board', '/dummyCover.png', 'Private', '2025-09-22'),
(2, 'Watch Later', '/dummyCover.png', 'Public', '2025-09-20'),
(3, 'Product Ideas', '/dummyCover.png', 'Private', '2025-09-18');

-- --------------------------------------------------------

--
-- Table structure for table `list_items`
--

CREATE TABLE `list_items` (
  `id` int(11) NOT NULL,
  `list_id` int(11) DEFAULT NULL,
  `type` enum('video','photo','post') NOT NULL,
  `title` varchar(255) DEFAULT NULL,
  `thumb` varchar(255) DEFAULT '/noCover.png',
  `meta` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `list_items`
--

INSERT INTO `list_items` (`id`, `list_id`, `type`, `title`, `thumb`, `meta`) VALUES
(1, 1, 'photo', 'Bali Sunrise', '/dummyCover.png', 'photo • 12 likes'),
(2, 1, 'video', 'Cinematic Travel Vlog', '/dummyCover.png', 'video • 1:24'),
(3, 1, 'post', 'UI/UX tips', '/dummyCover.png', 'post • 5 comments'),
(4, 2, 'video', 'Quick Home Workout', '/dummyCover.png', 'video • 6:10'),
(5, 2, 'video', 'Easy Recipes', '/dummyCover.png', 'video • 3:40'),
(6, 2, 'photo', 'Street Food', '/dummyCover.png', 'photo • 30 saves'),
(7, 3, 'post', 'Market analysis', '/dummyCover.png', 'post • 2 comments'),
(8, 3, 'photo', 'Packaging mockup', '/dummyCover.png', 'photo • 4 likes');

-- --------------------------------------------------------

--
-- Table structure for table `posts`
--

CREATE TABLE `posts` (
  `id` int(11) NOT NULL,
  `user_name` varchar(100) DEFAULT 'Guest User',
  `user_avatar` varchar(255) DEFAULT '/noAvatar.png',
  `image_url` varchar(255) DEFAULT '/dummycover.png',
  `description` text DEFAULT 'This is a sample post description.',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `posts`
--

INSERT INTO `posts` (`id`, `user_name`, `user_avatar`, `image_url`, `description`, `created_at`) VALUES
(1, 'Elana Helen', 'https://images.pexels.com/photos/1674752/pexels-photo-1674752.jpeg', '/dummycover.png', 'This is a sample post description.', '2025-11-07 09:52:06'),
(2, 'Guest User', 'https://images.pexels.com/photos/1462980/pexels-photo-1462980.jpeg', '/post1.png', 'This is a sample post description.', '2025-11-07 09:52:06'),
(3, 'Guest User', 'https://images.pexels.com/photos/1435517/pexels-photo-1435517.jpeg', '/post2.png', 'This is a sample post description.', '2025-11-07 09:52:06');

-- --------------------------------------------------------

--
-- Table structure for table `stories`
--

CREATE TABLE `stories` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `media` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `stories`
--

INSERT INTO `stories` (`id`, `user_id`, `media`, `created_at`) VALUES
(1, 1, 'https://images.pexels.com/photos/34364451/pexels-photo-34364451.jpeg', '2025-11-14 09:53:50'),
(2, 1, 'https://images.pexels.com/photos/34646379/pexels-photo-34646379.jpeg', '2025-11-14 09:53:50'),
(3, 1, 'https://images.pexels.com/photos/34158115/pexels-photo-34158115.jpeg', '2025-11-14 09:53:50'),
(4, 1, 'https://images.pexels.com/photos/34879476/pexels-photo-34879476.jpeg', '2025-11-14 09:53:50'),
(5, 1, 'https://images.pexels.com/photos/34732843/pexels-photo-34732843.jpeg', '2025-11-17 10:31:09'),
(6, 2, 'https://images.pexels.com/photos/34796719/pexels-photo-34796719.jpeg', '2025-11-17 10:31:09'),
(7, 3, 'https://images.pexels.com/photos/32682179/pexels-photo-32682179.png', '2025-11-17 10:31:09'),
(8, 1, 'https://images.pexels.com/photos/29531015/pexels-photo-29531015.jpeg', '2025-11-17 10:31:09');

-- --------------------------------------------------------

--
-- Table structure for table `suggestions`
--

CREATE TABLE `suggestions` (
  `id` int(11) NOT NULL,
  `name` varchar(100) DEFAULT NULL,
  `username` varchar(100) DEFAULT NULL,
  `avatar_url` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `suggestions`
--

INSERT INTO `suggestions` (`id`, `name`, `username`, `avatar_url`) VALUES
(1, 'Akira Tanaka', 'akira_tn', 'https://images.pexels.com/photos/34822465/pexels-photo-34822465.jpeg'),
(2, 'Mira Zahra', 'miraz', 'https://images.pexels.com/photos/29531042/pexels-photo-29531042.jpeg'),
(3, 'Daniel Lee', 'danlee', 'https://images.pexels.com/photos/34795919/pexels-photo-34795919.jpeg');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(100) DEFAULT NULL,
  `avatar_url` varchar(255) DEFAULT NULL,
  `name` varchar(100) DEFAULT NULL,
  `surname` varchar(100) DEFAULT NULL,
  `birthday` date DEFAULT NULL,
  `cover_url` varchar(255) DEFAULT NULL,
  `posts_count` int(11) DEFAULT 0,
  `followers_count` int(11) DEFAULT 0,
  `followings_count` int(11) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `avatar_url`, `name`, `surname`, `birthday`, `cover_url`, `posts_count`, `followers_count`, `followings_count`) VALUES
(1, 'john_doe', '/dummyCover.png', 'John', 'Doe', '1999-11-20', '/dummyCover.png', 12, 340, 180),
(2, 'ramarama', '/dummyCover.png', 'Rama', 'Raditya', '2002-01-05', '/dummyCover.png', 5, 110, 80),
(3, 'Senku', '/dummyCover.png', 'Senku', 'Ishigami', '2005-03-14', '/dummyCover.png', 3, 95, 60),
(4, 'johnd', '/dummyCover.png', 'John', 'Doe', '1998-11-21', '/dummyCover.png', 12, 340, 180);

-- --------------------------------------------------------

--
-- Table structure for table `user_media`
--

CREATE TABLE `user_media` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `image_url` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user_media`
--

INSERT INTO `user_media` (`id`, `user_id`, `image_url`, `created_at`) VALUES
(1, 1, '/dummycover.png', '2025-11-12 10:22:24'),
(2, 1, '/post1.png', '2025-11-12 10:22:24'),
(3, 1, '/post2.png', '2025-11-12 10:22:24'),
(4, 1, '/post3.png', '2025-11-12 10:22:24');

-- --------------------------------------------------------

--
-- Table structure for table `videos`
--

CREATE TABLE `videos` (
  `id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `url` varchar(255) NOT NULL,
  `thumb` varchar(255) DEFAULT NULL,
  `uploader` varchar(100) DEFAULT NULL,
  `views` int(11) DEFAULT 0,
  `duration` varchar(20) DEFAULT NULL,
  `created_at` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `videos`
--

INSERT INTO `videos` (`id`, `title`, `url`, `thumb`, `uploader`, `views`, `duration`, `created_at`) VALUES
(1, 'PELATIHAN Anak Anjing - 5 Hal PERTAMA yang Harus Diajarkan pada Anak Anjing!', 'https://images.pexels.com/photos/31429867/pexels-photo-31429867.jpeg', 'https://images.pexels.com/photos/28830818/pexels-photo-28830818.jpeg', 'Jon Devis Dog Training', 980, '15:30', '2025-11-14 16:04:17'),
(2, 'Cara Memulai Pemasaran Media Sosial untuk Pemula di Tahun 2025 dengan $0', 'https://images.pexels.com/photos/29404650/pexels-photo-29404650.jpeg', 'https://images.pexels.com/photos/147413/twitter-facebook-together-exchange-of-information-147413.jpeg', 'Kallaway', 650, '08:15', '2025-11-14 16:04:17'),
(3, 'Bagaimana Sebenarnya Pasar Saham Bekerja?', 'https://images.pexels.com/photos/33689666/pexels-photo-33689666.jpeg', 'https://images.pexels.com/photos/8369835/pexels-photo-8369835.jpeg', 'Mc Invest', 5230, '22:45', '2025-11-14 16:04:17');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `ads`
--
ALTER TABLE `ads`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `events`
--
ALTER TABLE `events`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `feed_posts`
--
ALTER TABLE `feed_posts`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `friendrequests`
--
ALTER TABLE `friendrequests`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `friends`
--
ALTER TABLE `friends`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `lists`
--
ALTER TABLE `lists`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `list_items`
--
ALTER TABLE `list_items`
  ADD PRIMARY KEY (`id`),
  ADD KEY `list_id` (`list_id`);

--
-- Indexes for table `posts`
--
ALTER TABLE `posts`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `stories`
--
ALTER TABLE `stories`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `suggestions`
--
ALTER TABLE `suggestions`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user_media`
--
ALTER TABLE `user_media`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `videos`
--
ALTER TABLE `videos`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `ads`
--
ALTER TABLE `ads`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `events`
--
ALTER TABLE `events`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `feed_posts`
--
ALTER TABLE `feed_posts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `friendrequests`
--
ALTER TABLE `friendrequests`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `friends`
--
ALTER TABLE `friends`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `lists`
--
ALTER TABLE `lists`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `list_items`
--
ALTER TABLE `list_items`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `posts`
--
ALTER TABLE `posts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `stories`
--
ALTER TABLE `stories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `suggestions`
--
ALTER TABLE `suggestions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `user_media`
--
ALTER TABLE `user_media`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `videos`
--
ALTER TABLE `videos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `feed_posts`
--
ALTER TABLE `feed_posts`
  ADD CONSTRAINT `feed_posts_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `list_items`
--
ALTER TABLE `list_items`
  ADD CONSTRAINT `list_items_ibfk_1` FOREIGN KEY (`list_id`) REFERENCES `lists` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `stories`
--
ALTER TABLE `stories`
  ADD CONSTRAINT `stories_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

--
-- Constraints for table `user_media`
--
ALTER TABLE `user_media`
  ADD CONSTRAINT `user_media_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
