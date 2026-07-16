import { NextRequest, NextResponse } from 'next/server';

const MAINTENANCE_PATH = '/mantenimiento';

const BYPASS_PATHS = [
  '/_next',
  '/images',
  '/favicon.ico',
  '/robots.txt',
  '/sitemap.xml',
];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (BYPASS_PATHS.some((p) => pathname.startsWith(p))) {
    return NextResponse.next();
  }

  if (pathname.startsWith(MAINTENANCE_PATH)) {
    const response = NextResponse.next();
    response.headers.set('x-maintenance-mode', '1');
    return response;
  }

  // API routes pass through so integrations keep working
  if (pathname.startsWith('/api/')) {
    return NextResponse.next();
  }

  return NextResponse.redirect(new URL(MAINTENANCE_PATH, request.url));
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
