'use client';

import { useTranslations } from 'next-intl';
import { BentoGrid, BentoItem } from '@/web/components/ui/bento-grid';
import { ShieldCheck, Star } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

export default function TrustBento() {
    const t = useTranslations('HomePage.trustBento');
    const [index, setIndex] = useState(0);

    const testimonials = [
        t('testimonial1'),
        t('testimonial2'),
        t('testimonial3'),
    ];

    useEffect(() => {
        const timer = setInterval(() => {
            setIndex((prev) => (prev + 1) % testimonials.length);
        }, 5000);
        return () => clearInterval(timer);
    }, [testimonials.length]);

    return (
        <section className="py-12 sm:py-24 bg-surface-container-low/50">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <BentoGrid className="lg:grid-rows-2">
                    {/* Item 1: Counter - Large visual impact */}
                    <BentoItem colSpan={2} rowSpan={2} className="relative overflow-hidden bg-primary-container text-on-primary-container flex flex-col justify-center items-center min-h-[300px]">
                        <div className="absolute inset-0 bg-[url('/noise.png')] opacity-10 mix-blend-soft-light"></div>
                        <motion.div
                            initial={{ opacity: 0, scale: 0.5 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.8, ease: "backOut" }}
                            viewport={{ once: true }}
                            className="text-center z-10"
                        >
                            <h3 className="text-5xl sm:text-7xl font-bold tracking-tighter mb-4">
                                {t('specialists')}
                            </h3>
                            <p className="text-lg sm:text-xl opacity-90 font-medium">
                                Verified across the country
                            </p>
                        </motion.div>
                        {/* Decorative circles */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                        <div className="absolute bottom-0 left-0 w-48 h-48 bg-black/5 rounded-full blur-2xl translate-y-1/2 -translate-x-1/3"></div>
                    </BentoItem>

                    {/* Item 2: Security - HIPAA */}
                    <BentoItem colSpan={1} rowSpan={1} className="bg-surface border-outline-variant hover:border-primary/50 flex flex-col items-center justify-center gap-4 group">
                        <motion.div
                            whileHover={{ rotate: [0, -10, 10, 0] }}
                            transition={{ duration: 0.5 }}
                            className="p-4 rounded-full bg-tertiary/10 text-tertiary group-hover:bg-tertiary group-hover:text-on-tertiary transition-colors"
                        >
                            <ShieldCheck className="w-8 h-8 sm:w-10 sm:h-10" />
                        </motion.div>
                        <span className="font-semibold text-lg text-on-surface">{t('hipaa')}</span>
                    </BentoItem>

                    {/* Item 3: Testimonials - Carousel */}
                    <BentoItem colSpan={1} rowSpan={2} className="bg-surface-container-high flex flex-col p-8 justify-between relative overflow-hidden">
                        <div className="flex items-center gap-2 mb-6">
                            <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                            <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                            <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                            <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                            <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                        </div>

                        <div className="relative h-32">
                            <AnimatePresence mode="wait">
                                <motion.p
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    transition={{ duration: 0.5 }}
                                    className="text-xl font-medium text-on-surface italic leading-relaxed"
                                >
                                    &quot;{testimonials[index]}&quot;
                                </motion.p>
                            </AnimatePresence>
                        </div>

                        <div className="mt-auto pt-4 border-t border-outline-variant/20">
                            <p className="text-sm font-semibold text-on-surface-variant uppercase tracking-wider">
                                {t('testimonials')}
                            </p>
                        </div>
                    </BentoItem>

                    {/* Item 4: Call to Action / Extra Info */}
                    <BentoItem colSpan={1} rowSpan={1} className="bg-secondary-container text-on-secondary-container flex items-center justify-center">
                        <div className="text-center">
                            <p className="text-3xl font-bold">4.9/5</p>
                            <p className="text-sm opacity-80 mt-1">Average Rating</p>
                        </div>
                    </BentoItem>
                </BentoGrid>
            </div>
        </section>
    );
}
