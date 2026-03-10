'use client';

import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import Button from '@/components/ui/Button';

const schema = z.object({
  LAWD_CD: z
    .string()
    .length(5, '법정동 코드는 5자리 숫자여야 합니다.')
    .regex(/^\d{5}$/, '숫자만 입력 가능합니다.'),
  DEAL_YMD: z
    .string()
    .regex(/^\d{6}$/, 'YYYYMM 형식으로 입력하세요. (예: 202401)'),
});

export type SearchFormValues = z.infer<typeof schema>;

interface SearchFormProps {
  onSearch: (values: SearchFormValues) => void;
  isLoading: boolean;
}

export default function SearchForm({ onSearch, isLoading }: SearchFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SearchFormValues>({
    resolver: zodResolver(schema),
    defaultValues: { LAWD_CD: '11110', DEAL_YMD: '202401' },
  });

  return (
    <form
      onSubmit={handleSubmit(onSearch)}
      className="bg-white rounded-lg border border-gray-200 p-6 flex flex-wrap gap-4 items-end"
    >
      <div className="flex flex-col gap-1 min-w-[180px]">
        <label className="text-sm font-medium text-gray-700">
          법정동 코드 <span className="text-gray-400 font-normal">(5자리)</span>
        </label>
        <input
          {...register('LAWD_CD')}
          className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          placeholder="예: 11110 (종로구)"
        />
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
          placeholder="예: 202401"
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
