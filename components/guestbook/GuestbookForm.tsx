'use client';

import { useRef, useTransition } from 'react';
import { createPost } from '@/app/actions/guestbook';
import Button from '@/components/ui/Button';

export default function GuestbookForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [isPending, startTransition] = useTransition();

  function handleSubmit(formData: FormData) {
    startTransition(async () => {
      try {
        await createPost(formData);
        formRef.current?.reset();
      } catch (err) {
        alert(err instanceof Error ? err.message : '오류가 발생했습니다.');
      }
    });
  }

  return (
    <form ref={formRef} action={handleSubmit} className="bg-white rounded-lg border border-gray-200 p-4 flex flex-col gap-3">
      <textarea
        name="content"
        rows={3}
        maxLength={500}
        placeholder="방명록을 남겨주세요. (최대 500자)"
        className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
        required
      />
      <div className="flex justify-end">
        <Button type="submit" size="sm" disabled={isPending}>
          {isPending ? '등록 중...' : '등록'}
        </Button>
      </div>
    </form>
  );
}
