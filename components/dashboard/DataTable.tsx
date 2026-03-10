import { formatNumber } from '@/lib/utils';
import type { ApartmentRecord } from '@/types/apartment';

interface DataTableProps {
  records: ApartmentRecord[];
}

const headers = [
  '아파트명',
  '법정동',
  '거래일',
  '전용면적(m²)',
  '층',
  '거래금액(만원)',
];

export default function DataTable({ records }: DataTableProps) {
  if (records.length === 0) {
    return (
      <div className="bg-white rounded-lg border border-gray-200 py-16 text-center text-gray-400">
        조회 결과가 없습니다.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-lg border border-gray-200">
      <table className="min-w-full divide-y divide-gray-200 text-sm">
        <thead className="bg-gray-50">
          <tr>
            {headers.map((h) => (
              <th
                key={h}
                className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap"
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-100">
          {records.map((r, i) => (
            <tr key={i} className="hover:bg-gray-50 transition-colors">
              <td className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap">{r.name}</td>
              <td className="px-4 py-3 text-gray-600">{r.dong}</td>
              <td className="px-4 py-3 text-gray-600 whitespace-nowrap">{r.date}</td>
              <td className="px-4 py-3 text-gray-600 text-right">{r.area}</td>
              <td className="px-4 py-3 text-gray-600 text-center">{r.floor}</td>
              <td className="px-4 py-3 font-semibold text-primary-500 text-right whitespace-nowrap">
                {formatNumber(r.price)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
