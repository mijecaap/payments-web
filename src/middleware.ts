import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value;

  const protectedPaths = ['/home', '/history'];
  const authPaths = ['/auth'];

  const isProtectedPath = protectedPaths.some((path) => request.nextUrl.pathname.startsWith(path));

  const isAuthPath = authPaths.some((path) => request.nextUrl.pathname.startsWith(path));

  if (isProtectedPath && !token) {
    return NextResponse.redirect(new URL('/auth', request.url));
  }

  if (isAuthPath && token) {
    return NextResponse.redirect(new URL('/home', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/home/:path*', '/auth/:path*', '/history/:path*'],
};
