import type { NextAuthConfig } from 'next-auth';

export const authConfig = {
    pages: {
        signIn: '/auth/login',
    },
    callbacks: {
        authorized({ auth, request: { nextUrl } }) {
            const isLoggedIn = !!auth?.user;

            // Match paths like /en/admin, /fa/admin, or /admin
            const isAdminRoute = /^\/(en|fa)\/admin/.test(nextUrl.pathname) || nextUrl.pathname.startsWith('/admin');
            const isDashboardRoute = /^\/(en|fa)\/dashboard/.test(nextUrl.pathname) || nextUrl.pathname.startsWith('/dashboard');

            if (isAdminRoute || isDashboardRoute) {
                if (!isLoggedIn) {
                    return false; // Denies access and redirects to sign in
                }

                if (isAdminRoute && auth?.user?.role !== 'ADMIN') {
                    const pathParts = nextUrl.pathname.split('/');
                    const currentLocale = ['en', 'fa'].includes(pathParts[1]) ? pathParts[1] : 'fa';
                    return Response.redirect(new URL(`/${currentLocale}/unauthorized`, nextUrl));
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
