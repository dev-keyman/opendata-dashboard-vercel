import Link from 'next/link';
import Button from '@/components/ui/Button';
import { signOut } from '@/auth';

export const metadata = {
  title: '접근 거부',
};

export default function AccessDeniedPage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center gap-6 p-8 bg-gray-50">
      <div className="bg-white rounded-xl shadow-md p-10 flex flex-col items-center gap-4 w-full max-w-md text-center">
        <div className="text-5xl">🚫</div>
        <h1 className="text-2xl font-bold text-red-600">접근이 거부되었습니다</h1>
        <p className="text-gray-600 text-sm leading-relaxed">
          이 서비스는 허가된 사용자만 이용할 수 있습니다.
          <br />
          접근 권한이 필요하시면 관리자에게 문의하세요.
        </p>
        <div className="flex flex-col gap-3 w-full mt-2">
          <form
            action={async () => {
              'use server';
              await signOut({ redirectTo: '/login' });
            }}
          >
            <Button type="submit" variant="outline" className="w-full">
              다른 계정으로 로그인
            </Button>
          </form>
          <Link href="/login">
            <Button variant="secondary" className="w-full">
              로그인 페이지로 이동
            </Button>
          </Link>
        </div>
      </div>
    </main>
  );
}
