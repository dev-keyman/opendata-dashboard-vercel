import { getDb } from './db';

export async function isUserAllowed(email: string): Promise<boolean> {
  const db = getDb();
  const result = await db.execute({
    sql: 'SELECT id FROM allowed_users WHERE email = ? LIMIT 1',
    args: [email],
  });
  return result.rows.length > 0;
}
