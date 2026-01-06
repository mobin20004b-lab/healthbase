'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { ShieldCheck, Users, MessageSquare } from 'lucide-react';
import { BentoGrid, BentoItem } from '@/web/components/ui/bento-grid';
import { Card } from '@/web/components/ui/card';

export default function TrustBento() {
    const t = useTranslations('HomePage.trustBento');

    return (
        <section className="py-24 bg-background">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <BentoGrid>
                    {/* Item 1: Trust Counter (Large) - Spans 2 cols, 2 rows */}
                    <BentoItem colSpan={2} rowSpan={2} className="md:col-span-2 md:row-span-2">
                         <Card variant="bento" className="h-full bg-primary-container/10 border-primary/10 flex flex-col justify-between p-8 relative overflow-hidden group">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -mr-16 -mt-16 transition-all duration-700 group-hover:bg-primary/10" />

                            <div className="relative z-10">
                                <div className="p-3 bg-primary/10 w-fit rounded-xl mb-6 text-primary">
                                    <Users className="w-8 h-8" />
                                </div>
                                <h3 className="text-4xl font-bold text-on-surface mb-2">
                                    <CountUp end={15000} suffix="+" />
                                </h3>
                                <p className="text-on-surface-variant text-lg">{t('specialists.label')}</p>
                            </div>

                            <div className="relative z-10 mt-8">
                                <p className="text-on-surface-variant/80 max-w-sm">
                                    {t('specialists.desc')}
                                </p>
                            </div>
                         </Card>
                    </BentoItem>

                    {/* Item 2: HIPAA Secure (Tall) - Spans 1 col, 2 rows */}
                    <BentoItem colSpan={1} rowSpan={2} className="md:col-span-1 md:row-span-2">
                         <Card variant="bento" className="h-full bg-secondary-container/10 border-secondary/10 flex flex-col items-center justify-center p-8 text-center relative overflow-hidden">
                            <motion.div
                                className="mb-6 p-4 bg-secondary/10 rounded-full text-secondary"
                                animate={{ scale: [1, 1.1, 1] }}
                                transition={{ duration: 3, repeat: Infinity }}
                            >
                                <ShieldCheck className="w-12 h-12" />
                            </motion.div>
                            <h3 className="text-xl font-bold text-on-surface mb-2">{t('hipaa.title')}</h3>
                            <p className="text-sm text-on-surface-variant">
                                {t('hipaa.desc')}
                            </p>
                         </Card>
                    </BentoItem>

                     {/* Item 3: Testimonials (Wide) - Spans 1 col, 2 rows */}
                    <BentoItem colSpan={1} rowSpan={2} className="md:col-span-1 md:row-span-2">
                        <Card variant="bento" className="h-full bg-tertiary-container/10 border-tertiary/10 flex flex-col p-6 relative overflow-hidden">
                            <div className="flex items-center gap-2 mb-4 text-tertiary">
                                <MessageSquare className="w-5 h-5" />
                                <span className="font-semibold text-sm">{t('testimonials.title')}</span>
                            </div>

                            <div className="space-y-4">
                                {/* Simple carousel placeholder or stack */}
                                <div className="bg-surface/50 backdrop-blur-sm p-4 rounded-xl border border-outline-variant/50">
                                    <p className="text-sm text-on-surface italic mb-2">&quot;{t('testimonials.story1')}&quot;</p>
                                    <div className="flex items-center gap-2">
                                        <div className="w-6 h-6 rounded-full bg-tertiary/20" />
                                        <span className="text-xs text-on-surface-variant font-medium">Sarah M.</span>
                                    </div>
                                </div>
                                 <div className="bg-surface/50 backdrop-blur-sm p-4 rounded-xl border border-outline-variant/50 opacity-70 scale-95">
                                    <p className="text-sm text-on-surface italic mb-2">&quot;{t('testimonials.story2')}&quot;</p>
                                    <div className="flex items-center gap-2">
                                        <div className="w-6 h-6 rounded-full bg-tertiary/20" />
                                        <span className="text-xs text-on-surface-variant font-medium">Ali R.</span>
                                    </div>
                                </div>
                            </div>
                        </Card>
                    </BentoItem>
                </BentoGrid>
            </div>
        </section>
    );
}

function CountUp({ end, suffix = '' }: { end: number, suffix?: string }) {
    // Basic formatting for numbers
    const formatted = end >= 1000 ? `${(end / 1000).toFixed(0)}k` : end.toString();

    return (
        <span className="tabular-nums">
           {/* In a real app, use framer-motion useSpring or a library */}
           {formatted}{suffix}
        </span>
    );
}
