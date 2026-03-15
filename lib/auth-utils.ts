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
    sql: 'INSERT OR IGNORE INTO allowed_users (email, name, first_login) VALUES (?, ?, 1)',
    args: [email, name],
  });
}

/**
 * 신규 사용자 여부 확인 및 플래그 초기화 (한 번만 true 반환)
 */
export async function checkAndResetFirstLogin(email: string): Promise<boolean> {
  const db = getDb();
  const result = await db.execute({
    sql: 'SELECT first_login FROM allowed_users WHERE email = ? LIMIT 1',
    args: [email],
  });
  if (result.rows.length === 0 || !result.rows[0].first_login) return false;

  await db.execute({
    sql: 'UPDATE allowed_users SET first_login = 0 WHERE email = ?',
    args: [email],
  });
  return true;
}
