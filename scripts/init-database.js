const mysql = require('mysql2/promise');
require('dotenv').config({ path: '.env.local' });

async function initializeDatabase() {
  let connection;
  
  try {
    // Connect to MySQL without selecting database
    connection = await mysql.createConnection({
      host: process.env.DB_HOST || 'localhost',
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || '',
    });

    console.log('✅ Connected to MySQL server');

    // Create database
    await connection.execute(
      `CREATE DATABASE IF NOT EXISTS \`${process.env.DB_NAME || 'social_media'}\``
    );
    console.log(`✅ Database ${process.env.DB_NAME || 'social_media'} created or already exists`);

    // Use the database
    await connection.execute(`USE \`${process.env.DB_NAME || 'social_media'}\``);

    // Create users table
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS users (
        id VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
        clerk_user_id VARCHAR(255) UNIQUE,
        username VARCHAR(50) UNIQUE NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        name VARCHAR(100) NOT NULL,
        surname VARCHAR(100) NOT NULL,
        avatar VARCHAR(500) DEFAULT '/default-avatar.png',
        cover VARCHAR(500) DEFAULT '/default-cover.png',
        bio TEXT,
        website VARCHAR(255),
        location VARCHAR(100),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `);
    console.log('✅ Users table created');

    // Create posts table
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS posts (
        id VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
        user_id VARCHAR(36) NOT NULL,
        content TEXT NOT NULL,
        image_url VARCHAR(500),
        video_url VARCHAR(500),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
        INDEX idx_user_created (user_id, created_at)
      )
    `);
    console.log('✅ Posts table created');

    // Create followers table
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS followers (
        id VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
        follower_id VARCHAR(36) NOT NULL,
        following_id VARCHAR(36) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (follower_id) REFERENCES users(id) ON DELETE CASCADE,
        FOREIGN KEY (following_id) REFERENCES users(id) ON DELETE CASCADE,
        UNIQUE KEY unique_follow (follower_id, following_id)
      )
    `);
    console.log('✅ Followers table created');

    // Create stories table
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS stories (
        id VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
        user_id VARCHAR(36) NOT NULL,
        image_url VARCHAR(500),
        video_url VARCHAR(500),
        text_content VARCHAR(500),
        background_color VARCHAR(50) DEFAULT '#000000',
        text_color VARCHAR(50) DEFAULT '#FFFFFF',
        expires_at TIMESTAMP NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
        INDEX idx_expires (expires_at)
      )
    `);
    console.log('✅ Stories table created');

    // Create comments table
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS comments (
        id VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
        post_id VARCHAR(36) NOT NULL,
        user_id VARCHAR(36) NOT NULL,
        content TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (post_id) REFERENCES posts(id) ON DELETE CASCADE,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
      )
    `);
    console.log('✅ Comments table created');

    // Create likes table
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS likes (
        id VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
        post_id VARCHAR(36) NOT NULL,
        user_id VARCHAR(36) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (post_id) REFERENCES posts(id) ON DELETE CASCADE,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
        UNIQUE KEY unique_like (post_id, user_id)
      )
    `);
    console.log('✅ Likes table created');

    console.log('🎉 Database initialization completed successfully!');

  } catch (error) {
    console.error('❌ Error initializing database:', error);
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}

initializeDatabase();