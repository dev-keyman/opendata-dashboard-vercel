import { getSeoulGuList } from '@/lib/seoul-gu';
import DashboardClient from '@/components/dashboard/DashboardClient';

export const metadata = {
  title: '서울 아파트 매매 실거래가',
};

export default async function DashboardPage() {
  const guList = await getSeoulGuList();
  return <DashboardClient guList={guList} />;
}
