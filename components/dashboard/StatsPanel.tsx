import Card from '@/components/ui/Card';
import { formatNumber } from '@/lib/utils';
import type { DashboardStats } from '@/types/apartment';

interface StatsPanelProps {
  stats: DashboardStats;
}

export default function StatsPanel({ stats }: StatsPanelProps) {
  const items = [
    { label: '총 거래 건수', value: `${formatNumber(stats.count)}건`, color: 'text-gray-800' },
    { label: '평균 거래가', value: `${formatNumber(stats.avgPrice)}만원`, color: 'text-primary-500' },
    { label: '최고 거래가', value: `${formatNumber(stats.maxPrice)}만원`, color: 'text-red-500' },
    { label: '최저 거래가', value: `${formatNumber(stats.minPrice)}만원`, color: 'text-green-600' },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {items.map((item) => (
        <Card key={item.label} className="text-center py-4">
          <p className="text-xs text-gray-500 mb-2">{item.label}</p>
          <p className={`text-lg font-bold ${item.color}`}>{item.value}</p>
        </Card>
      ))}
    </div>
  );
}
