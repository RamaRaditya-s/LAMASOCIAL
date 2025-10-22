import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Return simple static data
    const posts = [
      {
        id: '1',
        content: 'First post from database!',
        image_url: '/dummycover.png',
        created_at: new Date().toISOString(),
        username: 'john_doe',
        avatar: '/noAvatar.png',
        name: 'John',
        surname: 'Doe',
        like_count: 5,
        comment_count: 2
      },
      {
        id: '2',
        content: 'Second post from database!',
        image_url: null,
        created_at: new Date().toISOString(),
        username: 'jane_doe',
        avatar: '/noAvatar.png',
        name: 'Jane',
        surname: 'Doe',
        like_count: 3,
        comment_count: 1
      }
    ];

    return NextResponse.json(posts);
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json([], { status: 200 }); // Fallback to empty array
  }
}