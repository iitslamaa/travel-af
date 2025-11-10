// apps/web/app/api/country/[iso2]/route.ts
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  _req: NextRequest,
  ctx: { params: Promise<{ iso2: string }> } // <-- Next 16 typed routes: params is a Promise
) {
  const { iso2 } = await ctx.params;        // await the params
  return NextResponse.json({ ok: true, iso2 });
}