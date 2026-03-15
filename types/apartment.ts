// 국토교통부 API 원본 응답 항목 (영문 필드명)
export interface ApartmentTransactionRaw {
  aptNm: string;        // 단지명
  umdNm: string;        // 법정동
  dealAmount: string;   // 거래금액 (e.g. "85,000" 만원, 쉼표 포함)
  excluUseAr: string;   // 전용면적 (m²)
  buildYear: string;    // 건축년도
  dealYear: string;     // 거래년도
  dealMonth: string;    // 거래월
  dealDay: string;      // 거래일
  floor: string;        // 층
  jibun: string;        // 지번
  sggCd: string;        // 지역코드
}

export interface ApartmentApiResponse {
  response: {
    header: { resultCode: string; resultMsg: string };
    body: {
      items: { item: ApartmentTransactionRaw | ApartmentTransactionRaw[] } | string;
      numOfRows: number;
      pageNo: number;
      totalCount: number;
    };
  };
}

// 프론트엔드 사용 정규화 데이터
export interface ApartmentRecord {
  aptNm: string;      // 단지명
  umdNm: string;      // 법정동
  dealAmount: number; // 거래금액 (만원, 정수)
  excluUseAr: number; // 전용면적 (m², 소수)
  buildYear: number;  // 건축년도
}

export interface DashboardStats {
  count: number;
  avgPrice: number;
  maxPrice: number;
  minPrice: number;
}
