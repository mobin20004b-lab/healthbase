'use client';

import { useTranslations, useMessages } from 'next-intl';
import { useState, useEffect } from 'react';
import { useRouter } from '@/routing';
import { Search, MapPin, ShieldPlus, ChevronDown } from 'lucide-react';
import { Button } from '@/web/components/ui/button';
import { Input } from '@/web/components/ui/input';
import { motion } from 'framer-motion';

export default function Hero() {
    const t = useTranslations('HomePage');
    const tClinics = useTranslations('Clinics');
    const messages = useMessages();
    const router = useRouter();

    // Search States
    const [condition, setCondition] = useState('');
    const [location, setLocation] = useState('');
    const [insurance, setInsurance] = useState('');

    // Ticker State
    const [currentCityIndex, setCurrentCityIndex] = useState(0);

    // Safe access to nested messages
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const citiesMsg = (messages.Clinics as any)?.locations?.cities || {};
    const cities = Object.keys(citiesMsg);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const insurancesMsg = (messages.Clinics as any)?.insurances || {};
    const insurances = Object.keys(insurancesMsg);

    useEffect(() => {
        if (cities.length === 0) return;
        const interval = setInterval(() => {
            setCurrentCityIndex((prev) => (prev + 1) % cities.length);
        }, 2000);
        return () => clearInterval(interval);
    }, [cities.length]);

    const handleSearch = () => {
        const params = new URLSearchParams();
        if (condition) params.set('q', condition);
        if (location) params.set('city', location);
        if (insurance) params.set('insurance', insurance);

        router.push(`/clinics?${params.toString()}`);
    };

    return (
        <div className="relative overflow-hidden bg-background py-20 sm:py-32 lg:pb-32 xl:pb-36 rtl:text-right">
            {/* Background decorative elements */}
            <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] bg-primary/10 blur-[100px] m3-shape-flower animate-pulse" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-tertiary/10 blur-[80px] m3-shape-flower" />
            </div>

            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="lg:grid lg:grid-cols-12 lg:gap-x-8 lg:gap-y-20 flex flex-col items-center">
                    <div className="relative z-10 mx-auto max-w-2xl lg:col-span-7 lg:max-w-none lg:pt-6 xl:col-span-6">
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            className="text-4xl font-extrabold tracking-tight text-on-surface sm:text-6xl text-balance leading-tight"
                        >
                            Convergence of Care, <br/>
                            <span className="text-primary">Intelligence</span>, and Design
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                            className="mt-6 text-lg text-on-surface-variant leading-relaxed"
                        >
                           Find the best care in
                           <span className="inline-flex ml-2 font-semibold text-primary">
                             {cities.length > 0 ? tClinics(`locations.cities.${cities[currentCityIndex]}`) : 'Your City'}
                           </span>
                        </motion.p>

                        <motion.div
                             initial={{ opacity: 0, scale: 0.95 }}
                             animate={{ opacity: 1, scale: 1 }}
                             transition={{ duration: 0.5, delay: 0.2 }}
                             className="mt-10"
                        >
                            {/* Zocdoc-style Search Bar */}
                            <div className="flex flex-col md:flex-row w-full bg-surface-container-low rounded-3xl shadow-xl border border-outline-variant/50 overflow-hidden divide-y md:divide-y-0 md:divide-x divide-outline-variant/50">

                                {/* Condition / Doctor Input */}
                                <div className="flex-1 p-2 relative group hover:bg-surface-container-high/50 transition-colors">
                                    <div className="absolute top-3 left-4 pointer-events-none">
                                        <Search className="w-5 h-5 text-on-surface-variant/50 group-focus-within:text-primary transition-colors" />
                                    </div>
                                    <Input
                                        type="text"
                                        placeholder="Condition, procedure, doctor..."
                                        value={condition}
                                        onChange={(e) => setCondition(e.target.value)}
                                        className="w-full h-12 pl-10 bg-transparent border-none shadow-none focus-visible:ring-0 text-base"
                                    />
                                </div>

                                {/* Location Select */}
                                <div className="md:w-1/4 p-2 relative group hover:bg-surface-container-high/50 transition-colors">
                                     <div className="absolute top-3 left-4 pointer-events-none">
                                        <MapPin className="w-5 h-5 text-on-surface-variant/50 group-focus-within:text-primary transition-colors" />
                                    </div>
                                    <select
                                        className="w-full h-12 pl-10 bg-transparent border-none outline-none text-base text-on-surface appearance-none cursor-pointer"
                                        value={location}
                                        onChange={(e) => setLocation(e.target.value)}
                                    >
                                        <option value="">{tClinics('city')}</option>
                                        {cities.map((cityKey) => (
                                            <option key={cityKey} value={cityKey}>
                                                {tClinics(`locations.cities.${cityKey}`)}
                                            </option>
                                        ))}
                                    </select>
                                    <div className="absolute top-3 right-4 pointer-events-none">
                                        <ChevronDown className="w-5 h-5 text-on-surface-variant/50" />
                                    </div>
                                </div>

                                {/* Insurance Select */}
                                <div className="md:w-1/4 p-2 relative group hover:bg-surface-container-high/50 transition-colors">
                                     <div className="absolute top-3 left-4 pointer-events-none">
                                        <ShieldPlus className="w-5 h-5 text-on-surface-variant/50 group-focus-within:text-primary transition-colors" />
                                    </div>
                                    <select
                                        className="w-full h-12 pl-10 bg-transparent border-none outline-none text-base text-on-surface appearance-none cursor-pointer"
                                        value={insurance}
                                        onChange={(e) => setInsurance(e.target.value)}
                                    >
                                        <option value="">{tClinics('insurance')}</option>
                                        {insurances.map((insKey) => (
                                            <option key={insKey} value={insKey}>
                                                {tClinics(`insurances.${insKey}`)}
                                            </option>
                                        ))}
                                    </select>
                                    <div className="absolute top-3 right-4 pointer-events-none">
                                        <ChevronDown className="w-5 h-5 text-on-surface-variant/50" />
                                    </div>
                                </div>

                                {/* Search Button */}
                                <div className="p-2">
                                    <Button
                                        onClick={handleSearch}
                                        className="w-full h-full rounded-2xl text-lg font-medium shadow-none"
                                    >
                                        <Search className="w-5 h-5 md:hidden mr-2" />
                                        {t('searchButton')}
                                    </Button>
                                </div>
                            </div>
                        </motion.div>
                    </div>

                    {/* Right Side Visuals */}
                    <div className="relative mt-10 sm:mt-20 lg:col-span-5 lg:row-span-2 lg:mt-0 xl:col-span-6 flex justify-center">
                        <div className="relative aspect-square w-full max-w-[440px] flex items-center justify-center">
                            <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-primary/20 to-tertiary/20 opacity-40 blur-3xl animate-pulse"></div>

                            {/* Animated Shapes */}
                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                                className="absolute w-64 h-64 bg-primary/20 m3-shape-flower blur-xl opacity-60"
                            />
                            <motion.div
                                animate={{ rotate: -360 }}
                                transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                                className="absolute w-48 h-48 bg-tertiary/20 m3-shape-flower blur-lg opacity-40"
                            />

                            {/* Floating Card */}
                            <motion.div
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.5, duration: 0.8 }}
                                className="m3-bento-card p-8 bg-surface-container-highest/60 backdrop-blur-2xl border-white/40 shadow-2xl relative z-10 m3-shape-squircle w-64 h-64 flex flex-col items-center justify-center"
                            >
                                <div className="h-20 w-20 rounded-2xl bg-primary/10 flex items-center justify-center m3-shape-flower mb-6">
                                    <div className="h-10 w-10 rounded-lg bg-primary animate-pulse" />
                                </div>
                                <div className="space-y-4 w-full px-4">
                                    <div className="h-3 w-full bg-on-surface-variant/20 rounded-full" />
                                    <div className="h-3 w-2/3 bg-on-surface-variant/10 rounded-full" />
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
