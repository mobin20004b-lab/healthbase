'use client';

import { useTranslations } from 'next-intl';
import { ShieldCheck, Star, Users } from 'lucide-react';
import { BentoGrid, BentoItem } from '@/web/components/ui/bento-grid';
import { Card } from '@/web/components/ui/card';
import { motion } from 'framer-motion';

export default function TrustBento() {
    const t = useTranslations('HomePage.stats');

    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2
            }
        }
    };

    const item = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0 }
    };

    return (
        <section className="py-24 bg-surface-container-low">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <motion.div
                    variants={container}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: "-100px" }}
                >
                    <BentoGrid>
                        {/* 1. Counter: Specialists */}
                        <BentoItem colSpan={2} rowSpan={1}>
                            <motion.div variants={item} className="h-full">
                                <Card variant="filled" className="h-full bg-primary/5 border-primary/10 flex flex-col justify-between p-8 group overflow-hidden relative">
                                    <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity transform group-hover:scale-110 duration-500">
                                        <Users className="w-32 h-32 text-primary" />
                                    </div>
                                    <div className="relative z-10">
                                        <h3 className="text-5xl font-black text-primary mb-2 tracking-tight">
                                            15k+
                                        </h3>
                                        <p className="text-lg font-medium text-on-surface-variant">
                                            Specialists ready to help
                                        </p>
                                    </div>
                                    <div className="mt-8 relative z-10">
                                        <div className="flex -space-x-3">
                                            {[1, 2, 3, 4].map((i) => (
                                                <div key={i} className={`w-10 h-10 rounded-full border-2 border-surface bg-primary/20 flex items-center justify-center text-xs font-bold text-primary`}>
                                                    Dr
                                                </div>
                                            ))}
                                            <div className="w-10 h-10 rounded-full border-2 border-surface bg-surface-container-highest flex items-center justify-center text-xs font-medium text-on-surface-variant">
                                                +
                                            </div>
                                        </div>
                                    </div>
                                </Card>
                            </motion.div>
                        </BentoItem>

                        {/* 2. Trust: HIPAA Secure */}
                        <BentoItem colSpan={1} rowSpan={1}>
                            <motion.div variants={item} className="h-full">
                                <Card variant="outlined" className="h-full flex flex-col items-center justify-center p-6 text-center group hover:bg-surface-container-high transition-colors cursor-default">
                                    <div className="w-16 h-16 rounded-2xl bg-success/10 text-success flex items-center justify-center mb-4 m3-shape-squircle group-hover:scale-110 transition-transform">
                                        <ShieldCheck className="w-8 h-8" />
                                    </div>
                                    <h4 className="text-xl font-bold text-on-surface mb-2">{t('trust')}</h4>
                                    <p className="text-sm text-on-surface-variant">Verified & Secure Data</p>
                                </Card>
                            </motion.div>
                        </BentoItem>

                        {/* 3. Testimonial / Users */}
                        <BentoItem colSpan={1} rowSpan={2}>
                            <motion.div variants={item} className="h-full">
                                <Card variant="elevated" className="h-full bg-tertiary-container/30 border-tertiary/10 p-6 flex flex-col relative overflow-hidden">
                                    <div className="flex items-center gap-1 mb-6 text-tertiary">
                                        {[1, 2, 3, 4, 5].map((i) => (
                                            <Star key={i} className="w-4 h-4 fill-current" />
                                        ))}
                                    </div>
                                    <blockquote className="text-lg font-medium text-on-surface mb-6 flex-1">
                                        "Finally a platform that puts transparency first. I found the best cardiologist in minutes."
                                    </blockquote>
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full bg-tertiary/20 flex items-center justify-center text-tertiary font-bold">
                                            S
                                        </div>
                                        <div>
                                            <div className="font-bold text-on-surface">Sarah M.</div>
                                            <div className="text-xs text-on-surface-variant">Patient</div>
                                        </div>
                                    </div>
                                </Card>
                            </motion.div>
                        </BentoItem>

                        {/* 4. Verified Clinics (Replaces span 2/1 above if needed, but grid fits 4 cols) */}
                        {/* Actually let's make the first one span 2, second span 1, third span 1 vertical? */}
                        {/* Current: Item 1 (2x1), Item 2 (1x1), Item 3 (1x2) -- fills col 1-2, col 3, col 4. */}
                        {/* Row 1 is full. Row 2? Item 3 takes Row 2 Col 4. We need to fill Row 2 Col 1-3. */}

                        <BentoItem colSpan={3} rowSpan={1}>
                            <motion.div variants={item} className="h-full">
                                <Card variant="filled" className="h-full bg-secondary/5 border-secondary/10 p-8 flex items-center justify-between">
                                    <div>
                                        <h3 className="text-3xl font-black text-secondary mb-2">{t('verified')}</h3>
                                        <p className="text-on-surface-variant max-w-md">
                                            Every clinic is manually verified by our medical board to ensure the highest standards of care.
                                        </p>
                                    </div>
                                    <div className="hidden sm:flex gap-4">
                                         <div className="w-24 h-32 rounded-xl bg-surface-container-highest rotate-3 shadow-sm border border-outline-variant/10"></div>
                                         <div className="w-24 h-32 rounded-xl bg-surface-container-highest -rotate-2 shadow-sm border border-outline-variant/10"></div>
                                    </div>
                                </Card>
                            </motion.div>
                        </BentoItem>
                    </BentoGrid>
                </motion.div>
            </div>
        </section>
    );
}
