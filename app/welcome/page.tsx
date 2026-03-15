import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import Button from '@/components/ui/Button';

export const metadata = {
  title: '회원가입 완료',
};

export default async function WelcomePage() {
  const session = await auth();
  if (!session) redirect('/login');

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-8 bg-gray-50">
      <div className="bg-white rounded-xl shadow-md p-10 flex flex-col items-center gap-6 w-full max-w-md text-center">
        <div className="text-6xl">🎉</div>
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">회원가입이 완료되었습니다!</h1>
          <p className="text-gray-500 text-sm leading-relaxed">
            <span className="font-medium text-primary-500">{session.user?.email}</span>
            <br />
            계정으로 서비스에 등록되었습니다.
          </p>
        </div>
        <Link href="/dashboard" className="w-full">
          <Button size="lg" className="w-full">
            대시보드로 이동
          </Button>
        </Link>
      </div>
    </main>
  );
}
