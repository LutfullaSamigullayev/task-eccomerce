import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Brauzer yuborgan cookie'lar orasidan tokenni qidiramiz
  const token = request.cookies.get('accessToken')?.value;
  
  const isAuthPage = request.nextUrl.pathname.startsWith('/login');
  const isDashboardPage = request.nextUrl.pathname.startsWith('/dashboard');

  // 1-qoida: Token YO'Q bo'lsa va Dashboard'ga kirmoqchi bo'lsa -> Login'ga haydaymiz
  if (!token && isDashboardPage) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // 2-qoida: Token BOR bo'lsa va Login'ga kirmoqchi bo'lsa -> Dashboard'ga o'tkazib yuboramiz
  if (token && isAuthPage) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  // Qolgan barcha holatlarda so'rovni davom ettirishga ruxsat beramiz
  return NextResponse.next();
}

// Middleware qaysi marshrutlarda ishlashini belgilaymiz
export const config = {
  matcher: ['/dashboard/:path*', '/login'],
};