
import { NavigationRail, NavigationRailItem } from '@/web/components/ui/nav-rail';
import {
    LayoutDashboard,
    Hospital,
    MessageSquare,
    Settings,
    LogOut,
    Layers,
    User
} from 'lucide-react';
import Link from 'next/link';
import { getTranslations } from 'next-intl/server';
import { auth, signOut } from '@/auth';
import { redirect } from 'next/navigation';
import { Button } from '@/web/components/ui/button';

export default async function AdminLayout({
    children,
    params
}: {
    children: React.ReactNode;
    params: Promise<{ locale: string }>;
}) {
    const locale = (await params).locale;
    const t = await getTranslations('Admin.navigation');
    const session = await auth();

    if (!session || session?.user?.role !== 'ADMIN') {
        redirect('/');
    }

    return (
        <div className="flex min-h-screen bg-background">
            <NavigationRail
                className="hidden md:flex"
                header={
                    <div className="flex flex-col items-center gap-2 pt-2">
                        <div className="h-10 w-10 rounded-xl bg-primary/20 text-primary flex items-center justify-center m3-shape-flower">
                            <span className="font-bold text-lg">TM</span>
                        </div>
                    </div>
                }
                footer={
                    <form
                        action={async () => {
                            "use server"
                            await signOut({ redirectTo: "/" })
                        }}
                    >
                        <NavigationRailItem
                            type="submit"
                            icon={<LogOut />}
                            label={t('logout')}
                        />
                    </form>
                }
            >
                <Link href={`/${locale}/admin`}>
                    <NavigationRailItem
                        icon={<LayoutDashboard />}
                        label={t('dashboard')}
                        // Simple active check - ideally use pathname client hook
                    />
                </Link>
                <Link href={`/${locale}/admin/clinics`}>
                    <NavigationRailItem
                        icon={<Hospital />}
                        label={t('clinics')}
                    />
                </Link>
                <Link href={`/${locale}/admin/reviews`}>
                    <NavigationRailItem
                        icon={<MessageSquare />}
                        label={t('reviews')}
                    />
                </Link>
                 <Link href={`/${locale}/admin/users`}>
                    <NavigationRailItem
                        icon={<User />}
                        label={t('users')}
                    />
                </Link>
                <Link href={`/${locale}/admin/taxonomy`}>
                    <NavigationRailItem
                        icon={<Layers />}
                        label={t('taxonomy')}
                    />
                </Link>
            </NavigationRail>

            {/* Mobile Bottom Nav Placeholder (optional for now) */}

            <main className="flex-1 overflow-auto">
                {children}
            </main>
        </div>
    );
}
