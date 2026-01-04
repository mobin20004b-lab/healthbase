
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { auth } from '@/auth';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Card } from '@/web/components/ui/card';
import {
    LayoutDashboard,
    Hospital,
    MessageSquare,
    ArrowUpRight,
    CheckCircle2,
    Clock,
    TrendingUp,
    Layers,
    Activity,
    Users
} from 'lucide-react';
import prisma from '@/lib/prisma';

export default async function AdminDashboard({ params }: { params: Promise<{ locale: string }> }) {
    const locale = (await params).locale;
    setRequestLocale(locale);
    const t = await getTranslations('Admin.dashboard');

    const session = await auth();
    if (!session || session.user.role !== 'ADMIN') {
        notFound();
    }

    // Fetch stats
    const [totalClinics, verifiedClinics, totalReviews, pendingReviews] = await Promise.all([
        prisma.clinic.count(),
        prisma.clinic.count({ where: { isVerified: true } }),
        prisma.review.count(),
        prisma.review.count({ where: { status: 'PENDING' } })
    ]);

    const stats = [
        {
            label: t('stats.totalClinics'),
            value: totalClinics,
            icon: Hospital,
            color: 'text-primary',
            bg: 'bg-primary/10',
            trend: '+12%'
        },
        {
            label: t('stats.verified'),
            value: verifiedClinics,
            icon: CheckCircle2,
            color: 'text-success',
            bg: 'bg-success/10',
            trend: '+5%'
        },
        {
            label: t('stats.totalReviews'),
            value: totalReviews,
            icon: MessageSquare,
            color: 'text-secondary',
            bg: 'bg-secondary/10',
            trend: '+24%'
        },
        {
            label: t('stats.pendingReviews'),
            value: pendingReviews,
            icon: Clock,
            color: 'text-warning',
            bg: 'bg-warning/10',
            trend: '-2%'
        },
    ];

    const actions = [
        {
            title: t('clinics'),
            description: "Manage clinics, verification and updates",
            href: `/${locale}/admin/clinics`,
            icon: Hospital,
            color: 'bg-primary'
        },
        {
            title: t('reviews'),
            description: "Moderate pending reviews and reports",
            href: `/${locale}/admin/reviews`,
            icon: MessageSquare,
            color: 'bg-secondary'
        },
        {
            title: t('taxonomy.title'),
            description: t('taxonomy.subtitle'),
            href: `/${locale}/admin/taxonomy`,
            icon: Layers,
            color: 'bg-tertiary'
        },
        {
            title: t('users'),
            description: "Manage registered patients",
            href: `/${locale}/admin/patients`,
            icon: Users,
            color: 'bg-secondary' // Reusing secondary or maybe primary
        }
    ];

    return (
        <div className="min-h-screen bg-background py-16">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <header className="mb-12">
                    <div className="flex items-center gap-4 mb-4">
                        <div className="p-3 bg-primary/10 rounded-2xl m3-shape-flower">
                            <LayoutDashboard className="h-8 w-8 text-primary" />
                        </div>
                        <h1 className="text-4xl font-black text-on-surface leading-tight">{t('title')}</h1>
                    </div>
                    <p className="text-xl text-on-surface-variant font-bold">
                        {t('welcome')}
                    </p>
                </header>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                    {stats.map((stat, i) => (
                        <Card key={i} variant="bento" className="p-6 bg-surface-container-lowest border-outline-variant/10 shadow-sm transition-all hover:shadow-md hover:border-primary/20">
                            <div className="flex items-center justify-between mb-4">
                                <div className={`p-3 rounded-2xl ${stat.bg}`}>
                                    <stat.icon className={`h-6 w-6 ${stat.color}`} />
                                </div>
                                <div className="flex items-center gap-1 bg-success/10 px-2 py-1 rounded-full">
                                    <TrendingUp className="h-3 w-3 text-success" />
                                    <span className="text-xs font-bold text-success">{stat.trend}</span>
                                </div>
                            </div>
                            <div className="text-3xl font-black text-on-surface mb-1">{stat.value}</div>
                            <div className="text-sm font-bold text-on-surface-variant">{stat.label}</div>
                            <div className="text-xs text-on-surface-variant/60 mt-2">{t('stats.trend')}</div>
                        </Card>
                    ))}
                </div>

                {/* Patient Flow Visualization (Mock Sankey) */}
                <div className="mb-12">
                    <div className="flex items-center gap-3 mb-6">
                        <Activity className="h-6 w-6 text-primary" />
                        <h2 className="text-2xl font-black text-on-surface">{t('flow.title')}</h2>
                    </div>
                    <Card variant="filled" className="p-8 bg-surface-container border border-outline-variant/10">
                         <div className="flex flex-col md:flex-row items-center justify-between gap-4 md:gap-0 relative">
                            {/* Connector Line (Desktop) */}
                            <div className="hidden md:block absolute top-1/2 left-0 w-full h-1 bg-gradient-to-r from-primary/20 via-primary/40 to-primary/20 -translate-y-1/2 z-0" />

                            {[
                                { label: t('flow.checkIn'), value: '124', color: 'bg-primary' },
                                { label: t('flow.exam'), value: '98', color: 'bg-secondary' },
                                { label: t('flow.lab'), value: '45', color: 'bg-tertiary' },
                                { label: t('flow.discharge'), value: '122', color: 'bg-success' }
                            ].map((step, i) => (
                                <div key={i} className="relative z-10 flex flex-col items-center gap-3 bg-surface p-4 rounded-2xl shadow-sm border border-outline-variant/20 min-w-[140px]">
                                    <div className={`w-3 h-3 rounded-full ${step.color} ring-4 ring-surface`} />
                                    <span className="text-2xl font-black text-on-surface">{step.value}</span>
                                    <span className="text-sm font-bold text-on-surface-variant uppercase tracking-wider">{step.label}</span>
                                </div>
                            ))}
                         </div>
                    </Card>
                </div>

                {/* Quick Actions */}
                <h2 className="text-2xl font-black text-on-surface mb-8 px-2">Quick Management</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {actions.map((action, i) => (
                        <Link key={i} href={action.href} className="group">
                            <Card variant="bento" className="p-8 h-full transition-all group-hover:bg-surface-container-high group-hover:border-primary/30 group-hover:shadow-xl group-hover:shadow-primary/10 relative overflow-hidden">
                                <div className="relative z-10">
                                    <div className={`w-14 h-14 rounded-2xl ${action.icon === Hospital ? 'bg-primary/10 text-primary' :
                                        action.icon === MessageSquare ? 'bg-secondary/10 text-secondary' :
                                            'bg-tertiary/10 text-tertiary'
                                        } flex items-center justify-center mb-6 m3-shape-flower group-hover:scale-110 transition-transform`}>
                                        <action.icon className="h-8 w-8" />
                                    </div>
                                    <div className="flex items-center justify-between mb-2">
                                        <h3 className="text-2xl font-black text-on-surface group-hover:text-primary transition-colors">{action.title}</h3>
                                        <ArrowUpRight className="h-6 w-6 text-on-surface-variant opacity-0 group-hover:opacity-100 transition-all translate-y-2 group-hover:translate-y-0" />
                                    </div>
                                    <p className="text-on-surface-variant font-medium text-lg leading-relaxed">
                                        {action.description}
                                    </p>
                                </div>
                                <div className={`absolute top-0 right-0 w-32 h-32 ${action.icon === Hospital ? 'bg-primary/5' :
                                    action.icon === MessageSquare ? 'bg-secondary/5' :
                                        'bg-tertiary/5'
                                    } blur-3xl -mr-16 -mt-16 group-hover:scale-150 transition-transform`} />
                            </Card>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}
