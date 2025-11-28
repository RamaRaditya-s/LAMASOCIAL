import { Post, CreatePostDTO } from "@/types/post";
import { createConnection } from "@/lib/db.js";

/**
 * GET POSTS (pagination + search + order)
 */
export const getPosts = async (
  limit: number,
  offset: number,
  search: string = ""
): Promise<Post[]> => {
  const db = await createConnection();

  let sql = `
    SELECT 
      id,
      user_name,
      user_avatar,
      image_url,
      description,
      created_at
    FROM posts
    WHERE 1 = 1
  `;

  const params: any[] = [];

  // Jika user melakukan search
  if (search) {
    sql += ` AND (user_name LIKE ? OR description LIKE ?)`;
    params.push(`%${search}%`, `%${search}%`);
  }

  sql += `
    ORDER BY created_at DESC
    LIMIT ? OFFSET ?
  `;

  params.push(limit, offset);

  const [rows] = await db.query(sql, params);

  return (rows as any[]).map((r) => ({
    id: Number(r.id),
    user_name: r.user_name,
    user_avatar: r.user_avatar,
    image_url: r.image_url,
    description: r.description,
    created_at: new Date(r.created_at),
  }));
};

/**
 * CREATE POST
 */
export async function createPost(data: CreatePostDTO) {
  const db = await createConnection();

  const sql = `
    INSERT INTO posts (user_name, user_avatar, image_url, description, created_at)
    VALUES (?, ?, ?, ?, NOW())
  `;

  await db.query(sql, [
    data.user_name || "Guest User",
    data.user_avatar || "/noAvatar.png",
    data.image_url ?? null,
    data.description ?? null,
  ]);
}

/**
 * DELETE POST
 */
export async function deletePost(postId: number) {
  const db = await createConnection();

  const sql = `
    DELETE FROM posts
    WHERE id = ?
  `;

  await db.query(sql, [postId]);
}
