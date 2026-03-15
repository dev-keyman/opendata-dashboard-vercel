import { getDb } from './db';

export interface SeoulGu {
  gu_name: string;
  code: string;
}

export async function getSeoulGuList(): Promise<SeoulGu[]> {
  try {
    const db = getDb();
    const result = await db.execute(
      'SELECT gu_name, code FROM seoul_gu_code ORDER BY id ASC'
    );
    return result.rows.map((row) => ({
      gu_name: row.gu_name as string,
      code: row.code as string,
    }));
  } catch {
    // DB 미설정 시 하드코딩 폴백
    return SEOUL_GU_FALLBACK;
  }
}

const SEOUL_GU_FALLBACK: SeoulGu[] = [
  { gu_name: '종로구', code: '11110' },
  { gu_name: '중구', code: '11140' },
  { gu_name: '용산구', code: '11170' },
  { gu_name: '성동구', code: '11200' },
  { gu_name: '광진구', code: '11215' },
  { gu_name: '동대문구', code: '11230' },
  { gu_name: '중랑구', code: '11260' },
  { gu_name: '성북구', code: '11290' },
  { gu_name: '강북구', code: '11305' },
  { gu_name: '도봉구', code: '11320' },
  { gu_name: '노원구', code: '11350' },
  { gu_name: '은평구', code: '11380' },
  { gu_name: '서대문구', code: '11410' },
  { gu_name: '마포구', code: '11440' },
  { gu_name: '양천구', code: '11470' },
  { gu_name: '강서구', code: '11500' },
  { gu_name: '구로구', code: '11530' },
  { gu_name: '금천구', code: '11545' },
  { gu_name: '영등포구', code: '11560' },
  { gu_name: '동작구', code: '11590' },
  { gu_name: '관악구', code: '11620' },
  { gu_name: '서초구', code: '11650' },
  { gu_name: '강남구', code: '11680' },
  { gu_name: '송파구', code: '11710' },
  { gu_name: '강동구', code: '11740' },
];
