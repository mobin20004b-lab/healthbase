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
    // Match only localized paths - all URLs must have /fa/ or /en/ prefix
    matcher: [
        '/',
        '/(fa|en)/:path*'
    ]
};
