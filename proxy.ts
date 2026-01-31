import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { checkSession } from './lib/api/serverApi';

const privateRoutes = ['/profile'];

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const cookieStore = await cookies();
  const accessToken = cookieStore.get('accessToken')?.value;
  const refreshToken = cookieStore.get('refreshToken')?.value;

  const isPrivateRoute = privateRoutes.some(route =>
    pathname.startsWith(route)
  );

  if (!isPrivateRoute) return NextResponse.next();

  if (accessToken) return NextResponse.next();

  if (refreshToken) {
    try {
      await checkSession(); 

      return NextResponse.next(); 
    } catch {
      return NextResponse.redirect(new URL('/sign-in', request.url));
    }
  }

  return NextResponse.redirect(new URL('/sign-in', request.url));
}

export const config = {
  matcher: ['/profile/:path*'],
};

