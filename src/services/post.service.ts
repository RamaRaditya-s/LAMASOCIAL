import { Post } from "@/types/post";

export const getPost = async(limit: number, offset: number): Promise<Post[]> => {
  // Implementation to retrieve posts by user ID
  const db =  await createConnection();
  const sql = 'SELECT id, title, content FROM posts LIMIT ? OFFSET ?';
  const [posts] = await db.query(sql, [limit, offset]);
  return posts.map((post: any) => ({
    id: post.id,
    userId: post.userId,
    title: post.title,
    content: post.content,
    createdAt: new Date(post.createdAt),
    updatedAt: new Date(post.updatedAt),
  }));
}

export function createPost(userId: string, content: string) {
  // Implementation to create a new post for a user
}

export function deletePost(postId: string) {
  // Implementation to delete a post by its ID
}