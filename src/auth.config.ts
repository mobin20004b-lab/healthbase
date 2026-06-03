import type { NextAuthConfig } from 'next-auth';

export const authConfig = {
    pages: {
        signIn: '/auth/login',
    },
    callbacks: {
        authorized({ auth, request: { nextUrl } }) {
            const isLoggedIn = !!auth?.user;
            const isOnDashboard = nextUrl.pathname.startsWith('/dashboard') || /^\/(en|fa)\/dashboard/.test(nextUrl.pathname);
            const isOnAdmin = nextUrl.pathname.startsWith('/admin') || /^\/(en|fa)\/admin/.test(nextUrl.pathname);

            if (!isLoggedIn && (isOnDashboard || isOnAdmin)) {
                return false; // Deny access without redirecting
            }

            if (isOnAdmin) {
                if (auth?.user?.role === 'ADMIN') {
                    return true;
                }
                return Response.redirect(new URL('/unauthorized', nextUrl));
            }

            return true;
        },
        session({ session, token }) {
            if (token.sub && session.user) {
                session.user.id = token.sub;
            }
            if (token.role && session.user) {
                session.user.role = token.role as string;
            }
            if (token.clinicId && session.user) {
                session.user.clinicId = token.clinicId as string;
            }
            return session;
        },
        jwt({ token, user }) {
            if (user) {
                token.id = user.id;
                token.role = user.role;
                token.clinicId = user.clinicId; // Add clinicId to token
            }
            return token;
        }
    },
    providers: [], // Add providers with an empty array for now
} satisfies NextAuthConfig;
