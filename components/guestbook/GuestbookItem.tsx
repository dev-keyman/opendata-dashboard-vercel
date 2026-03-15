'use client';

import { useTransition } from 'react';
import { deletePost } from '@/app/actions/guestbook';
import { formatDate } from '@/lib/utils';
import type { GuestbookPost } from '@/types';

interface GuestbookItemProps {
  post: GuestbookPost;
  currentUserEmail: string;
}

export default function GuestbookItem({ post, currentUserEmail }: GuestbookItemProps) {
  const [isPending, startTransition] = useTransition();
  const isOwner = post.author_email === currentUserEmail;

  function handleDelete() {
    if (!confirm('이 글을 삭제하시겠습니까?')) return;
    startTransition(async () => {
      try {
        await deletePost(post.id);
      } catch (err) {
        alert(err instanceof Error ? err.message : '삭제 중 오류가 발생했습니다.');
      }
    });
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4 flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-gray-800">{post.author_name}</span>
          <span className="text-xs text-gray-400">{post.author_email}</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-xs text-gray-400">{formatDate(post.created_at)}</span>
          {isOwner && (
            <button
              onClick={handleDelete}
              disabled={isPending}
              className="text-xs text-red-400 hover:text-red-600 transition-colors disabled:opacity-50"
            >
              {isPending ? '삭제 중...' : '삭제'}
            </button>
          )}
        </div>
      </div>
      <p className="text-sm text-gray-700 whitespace-pre-wrap break-words">{post.content}</p>
    </div>
  );
}
