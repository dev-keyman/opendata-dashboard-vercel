import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/auth';
import { fetchApartmentTransactions } from '@/lib/apartment-api';

export async function GET(req: NextRequest) {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: '인증이 필요합니다.', success: false }, { status: 401 });
  }

  const { searchParams } = req.nextUrl;
  const LAWD_CD = searchParams.get('LAWD_CD');
  const DEAL_YMD = searchParams.get('DEAL_YMD');

  if (!LAWD_CD || !DEAL_YMD) {
    return NextResponse.json(
      { error: 'LAWD_CD(법정동 코드)와 DEAL_YMD(년월)가 필요합니다.', success: false },
      { status: 400 }
    );
  }

  try {
    const records = await fetchApartmentTransactions({ LAWD_CD, DEAL_YMD });
    return NextResponse.json({ data: records, success: true });
  } catch (error) {
    const message = error instanceof Error ? error.message : '알 수 없는 오류가 발생했습니다.';
    return NextResponse.json({ error: message, success: false }, { status: 500 });
  }
}
