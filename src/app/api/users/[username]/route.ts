import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';

export async function GET(
  request: NextRequest,
  { params }: { params: { username: string } }
) {
  try {
    const { username } = params;

    // Get user basic info
    const userResult = await query(
      `SELECT id, username, name, surname, avatar, cover, bio, website, location 
       FROM users WHERE username = ?`,
      [username]
    );

    const users = userResult as any[];
    if (users.length === 0) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const userData = users[0];

    // Get counts from database
    const [postCount, followerCount, followingCount] = await Promise.all([
      query('SELECT COUNT(*) as count FROM posts WHERE user_id = ?', [userData.id]),
      query('SELECT COUNT(*) as count FROM followers WHERE following_id = ?', [userData.id]),
      query('SELECT COUNT(*) as count FROM followers WHERE follower_id = ?', [userData.id])
    ]);

    const responseData = {
      ...userData,
      _count: {
        posts: (postCount as any[])[0].count,
        followers: (followerCount as any[])[0].count,
        followings: (followingCount as any[])[0].count
      }
    };

    return NextResponse.json(responseData);
  } catch (error) {
    console.error('Error fetching user:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}