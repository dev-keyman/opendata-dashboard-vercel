'use client';

import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import Button from '@/components/ui/Button';
import type { SeoulGu } from '@/lib/seoul-gu';

const schema = z.object({
  LAWD_CD: z.string().regex(/^\d{5}$/, '자치구를 선택해주세요.'),
  DEAL_YMD: z.string().regex(/^\d{6}$/, 'YYYYMM 형식으로 입력하세요.'),
});

export type SearchFormValues = z.infer<typeof schema>;

function getCurrentYearMonth(): string {
  const now = new Date();
  return `${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, '0')}`;
}

interface SearchFormProps {
  onSearch: (values: SearchFormValues) => void;
  isLoading: boolean;
  guList: SeoulGu[];
}

export default function SearchForm({ onSearch, isLoading, guList }: SearchFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SearchFormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      LAWD_CD: guList[0]?.code ?? '11110',
      DEAL_YMD: getCurrentYearMonth(),
    },
  });

  return (
    <form
      onSubmit={handleSubmit(onSearch)}
      className="bg-white rounded-lg border border-gray-200 p-6 flex flex-wrap gap-4 items-end"
    >
      <div className="flex flex-col gap-1 min-w-[180px]">
        <label className="text-sm font-medium text-gray-700">자치구</label>
        <select
          {...register('LAWD_CD')}
          className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white"
        >
          {guList.map((g) => (
            <option key={g.code} value={g.code}>
              {g.gu_name}
            </option>
          ))}
        </select>
        {errors.LAWD_CD && (
          <span className="text-xs text-red-500">{errors.LAWD_CD.message}</span>
        )}
      </div>

      <div className="flex flex-col gap-1 min-w-[160px]">
        <label className="text-sm font-medium text-gray-700">
          거래 년월 <span className="text-gray-400 font-normal">(YYYYMM)</span>
        </label>
        <input
          {...register('DEAL_YMD')}
          className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          placeholder="예: 202503"
        />
        {errors.DEAL_YMD && (
          <span className="text-xs text-red-500">{errors.DEAL_YMD.message}</span>
        )}
      </div>

      <Button type="submit" disabled={isLoading} className="h-[38px]">
        {isLoading ? '조회 중...' : '조회하기'}
      </Button>
    </form>
  );
}
