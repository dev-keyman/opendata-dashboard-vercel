import type { ApartmentApiResponse, ApartmentRecord } from '@/types/apartment';

const BASE_URL =
  'https://apis.data.go.kr/1613000/RTMSDataSvcAptTradeDev/getRTMSDataSvcAptTradeDev';

export interface ApartmentSearchParams {
  LAWD_CD: string;    // 법정동 코드 앞 5자리
  DEAL_YMD: string;   // YYYYMM
  pageNo?: number;
  numOfRows?: number;
}

export async function fetchApartmentTransactions(
  params: ApartmentSearchParams
): Promise<ApartmentRecord[]> {
  const apiKey = process.env.PUBLIC_DATA_API_KEY;
  if (!apiKey) throw new Error('PUBLIC_DATA_API_KEY 환경변수가 설정되지 않았습니다.');

  const searchParams = new URLSearchParams({
    serviceKey: apiKey,
    LAWD_CD: params.LAWD_CD,
    DEAL_YMD: params.DEAL_YMD,
    pageNo: String(params.pageNo ?? 1),
    numOfRows: String(params.numOfRows ?? 100),
    _type: 'json',
  });

  const res = await fetch(`${BASE_URL}?${searchParams.toString()}`, {
    next: { revalidate: 3600 }, // 1시간 캐시
  });

  if (!res.ok) throw new Error(`API 요청 실패: ${res.status} ${res.statusText}`);

  const data: ApartmentApiResponse = await res.json();
  const { resultCode, resultMsg } = data.response.header;
  if (resultCode !== '00') throw new Error(`공공데이터 API 오류: ${resultMsg}`);

  const body = data.response.body;
  if (!body.items || typeof body.items === 'string') return [];

  const rawItems = body.items.item;
  const list = Array.isArray(rawItems) ? rawItems : rawItems ? [rawItems] : [];

  return list.map((item) => ({
    name: item.아파트,
    dong: item.법정동.trim(),
    date: `${item.년}-${String(item.월).padStart(2, '0')}-${String(item.일).padStart(2, '0')}`,
    price: parseInt(item.거래금액.replace(/,/g, ''), 10),
    area: parseFloat(item.전용면적),
    floor: parseInt(item.층, 10),
    builtYear: parseInt(item.건축년도, 10),
  }));
}
