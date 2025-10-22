const mysql = require('mysql2/promise');

async function testConnection() {
  try {
    const connection = await mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: '', // kosong untuk XAMPP
    });
    
    console.log('✅ Berhasil connect ke MySQL server!');
    
    // Cek databases yang ada
    const [databases] = await connection.execute('SHOW DATABASES');
    console.log('📊 Databases yang ada:', databases.map(db => db.Database));
    
    await connection.end();
    
  } catch (error) {
    console.error('❌ Gagal connect ke MySQL:', error.message);
    console.log('💡 Pastikan:');
    console.log('   - XAMPP MySQL sedang running');
    console.log('   - Port MySQL default (3306)');
    console.log('   - Username: root, Password: (kosong)');
  }
}

testConnection();