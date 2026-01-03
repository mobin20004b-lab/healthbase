import NextAuth from 'next-auth';
import { authConfig } from './auth.config';
import createMiddleware from 'next-intl/middleware';
import { routing } from './routing';

const { auth } = NextAuth(authConfig);
const intlMiddleware = createMiddleware(routing);

export default auth((req) => {
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
