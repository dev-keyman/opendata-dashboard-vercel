import GuestbookItem from './GuestbookItem';
import Pagination from './Pagination';
import type { GuestbookPost, Pagination as PaginationType } from '@/types';

interface GuestbookListProps {
  posts: GuestbookPost[];
  pagination: PaginationType;
  currentUserEmail: string;
}

export default function GuestbookList({ posts, pagination, currentUserEmail }: GuestbookListProps) {
  if (posts.length === 0) {
    return (
      <div className="bg-white rounded-lg border border-dashed border-gray-300 py-16 text-center text-gray-400 text-sm">
        아직 방명록이 없습니다. 첫 번째 글을 남겨보세요!
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-3">
        {posts.map((post) => (
          <GuestbookItem key={post.id} post={post} currentUserEmail={currentUserEmail} />
        ))}
      </div>
      {pagination.totalPages > 1 && <Pagination pagination={pagination} />}
    </div>
  );
}
