import type { ApartmentApiResponse, ApartmentRecord } from '@/types/apartment';

const BASE_URL =
  'https://apis.data.go.kr/1613000/RTMSDataSvcAptTrade/getRTMSDataSvcAptTrade';

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
    next: { revalidate: 3600 },
  });

  if (!res.ok) throw new Error(`API 요청 실패: ${res.status} ${res.statusText}`);

  const contentType = res.headers.get('content-type') ?? '';
  const text = await res.text();

  if (!contentType.includes('json') && !text.trimStart().startsWith('{')) {
    // XML 또는 예외 응답 수신 시 원문 일부를 에러에 포함
    throw new Error(`API가 JSON이 아닌 응답을 반환했습니다. (응답 일부: ${text.slice(0, 200)})`);
  }

  let data: ApartmentApiResponse;
  try {
    data = JSON.parse(text) as ApartmentApiResponse;
  } catch {
    throw new Error(`JSON 파싱 실패 (응답 일부: ${text.slice(0, 200)})`);
  }

  const { resultCode, resultMsg } = data.response.header;
  if (resultCode !== '00' && resultCode !== '000') throw new Error(`공공데이터 API 오류 [${resultCode}]: ${resultMsg}`);

  const body = data.response.body;
  if (!body.items || typeof body.items === 'string') return [];

  const rawItems = body.items.item;
  const list = Array.isArray(rawItems) ? rawItems : rawItems ? [rawItems] : [];

  return list.map((item) => ({
    aptNm: item.aptNm?.trim() ?? '',
    umdNm: item.umdNm?.trim() ?? '',
    dealAmount: parseInt(item.dealAmount.replace(/,/g, '').trim(), 10),
    excluUseAr: parseFloat(item.excluUseAr),
    buildYear: parseInt(item.buildYear, 10),
  }));
}
