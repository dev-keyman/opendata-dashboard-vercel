import Link from 'next/link';
import type { Pagination as PaginationType } from '@/types';

interface PaginationProps {
  pagination: PaginationType;
}

export default function Pagination({ pagination }: PaginationProps) {
  const { page, totalPages } = pagination;
  const hasPrev = page > 1;
  const hasNext = page < totalPages;

  return (
    <div className="flex items-center justify-center gap-2 py-2">
      <Link
        href={`?page=${page - 1}`}
        className={`px-3 py-1.5 rounded-md text-sm border transition-colors ${
          hasPrev
            ? 'border-gray-300 text-gray-700 hover:bg-gray-50'
            : 'border-gray-200 text-gray-300 pointer-events-none'
        }`}
        aria-disabled={!hasPrev}
      >
        이전
      </Link>

      <span className="text-sm text-gray-600">
        {page} / {totalPages}
      </span>

      <Link
        href={`?page=${page + 1}`}
        className={`px-3 py-1.5 rounded-md text-sm border transition-colors ${
          hasNext
            ? 'border-gray-300 text-gray-700 hover:bg-gray-50'
            : 'border-gray-200 text-gray-300 pointer-events-none'
        }`}
        aria-disabled={!hasNext}
      >
        다음
      </Link>
    </div>
  );
}
