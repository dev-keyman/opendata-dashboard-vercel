'use client';

import { useState, useCallback, useEffect } from 'react';
import SearchForm, { type SearchFormValues } from '@/components/dashboard/SearchForm';
import DataTable from '@/components/dashboard/DataTable';
import StatsPanel from '@/components/dashboard/StatsPanel';
import type { ApartmentRecord, DashboardStats } from '@/types/apartment';
import type { SeoulGu } from '@/lib/seoul-gu';

interface DashboardClientProps {
  guList: SeoulGu[];
}

export default function DashboardClient({ guList }: DashboardClientProps) {
  const [records, setRecords] = useState<ApartmentRecord[]>([]);
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = useCallback(async (values: SearchFormValues) => {
    setIsLoading(true);
    setError(null);

    try {
      const params = new URLSearchParams(values);
      const res = await fetch(`/api/apartment?${params.toString()}`);
      const json = await res.json();

      if (!json.success) throw new Error(json.error);

      const data: ApartmentRecord[] = json.data;
      setRecords(data);
      setStats(computeStats(data));
      setHasSearched(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : '오류가 발생했습니다.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    const now = new Date();
    const defaultYM = `${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, '0')}`;
    handleSearch({ LAWD_CD: guList[0]?.code ?? '11110', DEAL_YMD: defaultYM });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 mb-1">서울 아파트 매매 실거래가</h1>
        <p className="text-sm text-gray-500">
          출처: 국토교통부 아파트매매 실거래가 상세 자료 (data.go.kr)
        </p>
      </div>

      <SearchForm onSearch={handleSearch} isLoading={isLoading} guList={guList} />

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-sm text-red-600">
          {error}
        </div>
      )}

      {stats && <StatsPanel stats={stats} />}

      {hasSearched && (
        <div>
          <p className="text-sm text-gray-500 mb-3">
            총 <span className="font-semibold text-gray-800">{records.length}</span>건의 거래 내역
          </p>
          <DataTable records={records} />
        </div>
      )}

      {!hasSearched && !isLoading && (
        <div className="bg-white rounded-lg border border-dashed border-gray-300 py-20 text-center text-gray-400">
          자치구와 거래 년월을 선택하고 조회 버튼을 클릭하세요.
        </div>
      )}
    </div>
  );
}

function computeStats(records: ApartmentRecord[]): DashboardStats {
  if (records.length === 0) {
    return { count: 0, avgPrice: 0, maxPrice: 0, minPrice: 0 };
  }
  const prices = records.map((r) => r.dealAmount);
  return {
    count: records.length,
    avgPrice: Math.round(prices.reduce((a, b) => a + b, 0) / prices.length),
    maxPrice: Math.max(...prices),
    minPrice: Math.min(...prices),
  };
}
