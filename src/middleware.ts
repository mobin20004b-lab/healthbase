import NextAuth from 'next-auth';
import { authConfig } from './auth.config';
import createMiddleware from 'next-intl/middleware';
import { routing } from './routing';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const { auth } = NextAuth(authConfig);
const intlMiddleware = createMiddleware(routing);

export default auth((req: NextRequest) => {
    // Explicitly redirect root path to default locale
    if (req.nextUrl.pathname === '/') {
        const locale = routing.defaultLocale;
        return NextResponse.redirect(new URL(`/${locale}`, req.url));
    }
    return intlMiddleware(req);
});

export const config = {
    // Match all paths except static files and API routes
    matcher: [
        '/',
        '/(fa|en)/:path*',
        '/((?!api|_next|_vercel|.*\\..*).*)'
    ]
};
