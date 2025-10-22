const mysql = require('mysql2/promise');

async function insertSampleData() {
  const connection = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'social_media'
  });

  try {
    // Insert sample user
    await connection.execute(`
      INSERT INTO users (id, username, name, surname, email, avatar) 
      VALUES (UUID(), 'john_doe', 'John', 'Doe', 'john@example.com', '/noAvatar.png')
      ON DUPLICATE KEY UPDATE username=username
    `);

    // Get the user ID
    const [users] = await connection.execute('SELECT id FROM users WHERE username = "john_doe"');
    const userId = users[0].id;

    // Insert sample posts
    await connection.execute(`
      INSERT INTO posts (id, user_id, content, image_url) 
      VALUES 
        (UUID(), ?, 'Welcome to my social media! This is my first post 🎉', '/dummycover.png'),
        (UUID(), ?, 'Beautiful day today! ☀️ #sunny', NULL),
        (UUID(), ?, 'Just finished working on this awesome project! 💻', NULL)
    `, [userId, userId, userId]);

    console.log('✅ Sample data inserted successfully!');
    
  } catch (error) {
    console.error('❌ Error inserting sample data:', error.message);
  } finally {
    await connection.end();
  }
}

insertSampleData();