'use client';

import { useTranslations } from 'next-intl';
import { ShieldCheck, Search, Heart } from 'lucide-react';
import { Card } from '@/web/components/ui/card';
import { motion } from 'framer-motion';

export default function ValueProps() {
    const t = useTranslations('HomePage.valueProps');


    return (
        <div className="bg-background py-24 sm:py-32">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="mx-auto max-w-2xl text-center mb-16"
                >
                    <h2 className="text-sm font-black uppercase tracking-[0.4em] text-primary/60">{t('title') || 'TOPMEDICA'}</h2>
                    <p className="mt-2 text-4xl font-black tracking-tight text-on-surface sm:text-6xl text-balance leading-tight">
                        {t('header') || 'Everything you need to find care'}
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-6 gap-6">
                    {/* Primary Feature - Large Bento Card */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="md:col-span-4"
                    >
                        <Card variant="bento" className="h-full p-10 bg-primary-container/20 group hover:bg-primary-container/30 transition-all border-primary/10 overflow-hidden">
                            <div className="flex flex-col h-full justify-between relative z-10">
                                <div>
                                    <div className="h-20 w-20 rounded-2xl bg-primary/10 flex items-center justify-center mb-10 m3-shape-flower group-hover:scale-110 transition-transform shadow-inner">
                                        <Search className="h-10 w-10 text-primary" />
                                    </div>
                                    <h3 className="text-4xl font-black text-on-surface group-hover:text-primary transition-colors leading-tight mb-4">{t('transparency')}</h3>
                                    <p className="text-xl text-on-surface-variant font-medium leading-relaxed max-w-md">
                                        {t('transparencyDesc')}
                                    </p>
                                </div>
                            </div>
                            <div className="absolute top-[-10%] right-[-10%] h-64 w-64 bg-primary/5 m3-shape-flower blur-3xl group-hover:bg-primary/10 transition-all opacity-50" />
                        </Card>
                    </motion.div>

                    {/* Secondary Feature - Higher Density */}
                    <motion.div
                         initial={{ opacity: 0, x: 20 }}
                         whileInView={{ opacity: 1, x: 0 }}
                         viewport={{ once: true }}
                         transition={{ duration: 0.6, delay: 0.2 }}
                         className="md:col-span-2"
                    >
                        <Card variant="bento" className="h-full p-8 bg-secondary-container/20 group hover:bg-secondary-container/30 transition-all border-secondary/10">
                            <div className="h-16 w-16 rounded-2xl bg-secondary/10 flex items-center justify-center mb-8 m3-shape-flower group-hover:scale-110 transition-transform">
                                <ShieldCheck className="h-8 w-8 text-secondary" />
                            </div>
                            <h3 className="text-2xl font-black text-on-surface group-hover:text-secondary transition-colors leading-tight mb-3">{t('quality')}</h3>
                            <p className="text-base text-on-surface-variant font-bold leading-relaxed">
                                {t('qualityDesc')}
                            </p>
                        </Card>
                    </motion.div>

                    {/* Tertiary Feature - Custom Shape / Accented */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        className="md:col-span-2"
                    >
                        <Card variant="bento" className="h-full p-8 bg-tertiary-container/30 group hover:bg-tertiary-container/40 transition-all border-tertiary/10">
                            <div className="h-16 w-16 rounded-2xl bg-tertiary/10 flex items-center justify-center mb-8 m3-shape-flower group-hover:scale-110 transition-transform">
                                <Heart className="h-8 w-8 text-tertiary" />
                            </div>
                            <h3 className="text-2xl font-black text-on-surface group-hover:text-tertiary transition-colors leading-tight mb-3">{t('choice')}</h3>
                            <p className="text-base text-on-surface-variant font-bold leading-relaxed">
                                {t('choiceDesc')}
                            </p>
                        </Card>
                    </motion.div>

                    {/* Visual Filler / Brand Accent Card */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        className="md:col-span-4"
                    >
                        <Card variant="bento" className="h-full p-1 relative overflow-hidden group border-outline-variant/30">
                            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-secondary/5 to-tertiary/5 transition-opacity group-hover:opacity-80" />
                            <div className="relative h-full w-full flex items-center justify-center p-8 bg-surface-container-lowest/40 backdrop-blur-sm rounded-[calc(var(--radius-xl)-2px)]">
                                <div className="flex gap-6">
                                    <div className="h-16 w-16 bg-primary/20 m3-shape-flower animate-pulse shadow-lg" />
                                    <div className="h-16 w-16 bg-secondary/20 m3-shape-squircle animate-pulse [animation-delay:200ms] shadow-lg" />
                                    <div className="h-16 w-16 bg-tertiary/20 m3-shape-flower animate-pulse [animation-delay:400ms] shadow-lg" />
                                </div>
                            </div>
                        </Card>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
