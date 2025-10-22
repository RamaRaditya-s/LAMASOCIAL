import { NextResponse } from 'next/server';
import { query } from '@/lib/db';

export async function GET() {
  try {
    // Visitor data (contoh - bisa diganti dengan analytics real)
    const visitorData = await query(`
      SELECT 
        DATE_FORMAT(created_at, '%b') as month,
        COUNT(*) as visitors
      FROM users 
      WHERE created_at >= DATE_SUB(NOW(), INTERVAL 6 MONTH)
      GROUP BY DATE_FORMAT(created_at, '%Y-%m'), DATE_FORMAT(created_at, '%b')
      ORDER BY MIN(created_at)
      LIMIT 6
    `).catch(() => []);

    // Post activity (posts per day of week)
    const postActivity = await query(`
      SELECT 
        DAYNAME(created_at) as day,
        COUNT(*) as posts
      FROM posts 
      WHERE created_at >= DATE_SUB(NOW(), INTERVAL 7 DAY)
      GROUP BY DAYOFWEEK(created_at), DAYNAME(created_at)
      ORDER BY DAYOFWEEK(created_at)
    `).catch(() => []);

    // User growth (monthly)
    const userGrowth = await query(`
      SELECT 
        DATE_FORMAT(created_at, '%b') as month,
        COUNT(*) as users
      FROM users 
      WHERE created_at >= DATE_SUB(NOW(), INTERVAL 6 MONTH)
      GROUP BY DATE_FORMAT(created_at, '%Y-%m'), DATE_FORMAT(created_at, '%b')
      ORDER BY MIN(created_at)
      LIMIT 6
    `).catch(() => []);

    return NextResponse.json({
      visitors: visitorData,
      postActivity: postActivity,
      userGrowth: userGrowth
    });
  } catch (error) {
    console.error('Error fetching chart data:', error);
    return NextResponse.json({
      visitors: [],
      postActivity: [],
      userGrowth: []
    });
  }
}