import { NextResponse } from 'next/server';
import { query } from '@/lib/db';

export async function GET() {
  try {
    // Get all stats in parallel
    const [
      totalUsersResult,
      totalPostsResult,
      totalCommentsResult,
      totalReportsResult
    ] = await Promise.all([
      query('SELECT COUNT(*) as count FROM users'),
      query('SELECT COUNT(*) as count FROM posts'),
      query('SELECT COUNT(*) as count FROM comments'),
      // Untuk reports, jika belum ada tabel reports, kita bisa skip dulu
      query('SELECT COUNT(*) as count FROM reports').catch(() => [{ count: 0 }])
    ]);

    const stats = {
      totalUsers: (totalUsersResult as any[])[0].count,
      totalPosts: (totalPostsResult as any[])[0].count,
      totalComments: (totalCommentsResult as any[])[0].count,
      totalReports: (totalReportsResult as any[])[0].count,
    };

    return NextResponse.json(stats);
  } catch (error) {
    console.error('Error fetching admin stats:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}