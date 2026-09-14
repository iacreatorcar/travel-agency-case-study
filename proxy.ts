import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verifySessionToken, SITE_SESSION_COOKIE } from './lib/site-session';

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const token = request.cookies.get(SITE_SESSION_COOKIE)?.value;
  const authenticated = verifySessionToken(token);

  if (authenticated) {
    return NextResponse.next();
  }

  if (pathname.startsWith('/api/')) {
    return NextResponse.json({ ok: false, error: 'Unauthorized' }, { status: 401 });
  }

  const loginUrl = new URL('/site-access', request.url);
  return NextResponse.redirect(loginUrl);
}

export const config = {
  matcher: [
    '/((?!site-access|api/site-auth|_next/static|_next/image|favicon.ico|robots.txt|logo.png).*)'
  ]
};
