'use client';

import { useTranslations } from 'next-intl';
import { motion, useScroll, useTransform, Variants } from 'framer-motion';
import { useRef } from 'react';
import { ShieldCheck, UserCheck, Quote } from 'lucide-react';
import { BentoGrid, BentoItem } from '@/web/components/ui/bento-grid';
import { Card } from '@/web/components/ui/card';

export default function TrustBentoGrid() {
    const t = useTranslations('HomePage.stats');
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    const y = useTransform(scrollYProgress, [0, 1], [50, -50]);

    // Unused variable
    // const opacity = useTransform(scrollYProgress, [0, 0.2], [0, 1]);

    const counterVariants: Variants = {
        hidden: { opacity: 0, scale: 0.5 },
        visible: {
            opacity: 1,
            scale: 1,
            transition: {
                type: "spring",
                stiffness: 100,
                damping: 10
            }
        }
    };

    return (
        <section ref={containerRef} className="py-24 bg-surface-container-low relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-[10%] left-[5%] w-64 h-64 bg-secondary/5 rounded-full blur-3xl" />
                <div className="absolute bottom-[10%] right-[5%] w-80 h-80 bg-primary/5 rounded-full blur-3xl" />
            </div>

            <div className="container px-4 mx-auto relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl md:text-4xl font-bold text-on-surface mb-4">
                        {t('title')}
                    </h2>
                    <p className="text-lg text-on-surface-variant max-w-2xl mx-auto">
                        {t('subtitle')}
                    </p>
                </motion.div>

                <BentoGrid className="grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[minmax(200px,auto)]">
                    {/* Counter Card */}
                    <BentoItem colSpan={1} rowSpan={1}>
                        <Card className="h-full flex flex-col items-center justify-center p-8 bg-surface border-outline-variant relative overflow-hidden group hover:shadow-lg transition-all duration-300">
                             <div className="absolute inset-0 bg-primary/5 scale-0 group-hover:scale-100 transition-transform duration-500 rounded-xl" />
                             <motion.div
                                variants={counterVariants}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true }}
                                className="relative z-10 text-center"
                             >
                                <div className="text-5xl font-bold text-primary mb-2 flex items-center justify-center gap-1">
                                    <span>15k</span>
                                    <span className="text-3xl text-primary/80">+</span>
                                </div>
                                <div className="flex items-center justify-center gap-2 text-on-surface-variant font-medium">
                                    <UserCheck className="w-5 h-5" />
                                    {t('users')}
                                </div>
                             </motion.div>
                        </Card>
                    </BentoItem>

                    {/* Security Card */}
                    <BentoItem colSpan={1} rowSpan={1}>
                        <Card className="h-full flex flex-col items-center justify-center p-8 bg-surface-container border-outline-variant relative overflow-hidden group hover:shadow-lg transition-all duration-300">
                            <motion.div
                                style={{ y }}
                                className="absolute -right-8 -top-8 w-32 h-32 bg-tertiary/10 rounded-full blur-xl"
                            />

                            <motion.div
                                initial={{ scale: 0.8, opacity: 0 }}
                                whileInView={{ scale: 1, opacity: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.2 }}
                                className="relative z-10 flex flex-col items-center text-center"
                            >
                                <div className="bg-tertiary-container text-on-tertiary-container p-4 rounded-full mb-4 shadow-sm group-hover:scale-110 transition-transform duration-300">
                                    <ShieldCheck className="w-8 h-8" />
                                </div>
                                <h3 className="text-xl font-semibold text-on-surface mb-1">{t('hipaa')}</h3>
                                <p className="text-on-surface-variant text-sm">
                                    {t('hipaaDesc')}
                                </p>
                            </motion.div>
                        </Card>
                    </BentoItem>

                    {/* Testimonials Carousel */}
                    <BentoItem colSpan={1} rowSpan={1} className="md:col-span-1">
                         <Card className="h-full flex flex-col p-6 bg-secondary-container text-on-secondary-container relative overflow-hidden">
                            <Quote className="absolute top-4 left-4 w-10 h-10 opacity-20" />
                            <div className="mt-auto relative z-10">
                                <motion.div
                                    initial={{ opacity: 0, x: 20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.4 }}
                                >
                                    <p className="text-lg font-medium italic mb-4 leading-relaxed">
                                        "{t('testimonial')}"
                                    </p>
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full bg-on-secondary-container/20 flex items-center justify-center font-bold">
                                            JD
                                        </div>
                                        <div>
                                            <div className="font-semibold">John Doe</div>
                                            <div className="text-xs opacity-70">Verified Patient</div>
                                        </div>
                                    </div>
                                </motion.div>
                            </div>
                        </Card>
                    </BentoItem>
                </BentoGrid>
            </div>
        </section>
    );
}
