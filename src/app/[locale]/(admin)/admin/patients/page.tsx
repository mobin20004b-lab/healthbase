
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { auth } from '@/auth';
import { notFound } from 'next/navigation';
import { Users } from 'lucide-react';
import prisma from '@/lib/prisma';
import PatientTable from '@/web/components/admin/patients/patient-table';

export default async function PatientsPage({ params }: { params: Promise<{ locale: string }> }) {
    const locale = (await params).locale;
    setRequestLocale(locale);
    const t = await getTranslations('Admin.patients');

    const session = await auth();
    if (!session || session.user.role !== 'ADMIN') {
        notFound();
    }

    // Fetch users who are not admins (assuming 'USER' is the default role for patients)
    // We can filter by role usually. If role is simple string, it works.
    const rawUsers = await prisma.user.findMany({
        where: {
            role: 'USER'
        },
        select: {
            id: true,
            name: true,
            email: true,
            role: true,
            image: true,
            createdAt: true
        },
        orderBy: {
            createdAt: 'desc'
        },
        take: 50 // Limit for now, pagination can be added later
    });

    // Serialize dates to strings to avoid "Date object cannot be passed to Client Component" error
    const users = rawUsers.map(user => ({
        ...user,
        createdAt: user.createdAt.toISOString()
    }));

    return (
        <div className="min-h-screen bg-background py-8">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <header className="mb-8 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-secondary/10 rounded-2xl m3-shape-flower">
                            <Users className="h-8 w-8 text-secondary" />
                        </div>
                        <div>
                            <h1 className="text-3xl font-black text-on-surface leading-tight">{t('title')}</h1>
                            <p className="text-on-surface-variant font-medium mt-1">
                                {t('subtitle')}
                            </p>
                        </div>
                    </div>
                </header>

                <div className="mt-8">
                    <PatientTable users={users} />
                </div>
            </div>
        </div>
    );
}
