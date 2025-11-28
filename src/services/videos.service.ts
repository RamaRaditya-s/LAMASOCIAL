import { createConnection } from "@/lib/db";
import type { Video } from "@/types/videos";

export interface GetVideosParams {
  page?: number;
  limit?: number;
  sort?: "created_at" | "title" | "views";
  order?: "ASC" | "DESC";
}

export async function getVideosService({
  page = 1,
  limit = 10,
  sort = "created_at",
  order = "DESC",
}: GetVideosParams) {
  const offset = (page - 1) * limit;
  const db = await createConnection();

  const [rows] = await db.query(
    `
      SELECT 
        v.id, v.title, v.url, v.thumb, v.uploader,
        v.views, v.duration, v.created_at
      FROM videos v
      ORDER BY ${sort} ${order}
      LIMIT ? OFFSET ?
    `,
    [limit, offset]
  ) as [Video[], any];

  const [[{ total }]] = await db.query(
    "SELECT COUNT(*) AS total FROM videos"
  ) as [{ total: number }[], any];

  return {
    data: rows,
    pagination: {
      page,
      limit,
      total,
      pages: Math.ceil(total / limit),
    },
  };
}

export async function getVideoByIdService(id: number) {
  const db = await createConnection();

  const [rows] = await db.query(
    `
      SELECT 
        id, title, url, thumb, uploader,
        views, duration, created_at
      FROM videos WHERE id = ?
    `,
    [id]
  ) as [Video[], any];

  return rows.length > 0 ? rows[0] : null;
}
