import { NextRequest, NextResponse } from 'next/server';
import { parse } from 'cookie';
import { checkServerSession } from './lib/api/serverApi';

const privateRoutes = ['/profile', '/notes'];
const publicRoutes = ['/sign-in', '/sign-up'];

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const accessToken = request.cookies.get('accessToken')?.value;
  const refreshToken = request.cookies.get('refreshToken')?.value;

  const isPrivateRoute = privateRoutes.some(route =>
    pathname.startsWith(route)
  );

  const isPublicRoute = publicRoutes.some(route =>
    pathname.startsWith(route)
  );

  if (accessToken) {
    if (isPublicRoute) {
      return NextResponse.redirect(new URL('/profile', request.url));
    }
    return NextResponse.next();
  }

  
  if (refreshToken) {
    try {
      const res = await checkServerSession();
      const setCookie = res.headers['set-cookie'];

      if (setCookie) {
        const response = isPublicRoute
          ? NextResponse.redirect(new URL('/profile', request.url))
          : NextResponse.next();

        const cookieArray = Array.isArray(setCookie) ? setCookie : [setCookie];

       for (const cookieStr of cookieArray) {
  const parsed = parse(cookieStr);
  const name = Object.keys(parsed)[0];
  const value = parsed[name];

  if (!value) continue; 

  response.cookies.set({
    name,
    value, 
    httpOnly: true,
    path: parsed.Path || '/',
    expires: parsed.Expires ? new Date(parsed.Expires) : undefined,
    maxAge: parsed['Max-Age'] ? Number(parsed['Max-Age']) : undefined,
  });
}

        return response;
      }
    } catch {
      if (isPrivateRoute) {
        return NextResponse.redirect(new URL('/sign-in', request.url));
      }
      return NextResponse.next();
    }
  }

  // ❌ Нема токенів
  if (isPrivateRoute) {
    return NextResponse.redirect(new URL('/sign-in', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/profile/:path*',
    '/notes/:path*',
    '/sign-in',
    '/sign-up',
  ],
};
