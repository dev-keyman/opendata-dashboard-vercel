// 국토교통부 API 원본 응답 항목
export interface ApartmentTransactionRaw {
  거래금액: string;   // e.g. "85,000" (만원, 쉼표 포함)
  건축년도: string;
  년: string;
  법정동: string;
  아파트: string;
  월: string;
  일: string;
  전용면적: string;   // m²
  지번: string;
  지역코드: string;
  층: string;
}

export interface ApartmentApiResponse {
  response: {
    header: { resultCode: string; resultMsg: string };
    body: {
      items: { item: ApartmentTransactionRaw | ApartmentTransactionRaw[] } | '';
      numOfRows: number;
      pageNo: number;
      totalCount: number;
    };
  };
}

// 프론트엔드 사용 정규화 데이터
export interface ApartmentRecord {
  name: string;       // 아파트명
  dong: string;       // 법정동
  date: string;       // YYYY-MM-DD
  price: number;      // 만원 (정수)
  area: number;       // 전용면적 m² (소수)
  floor: number;      // 층
  builtYear: number;  // 건축년도
}

export interface DashboardStats {
  count: number;
  avgPrice: number;
  maxPrice: number;
  minPrice: number;
}
