import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import { checkAndResetFirstLogin } from '@/lib/auth-utils';

export default async function HomePage() {
  const session = await auth();
  if (!session?.user?.email) {
    redirect('/login');
  }

  const isFirstLogin = await checkAndResetFirstLogin(session.user.email);
  if (isFirstLogin) {
    redirect('/welcome');
  }

  redirect('/dashboard');
}
