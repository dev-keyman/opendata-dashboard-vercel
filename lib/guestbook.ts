import { getDb } from './db';
import type { GuestbookPost, PaginatedResponse } from '@/types';

const PAGE_SIZE = 10;

export async function getGuestbookPosts(page: number): Promise<PaginatedResponse<GuestbookPost>> {
  const db = getDb();
  const offset = (page - 1) * PAGE_SIZE;

  const countResult = await db.execute('SELECT COUNT(*) as total FROM guestbook');
  const total = Number(countResult.rows[0].total);

  const postsResult = await db.execute({
    sql: 'SELECT id, author_email, author_name, content, created_at FROM guestbook ORDER BY created_at DESC LIMIT ? OFFSET ?',
    args: [PAGE_SIZE, offset],
  });

  return {
    data: postsResult.rows as unknown as GuestbookPost[],
    pagination: {
      page,
      pageSize: PAGE_SIZE,
      total,
      totalPages: Math.ceil(total / PAGE_SIZE),
    },
  };
}
