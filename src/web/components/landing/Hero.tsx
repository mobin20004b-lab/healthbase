'use client';

import { useTranslations, useMessages } from 'next-intl';
import { useState, useEffect } from 'react';
import { useRouter } from '@/routing'; // Localized router
import { Search } from 'lucide-react';
import { Button } from '@/web/components/ui/button';
import { Input } from '@/web/components/ui/input';
import { motion } from 'framer-motion';

export default function Hero() {
    const t = useTranslations('HomePage');
    const tClinics = useTranslations('Clinics');
    const messages = useMessages();
    const router = useRouter();
    const [q, setQ] = useState('');
    const [currentCityIndex, setCurrentCityIndex] = useState(0);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const cities = Object.keys((messages.Clinics as any)?.cities || {});

    useEffect(() => {
        if (cities.length === 0) return;
        const interval = setInterval(() => {
            setCurrentCityIndex((prev) => (prev + 1) % cities.length);
        }, 2000); // Slower interval for better readability
        return () => clearInterval(interval);
    }, [cities.length]);

    const handleSearch = () => {
        if (!q.trim()) return;
        // next-intl useRouter automatically handles locale prefix
        router.push(`/clinics?q=${encodeURIComponent(q)}`);
    };

    return (
        <div className="relative overflow-hidden bg-background py-20 sm:py-32 lg:pb-32 xl:pb-36 rtl:text-right">
            {/* Background decorative elements - Material 3 Expressive inspired */}
            <div className="absolute inset-0 -z-10 overflow-hidden">
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] bg-primary/10 blur-[100px] m3-shape-flower"
                />
                <motion.div
                     initial={{ opacity: 0, scale: 0.8 }}
                     animate={{ opacity: 1, scale: 1 }}
                     transition={{ duration: 1.5, delay: 0.2, ease: "easeOut" }}
                    className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-tertiary/10 blur-[80px] m3-shape-flower"
                />
            </div>

            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="lg:grid lg:grid-cols-12 lg:gap-x-8 lg:gap-y-20 flex flex-col items-center">
                    <div className="relative z-10 mx-auto max-w-2xl lg:col-span-7 lg:max-w-none lg:pt-6 xl:col-span-6">
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                            className="text-4xl font-extrabold tracking-tight text-on-surface sm:text-6xl text-balance leading-tight"
                        >
                            {t.rich('title', {
                                city: (chunks) => (
                                    <span key={currentCityIndex} className="inline-block min-w-[8ch] relative">
                                        <motion.span
                                            key={cities[currentCityIndex]}
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -10 }}
                                            transition={{ duration: 0.5 }}
                                            className="text-primary inline-block"
                                        >
                                            {cities.length > 0 ? tClinics(`cities.${cities[currentCityIndex]}`) : ''}
                                        </motion.span>
                                    </span>
                                )
                            })}
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                            className="mt-6 text-lg text-on-surface-variant leading-relaxed"
                        >
                            {t('subtitle')}
                        </motion.p>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
                            className="mt-10 flex flex-wrap gap-x-6 gap-y-4"
                        >
                            {/* Smart Search Bar - Spatial UI */}
                            <div className="flex w-full max-w-lg items-center rounded-2xl border border-outline-variant bg-surface-container-lowest/80 backdrop-blur-xl p-1.5 shadow-2xl shadow-primary/5 focus-within:ring-2 focus-within:ring-primary focus-within:border-transparent transition-all hover:shadow-primary/10">
                                <div className="pl-4">
                                    <Search className="h-5 w-5 text-on-surface-variant" />
                                </div>
                                <Input
                                    type="text"
                                    value={q}
                                    onChange={(e) => setQ(e.target.value)}
                                    onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                                    placeholder={t('searchPlaceholder')}
                                    className="flex-1 border-none bg-transparent shadow-none focus-visible:ring-0 text-lg h-auto py-3 placeholder:text-on-surface-variant/50"
                                />
                                <Button
                                    onClick={handleSearch}
                                    size="lg"
                                    className="rounded-xl shadow-md"
                                >
                                    {t('searchButton')}
                                </Button>
                            </div>
                        </motion.div>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1, delay: 0.3 }}
                        className="relative mt-10 sm:mt-20 lg:col-span-5 lg:row-span-2 lg:mt-0 xl:col-span-6 flex justify-center"
                    >
                        {/* Abstract Element with Motion */}
                        <div className="relative aspect-square w-full max-w-[440px] flex items-center justify-center">
                            <motion.div
                                animate={{
                                    scale: [1, 1.1, 1],
                                    rotate: [0, 5, -5, 0]
                                }}
                                transition={{
                                    duration: 10,
                                    repeat: Infinity,
                                    repeatType: "reverse"
                                }}
                                className="absolute inset-0 rounded-full bg-gradient-to-tr from-primary/20 to-tertiary/20 opacity-40 blur-3xl"
                            ></motion.div>

                            {/* Material 3 Expressive Shapes in Motion */}
                            <div className="relative w-full h-full flex items-center justify-center">
                                <motion.div
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                                    className="absolute w-64 h-64 bg-primary/20 m3-shape-flower blur-xl opacity-60"
                                />
                                <motion.div
                                    animate={{ rotate: -360 }}
                                    transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                                    className="absolute w-48 h-48 bg-tertiary/20 m3-shape-flower blur-lg opacity-40"
                                />

                                <motion.div
                                    whileHover={{ scale: 1.05 }}
                                    transition={{ type: "spring", stiffness: 300 }}
                                    className="m3-bento-card p-10 bg-surface-container-highest/60 backdrop-blur-2xl border-white/40 shadow-2xl relative z-10 m3-shape-squircle cursor-default"
                                >
                                    <div className="flex flex-col items-center gap-6">
                                        <div className="h-20 w-20 rounded-2xl bg-primary/10 flex items-center justify-center m3-shape-flower">
                                            <div className="h-10 w-10 rounded-lg bg-primary" />
                                        </div>
                                        <div className="space-y-4 w-40">
                                            <div className="h-3 w-full bg-on-surface-variant/20 rounded-full" />
                                            <div className="h-3 w-2/3 bg-on-surface-variant/10 rounded-full" />
                                        </div>
                                    </div>
                                </motion.div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
