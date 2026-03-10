import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4">
      <h2 className="text-4xl font-bold">404</h2>
      <p className="text-gray-600">페이지를 찾을 수 없습니다.</p>
      <Link
        href="/"
        className="px-4 py-2 bg-primary-500 text-white rounded-md hover:bg-primary-600"
      >
        홈으로 돌아가기
      </Link>
    </div>
  );
}
