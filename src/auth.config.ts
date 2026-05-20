import type { NextAuthConfig } from 'next-auth';

export const authConfig = {
    pages: {
        signIn: '/auth/login',
    },
    callbacks: {
        authorized({ auth, request: { nextUrl } }) {
            const isLoggedIn = !!auth?.user;
            const pathname = nextUrl.pathname;

            // Allow Next.js internal and API routes to bypass locale parsing in middleware
            if (pathname.startsWith('/_next') || pathname.startsWith('/api')) {
                return true;
            }

            // Using regex to match locale paths like /en/admin or /fa/admin
            const isOnDashboard = /^\/(en|fa)\/dashboard(\/.*)?$/.test(pathname);
            const isOnAdmin = /^\/(en|fa)\/admin(\/.*)?$/.test(pathname);

            if (isOnDashboard || isOnAdmin) {
                if (!isLoggedIn) return false; // Deny access without redirecting

                if (isOnAdmin && auth?.user?.role !== 'ADMIN') {
                    return false;
                }

                return true;
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
