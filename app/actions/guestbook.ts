'use server';

import { auth } from '@/auth';
import { revalidatePath } from 'next/cache';
import { getDb } from '@/lib/db';
import { z } from 'zod';

const PostSchema = z.object({
  content: z.string().min(1, '내용을 입력해주세요.').max(500, '500자 이내로 입력해주세요.'),
});

export async function createPost(formData: FormData) {
  const session = await auth();
  if (!session?.user?.email) throw new Error('인증이 필요합니다.');

  const parsed = PostSchema.safeParse({ content: formData.get('content') });
  if (!parsed.success) throw new Error(parsed.error.issues[0].message);

  const db = getDb();
  await db.execute({
    sql: 'INSERT INTO guestbook (author_email, author_name, content) VALUES (?, ?, ?)',
    args: [
      session.user.email,
      session.user.name ?? session.user.email,
      parsed.data.content,
    ],
  });

  revalidatePath('/dashboard/guestbook');
}

export async function deletePost(postId: number) {
  const session = await auth();
  if (!session?.user?.email) throw new Error('인증이 필요합니다.');

  const db = getDb();
  const result = await db.execute({
    sql: 'SELECT id FROM guestbook WHERE id = ? AND author_email = ?',
    args: [postId, session.user.email],
  });

  if (result.rows.length === 0) throw new Error('삭제 권한이 없습니다.');

  await db.execute({ sql: 'DELETE FROM guestbook WHERE id = ?', args: [postId] });
  revalidatePath('/dashboard/guestbook');
}
