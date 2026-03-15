import { auth } from '@/auth';
import { getGuestbookPosts } from '@/lib/guestbook';
import GuestbookForm from '@/components/guestbook/GuestbookForm';
import GuestbookList from '@/components/guestbook/GuestbookList';

export const metadata = {
  title: '방명록',
};

export default async function GuestbookPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const session = await auth();
  const { page } = await searchParams;
  const currentPage = Math.max(1, parseInt(page ?? '1', 10));
  const { data: posts, pagination } = await getGuestbookPosts(currentPage);

  return (
    <div className="flex flex-col gap-6 max-w-3xl mx-auto">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 mb-1">방명록</h1>
        <p className="text-sm text-gray-500">방문 기념으로 한 마디 남겨보세요.</p>
      </div>

      <GuestbookForm />

      <GuestbookList
        posts={posts}
        pagination={pagination}
        currentUserEmail={session!.user!.email!}
      />
    </div>
  );
}
