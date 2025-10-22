const mysql = require('mysql2/promise');

async function testPosts() {
  try {
    const connection = await mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: '',
      database: 'social_media'
    });

    console.log('✅ Connected to database');

    // Test users table
    const users = await connection.execute('SELECT * FROM users LIMIT 5');
    console.log('📊 Users:', users[0].length);

    // Test posts table
    const posts = await connection.execute('SELECT * FROM posts LIMIT 5');
    console.log('📝 Posts:', posts[0].length);

    // Test our query
    const testQuery = await connection.execute(`
      SELECT 
        p.id,
        p.content,
        p.image_url,
        p.video_url,
        p.created_at,
        u.id as user_id,
        u.username,
        u.avatar,
        u.name,
        u.surname,
        (SELECT COUNT(*) FROM likes l WHERE l.post_id = p.id) as like_count,
        (SELECT COUNT(*) FROM comments c WHERE c.post_id = p.id) as comment_count
      FROM posts p
      JOIN users u ON p.user_id = u.id
      ORDER BY p.created_at DESC
    `);
    console.log('🔍 Test query result:', testQuery[0].length, 'posts');

    await connection.end();
    
  } catch (error) {
    console.error('❌ Database error:', error.message);
    console.log('💡 Check if:');
    console.log('   - Database "social_media" exists');
    console.log('   - Tables "users" and "posts" exist');
    console.log('   - There is data in the tables');
  }
}

testPosts();