import { signIn } from '@/auth';
import Button from '@/components/ui/Button';

export const metadata = {
  title: '로그인',
};

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-8 gap-6 bg-gray-50">
      <div className="bg-white rounded-xl shadow-md p-10 flex flex-col items-center gap-6 w-full max-w-sm">
        <h1 className="text-2xl font-bold text-gray-900 text-center">서울 아파트 매매 실거래가 대시보드</h1>
        <p className="text-sm text-gray-500 text-center">
          서비스를 이용하려면 Google 계정으로 로그인하세요.
        </p>
        <div className="w-full bg-blue-50 border border-blue-100 rounded-md px-4 py-3 text-sm text-blue-600 text-center">
          처음 로그인하시면 자동으로 회원가입이 완료됩니다.
        </div>

        {error && (
          <div className="w-full bg-red-50 border border-red-200 rounded-md px-4 py-3 text-sm text-red-600 text-center">
            로그인에 실패했습니다. 접근 권한이 없거나 승인되지 않은 계정입니다.
          </div>
        )}

        <form
          className="w-full"
          action={async () => {
            'use server';
            await signIn('google', { redirectTo: '/' });
          }}
        >
          <Button type="submit" size="lg" className="w-full flex items-center justify-center gap-2">
            Google 계정으로 로그인
          </Button>
        </form>
      </div>
    </main>
  );
}
