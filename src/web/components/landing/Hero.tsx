'use client';

import { useTranslations, useMessages } from 'next-intl';
import { useState, useEffect } from 'react';
import { useRouter } from '@/routing'; // Localized router
import { Search, MapPin, ChevronDown } from 'lucide-react';
import { Button } from '@/web/components/ui/button';
import { Input } from '@/web/components/ui/input';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/web/components/ui/dropdown-menu";
import { cn } from '@/lib/utils';

export default function Hero() {
    const t = useTranslations('HomePage');
    const tClinics = useTranslations('Clinics');
    const messages = useMessages();
    const router = useRouter();

    // Search State
    const [q, setQ] = useState('');
    const [location, setLocation] = useState('');
    const [currentCityIndex, setCurrentCityIndex] = useState(0);

    // Dynamic Cities for Typewriter effect
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const cities = Object.keys((messages.Clinics as any)?.locations?.cities || {});
    // Common specialties for quick select (could be dynamic later)
    const quickSpecialties = ['Dentistry', 'Cardiology', 'Dermatology', 'Neurology'];

    useEffect(() => {
        if (cities.length === 0) return;
        const interval = setInterval(() => {
            setCurrentCityIndex((prev) => (prev + 1) % cities.length);
        }, 2000);
        return () => clearInterval(interval);
    }, [cities.length]);

    const handleSearch = () => {
        const params = new URLSearchParams();
        if (q.trim()) params.append('q', q);
        if (location.trim()) params.append('city', location); // Assuming backend filters by 'city' param

        // next-intl useRouter automatically handles locale prefix
        router.push(`/clinics?${params.toString()}`);
    };

    return (
        <div className="relative overflow-hidden bg-background py-20 sm:py-32 lg:pb-32 xl:pb-36 rtl:text-right">
            {/* Background decorative elements - Material 3 Expressive inspired */}
            <div className="absolute inset-0 -z-10 overflow-hidden">
                <div className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] bg-primary/10 blur-[100px] m3-shape-flower animate-pulse" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-tertiary/10 blur-[80px] m3-shape-flower" />
            </div>

            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="lg:grid lg:grid-cols-12 lg:gap-x-8 lg:gap-y-20 flex flex-col items-center">
                    <div className="relative z-10 mx-auto max-w-2xl lg:col-span-7 lg:max-w-none lg:pt-6 xl:col-span-6 text-center lg:text-left rtl:lg:text-right">
                        <h1 className="text-4xl font-extrabold tracking-tight text-on-surface sm:text-6xl text-balance leading-tight">
                            {t.rich('title', {
                                city: () => (
                                    <span
                                        key={cities[currentCityIndex]}
                                        className="inline-block min-w-[8ch] text-primary animate-in fade-in slide-in-from-bottom-2 duration-500"
                                    >
                                        {cities.length > 0 ? tClinics(`locations.cities.${cities[currentCityIndex]}`) : ''}
                                    </span>
                                )
                            })}
                        </h1>
                        <p className="mt-6 text-lg text-on-surface-variant leading-relaxed">
                            {t('subtitle')}
                        </p>
                        <div className="mt-10 flex flex-wrap gap-4 justify-center lg:justify-start">
                            {/* Smart Search Bar - Split Input Design */}
                            <div className="flex flex-col sm:flex-row w-full max-w-2xl items-stretch sm:items-center rounded-3xl border border-outline-variant bg-surface-container-lowest/90 backdrop-blur-xl p-2 shadow-xl shadow-primary/5 focus-within:ring-2 focus-within:ring-primary focus-within:border-transparent transition-all">

                                {/* Input 1: Condition / Doctor */}
                                <div className="flex-1 flex items-center px-4 py-2 border-b sm:border-b-0 sm:border-r border-outline-variant/50 relative">
                                    <Search className="h-5 w-5 text-primary shrink-0 mr-3 rtl:ml-3 rtl:mr-0" />
                                    <div className="flex-1">
                                        <Input
                                            type="text"
                                            value={q}
                                            onChange={(e) => setQ(e.target.value)}
                                            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                                            placeholder={t('searchPlaceholder')}
                                            className="w-full border-none bg-transparent shadow-none focus-visible:ring-0 text-base h-auto p-0 placeholder:text-on-surface-variant/70"
                                        />
                                    </div>
                                </div>

                                {/* Input 2: Location */}
                                <div className="flex-1 flex items-center px-4 py-2 relative">
                                    <MapPin className="h-5 w-5 text-primary shrink-0 mr-3 rtl:ml-3 rtl:mr-0" />
                                    <div className="flex-1">
                                         <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <button className="w-full text-left rtl:text-right flex items-center justify-between text-base text-on-surface py-1 hover:text-primary transition-colors focus:outline-none">
                                                    <span className={cn(!location && "text-on-surface-variant/70")}>
                                                        {location ? tClinics(`locations.cities.${location}`) : t('searchCity')}
                                                    </span>
                                                    <ChevronDown className="h-4 w-4 opacity-50" />
                                                </button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent className="max-h-[300px] overflow-y-auto">
                                                {cities.map((city) => (
                                                    <DropdownMenuItem key={city} onClick={() => setLocation(city)}>
                                                        {tClinics(`locations.cities.${city}`)}
                                                    </DropdownMenuItem>
                                                ))}
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </div>
                                </div>

                                {/* Search Button */}
                                <div className="p-1">
                                    <Button
                                        onClick={handleSearch}
                                        size="lg"
                                        className="w-full sm:w-auto rounded-2xl h-12 px-8 font-semibold text-lg shadow-md hover:shadow-lg transition-all"
                                    >
                                        {t('searchButton')}
                                    </Button>
                                </div>
                            </div>
                        </div>

                        {/* Quick Links / Badges */}
                        <div className="mt-6 flex flex-wrap gap-2 justify-center lg:justify-start text-sm text-on-surface-variant">
                             <span className="opacity-70">Popular:</span>
                             {quickSpecialties.map(s => (
                                 <button
                                    key={s}
                                    onClick={() => { setQ(s); handleSearch(); }}
                                    className="hover:text-primary underline underline-offset-4 decoration-primary/30 hover:decoration-primary transition-all"
                                 >
                                     {tClinics(`specialties.${s}`)}
                                 </button>
                             ))}
                        </div>
                    </div>

                    <div className="relative mt-10 sm:mt-20 lg:col-span-5 lg:row-span-2 lg:mt-0 xl:col-span-6 flex justify-center">
                        {/* Abstract Element with Motion */}
                        <div className="relative aspect-square w-full max-w-[440px] flex items-center justify-center">
                            <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-primary/20 to-tertiary/20 opacity-40 blur-3xl animate-pulse"></div>

                            {/* Material 3 Expressive Shapes in Motion */}
                            <div className="relative w-full h-full flex items-center justify-center">
                                <div className="absolute w-64 h-64 bg-primary/20 m3-shape-flower animate-spin-slow blur-xl opacity-60" />
                                <div className="absolute w-48 h-48 bg-tertiary/20 m3-shape-flower animate-reverse-spin-slow blur-lg opacity-40" />

                                <div className="m3-bento-card p-10 bg-surface-container-highest/60 backdrop-blur-2xl border-white/40 shadow-2xl relative z-10 m3-shape-squircle transform transition-transform hover:scale-105 duration-500">
                                    <div className="flex flex-col items-center gap-6">
                                        <div className="h-20 w-20 rounded-2xl bg-primary/10 flex items-center justify-center m3-shape-flower text-primary">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5l7 7-7 7"/><path d="M5 12h14"/></svg>
                                        </div>
                                        <div className="space-y-4 w-40">
                                            <div className="h-3 w-full bg-on-surface-variant/20 rounded-full animate-pulse" />
                                            <div className="h-3 w-2/3 bg-on-surface-variant/10 rounded-full animate-pulse delay-75" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
