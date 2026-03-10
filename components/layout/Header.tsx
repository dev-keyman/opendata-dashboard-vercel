import Link from 'next/link';
import { auth, signOut } from '@/auth';

const navItems = [
  { label: '홈', href: '/' },
  { label: '대시보드', href: '/dashboard' },
];

export default async function Header() {
  const session = await auth();

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="text-xl font-bold text-primary-500">
            Open Data
          </Link>
          <nav className="flex items-center gap-6">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-gray-600 hover:text-primary-500 transition-colors"
              >
                {item.label}
              </Link>
            ))}
            {session?.user && (
              <div className="flex items-center gap-3 border-l pl-6 ml-2">
                <span className="text-sm text-gray-500 hidden sm:block">
                  {session.user.email}
                </span>
                <form
                  action={async () => {
                    'use server';
                    await signOut({ redirectTo: '/login' });
                  }}
                >
                  <button
                    type="submit"
                    className="text-sm text-red-500 hover:text-red-700 transition-colors"
                  >
                    로그아웃
                  </button>
                </form>
              </div>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
}
