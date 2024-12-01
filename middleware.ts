import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Fonction pour vérifier l'authentification
function isAuthenticated(req: NextRequest): boolean {
  // Récupération des cookies
  const token = req.cookies.get('next-auth.session-token') || req.cookies.get('__Secure-next-auth.session-token');
  return !!token; // Si le cookie existe, l'utilisateur est authentifié
}

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const userIsAuthenticated = isAuthenticated(req);


  // Rediriger la page d'accueil
  if (pathname === '/') {
    if (!userIsAuthenticated) {
      return NextResponse.redirect(new URL('/login', req.url));
    }
    return NextResponse.redirect(new URL('/dashboard', req.url));
  }
  // if (pathname.startsWith('/api/auth')) {
  //   return NextResponse.next();  // Permet les requêtes vers NextAuth API
  // }

  // Page de login
  if (pathname === '/login') {
    if (userIsAuthenticated) {
      return NextResponse.redirect(new URL('/dashboard', req.url));
    }
    return NextResponse.next(); // La requête continue sans interruption
  }

  // Route de dashboard
  if (pathname.startsWith('/dashboard')) {
    if (!userIsAuthenticated) {
      return NextResponse.redirect(new URL('/login', req.url));
    }
    return NextResponse.next();
  }

  // Route API - ne pas rediriger, répondre avec un 401 si non authentifié
  if (pathname.startsWith('/api')) {
    if (!userIsAuthenticated) {
      // Répondre avec une erreur 401 pour API non authentifiée
      const response = NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
      return response;
    }
    return NextResponse.next();
  }
}

export const config = {
  matcher: ['/', '/login', '/dashboard/:path', '/api/movies/:path*', '/api/discover/:path*', '/api/shows/:path*'], // Assurez-vous que '/api/*' est bien dans le matcher
};
