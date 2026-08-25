import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const CANONICAL = 'transfer-engine.vercel.app';

const passthrough = (host: string) =>
  host === CANONICAL || /^(localhost|127\.0\.0\.1|\[::1\])(:\d+)?$/.test(host);

export function middleware(req: NextRequest) {
  const host = req.headers.get('host');
  if (!host || passthrough(host)) return NextResponse.next();
  const url = req.nextUrl.clone();
  url.protocol = 'https:';
  url.host = CANONICAL;
  url.port = '';
  return NextResponse.redirect(url, 301);
}

export const config = { matcher: '/:path*' };
