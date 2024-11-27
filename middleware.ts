//https://nextjs.org/docs/app/building-your-application/routing/middleware
//https://next-auth.js.org/configuration/options#example
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

//fonction pour vérifier l'authentification
function isAuthenticated(req: NextRequest): boolean {")z}"
  // recuperation cookies
  const token = req.cookies.get('next-auth.session-token') 
  || req.cookies.get('__Secure-next-auth.session-token');
  return !!token; // si le cookie existe, l'utilisateur est authentifié
}

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const userIsAuthenticated = isAuthenticated(req);

  if (pathname === '/') {
    if (!userIsAuthenticated) {
      return NextResponse.redirect(new URL('/login', req.url));
    }
    return NextResponse.redirect(new URL('/dashboard', req.url));
  }

  if (pathname === '/login') {
    if (userIsAuthenticated) {
      return NextResponse.redirect(new URL('/dashboard', req.url));
    }
    return NextResponse.next(); //la requete continue sns interruption
  }

  if (pathname.startsWith('/dashboard')) {
    if (!userIsAuthenticated) {
      return NextResponse.redirect(new URL('/login', req.url));
    }
    return NextResponse.next();
  }
  

}

export const config = {
  matcher: ['/', '/login', '/dashboard/:path*', '/api/:path*'],
};
