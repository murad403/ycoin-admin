import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const protectedRoutes = [
  '/',
  '/user-management',
  '/bulk-push-notifications',
  '/knowledge-base',
  '/account-&-security',
];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const accessToken = request.cookies.get('access')?.value;

  const isAuthRoute = pathname.startsWith('/auth');

  const isProtectedRoute = protectedRoutes.some((route) => {
    if (route === '/') {
      return pathname === '/';
    }
    return pathname === route || pathname.startsWith(`${route}/`);
  });

  // If trying to access a protected route without an access token -> redirect to sign-in
  if (isProtectedRoute && !accessToken) {
    const signInUrl = new URL('/auth/sign-in', request.url);
    return NextResponse.redirect(signInUrl);
  }

  // If authenticated user tries to access auth pages -> redirect to main dashboard /
  if (isAuthRoute && accessToken) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/',
    '/user-management/:path*',
    '/bulk-push-notifications/:path*',
    '/knowledge-base/:path*',
    '/account-&-security/:path*',
    '/auth/:path*',
  ],
};
