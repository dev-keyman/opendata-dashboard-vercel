import { getDb } from './db';

export async function isUserAllowed(email: string): Promise<boolean> {
  const db = getDb();
  const result = await db.execute({
    sql: 'SELECT id FROM allowed_users WHERE email = ? LIMIT 1',
    args: [email],
  });
  return result.rows.length > 0;
}

export async function autoRegisterUser(email: string, name: string): Promise<void> {
  const db = getDb();
  await db.execute({
    sql: 'INSERT OR IGNORE INTO allowed_users (email, name) VALUES (?, ?)',
    args: [email, name],
  });
}
