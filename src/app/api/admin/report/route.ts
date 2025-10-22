import { NextResponse } from 'next/server';
import { query } from '@/lib/db';

export async function GET() {
  try {
    // Jika tabel reports belum ada, return empty array untuk sementara
    const reports = await query(`
      SELECT 
        r.id,
        r.report_type as type,
        u.username as user,
        r.status,
        DATE_FORMAT(r.created_at, '%Y-%m-%d') as date
      FROM reports r
      LEFT JOIN users u ON r.reported_user_id = u.id
      ORDER BY r.created_at DESC
      LIMIT 5
    `).catch(() => []); // Fallback jika tabel belum ada

    return NextResponse.json(reports);
  } catch (error) {
    console.error('Error fetching reports:', error);
    return NextResponse.json([], { status: 200 }); // Return empty array sebagai fallback
  }
}