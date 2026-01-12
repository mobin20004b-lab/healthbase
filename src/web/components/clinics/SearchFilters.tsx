'use client';

import { useTranslations } from 'next-intl';
import { useState, useEffect } from 'react';
import { Search, ChevronDown, ChevronUp } from 'lucide-react';
import { useRouter } from '@/routing'; // Localized router
import { useSearchParams } from 'next/navigation';
import { Button } from '@/web/components/ui/button';
import { Input } from '@/web/components/ui/input';
import { Checkbox } from '@/web/components/ui/checkbox';
import { getProvinces, getCities } from '@/lib/constants/locations';
import { cn } from '@/lib/utils';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface SearchFiltersProps {
    // locale: string;
}

export default function SearchFilters({}: SearchFiltersProps) {
    const t = useTranslations('Clinics');
    const router = useRouter();
    const searchParams = useSearchParams();

    const [city, setCity] = useState(searchParams.get('city') || '');
    const [province, setProvince] = useState(searchParams.get('province') || '');
    const [q, setQ] = useState(searchParams.get('q') || '');

    // Multi-select states
    const [specialties, setSpecialties] = useState<string[]>(
        searchParams.get('specialty') ? searchParams.get('specialty')!.split(',') : []
    );
    const [insurances, setInsurances] = useState<string[]>(
        searchParams.get('insurance') ? searchParams.get('insurance')!.split(',') : []
    );

    // Collapsible states
    const [isSpecialtyOpen, setIsSpecialtyOpen] = useState(true);
    const [isInsuranceOpen, setIsInsuranceOpen] = useState(true);

    useEffect(() => {
        // Sync state with URL params on mount or when params change externally
        setCity(searchParams.get('city') || '');
        setProvince(searchParams.get('province') || '');
        setQ(searchParams.get('q') || '');
        setSpecialties(searchParams.get('specialty') ? searchParams.get('specialty')!.split(',') : []);
        setInsurances(searchParams.get('insurance') ? searchParams.get('insurance')!.split(',') : []);
    }, [searchParams]);

    const handleSearch = () => {
        const params = new URLSearchParams(); // Start clean or preserve?
        // Let's preserve current params but override the ones we control
        // Actually, if we use set/delete logic on a new object derived from searchParams, it's safer.
        // But for cleanliness in MVP, let's rebuild relevant ones.

        if (city) params.set('city', city);
        if (province) params.set('province', province);
        if (q) params.set('q', q);
        if (specialties.length > 0) params.set('specialty', specialties.join(','));
        if (insurances.length > 0) params.set('insurance', insurances.join(','));

        // Push to /search with localized router
        router.push(`/search?${params.toString()}`);
    };

    const handleClear = () => {
        setCity('');
        setProvince('');
        setQ('');
        setSpecialties([]);
        setInsurances([]);
        router.push(`/search`);
    };

    const toggleSpecialty = (value: string) => {
        setSpecialties(prev =>
            prev.includes(value) ? prev.filter(item => item !== value) : [...prev, value]
        );
    };

    const toggleInsurance = (value: string) => {
        setInsurances(prev =>
            prev.includes(value) ? prev.filter(item => item !== value) : [...prev, value]
        );
    };

    const specialtyOptions = [
        { value: "Dentistry", label: "Dentistry" },
        { value: "Cardiology", label: "Cardiology" },
        { value: "Dermatology", label: "Dermatology" },
        { value: "Neurology", label: "Neurology" },
        { value: "Orthopedics", label: "Orthopedics" },
        { value: "Pediatrics", label: "Pediatrics" },
    ];

    const insuranceOptions = [
        { value: "Salamat", label: "Salamat" },
        { value: "Tamin", label: "Tamin Social Security" },
        { value: "NiroohayeMosallah", label: "Armed Forces" },
        { value: "Dana", label: "Dana Insurance" },
        { value: "Asia", label: "Asia Insurance" },
    ];

    // Helper to safely translate or fallback
    const safeTranslate = (key: string, fallback: string) => {
        const translated = t(key);
        // next-intl returns the key if translation is missing (or namespaced key)
        // We check if it matches the key or the full namespaced path (which is what usually happens)
        // Actually, t('specialties.Dentistry') returns 'Dentistry' (the value in json)
        // If missing, it returns 'specialties.Dentistry'.
        return translated === key || translated.includes('.') ? fallback : translated;
    };

    return (
        <div className="space-y-6 pb-20 lg:pb-0">
            <div className="flex items-center justify-between mb-2">
                <h2 className="text-lg font-bold text-on-surface">{t('filters')}</h2>
                <Button variant="ghost" size="sm" onClick={handleClear} className="font-bold text-primary h-8 px-2">
                    {t('clearAll')}
                </Button>
            </div>

            {/* Search Input */}
            <div className="space-y-2">
                <label className="text-sm font-bold text-on-surface-variant">{t('search')}</label>
                <div className="relative">
                    <Input
                        type="text"
                        value={q}
                        onChange={(e) => setQ(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                        placeholder={safeTranslate('searchPlaceholder', 'Search clinics...')}
                        className="pl-10 h-11"
                    />
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-on-surface-variant" />
                </div>
            </div>

            {/* Location Filters */}
            <div className="space-y-4">
                <div className="space-y-2">
                    <label className="text-sm font-bold text-on-surface-variant">{t('province')}</label>
                    <div className="relative">
                        <select
                            value={province}
                            onChange={(e) => {
                                setProvince(e.target.value);
                                setCity('');
                            }}
                            className="w-full px-4 py-2.5 bg-surface-container-high border border-outline-variant rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none appearance-none cursor-pointer text-on-surface font-medium"
                        >
                            <option value="">{t('all')}</option>
                            {getProvinces().map((prov) => (
                                <option key={prov.value} value={prov.value}>
                                    {safeTranslate(prov.label, prov.value)}
                                </option>
                            ))}
                        </select>
                        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-on-surface-variant pointer-events-none" />
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-bold text-on-surface-variant">{t('city')}</label>
                    <div className="relative">
                        <select
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                            className="w-full px-4 py-2.5 bg-surface-container-high border border-outline-variant rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none appearance-none cursor-pointer text-on-surface font-medium disabled:opacity-50"
                            disabled={!province}
                        >
                            <option value="">{t('all')}</option>
                            {province && getCities(province).map((c) => (
                                <option key={c.value} value={c.value}>
                                    {safeTranslate(c.label, c.value)}
                                </option>
                            ))}
                        </select>
                        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-on-surface-variant pointer-events-none" />
                    </div>
                </div>
            </div>

            {/* Specialty Filter (Checkbox List) */}
            <div className="border-t border-outline-variant/20 pt-4">
                <button
                    onClick={() => setIsSpecialtyOpen(!isSpecialtyOpen)}
                    className="flex items-center justify-between w-full mb-2 group"
                >
                    <label className="text-sm font-bold text-on-surface-variant cursor-pointer group-hover:text-primary transition-colors">{t('specialty')}</label>
                    {isSpecialtyOpen ? <ChevronUp className="h-4 w-4 text-on-surface-variant" /> : <ChevronDown className="h-4 w-4 text-on-surface-variant" />}
                </button>

                {isSpecialtyOpen && (
                    <div className="space-y-1 animate-in slide-in-from-top-2 duration-200">
                        {specialtyOptions.map((opt) => (
                            <div key={opt.value} className="flex items-center gap-2 py-1">
                                <Checkbox
                                    id={`specialty-${opt.value}`}
                                    checked={specialties.includes(opt.value)}
                                    onCheckedChange={() => toggleSpecialty(opt.value)}
                                />
                                <label
                                    htmlFor={`specialty-${opt.value}`}
                                    className="text-sm text-on-surface cursor-pointer select-none"
                                >
                                    {safeTranslate(`specialties.${opt.value}`, opt.label)}
                                </label>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Insurance Filter (Checkbox List) */}
            <div className="border-t border-outline-variant/20 pt-4">
                 <button
                    onClick={() => setIsInsuranceOpen(!isInsuranceOpen)}
                    className="flex items-center justify-between w-full mb-2 group"
                >
                    <label className="text-sm font-bold text-on-surface-variant cursor-pointer group-hover:text-primary transition-colors">{t('insurance')}</label>
                    {isInsuranceOpen ? <ChevronUp className="h-4 w-4 text-on-surface-variant" /> : <ChevronDown className="h-4 w-4 text-on-surface-variant" />}
                </button>

                {isInsuranceOpen && (
                    <div className="space-y-1 animate-in slide-in-from-top-2 duration-200">
                        {insuranceOptions.map((opt) => (
                            <div key={opt.value} className="flex items-center gap-2 py-1">
                                <Checkbox
                                    id={`insurance-${opt.value}`}
                                    checked={insurances.includes(opt.value)}
                                    onCheckedChange={() => toggleInsurance(opt.value)}
                                />
                                <label
                                    htmlFor={`insurance-${opt.value}`}
                                    className="text-sm text-on-surface cursor-pointer select-none"
                                >
                                    {safeTranslate(`insurances.${opt.value}`, opt.label)}
                                </label>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <Button
                onClick={handleSearch}
                className="w-full h-12 text-base sticky bottom-0 shadow-lg lg:relative lg:bottom-auto lg:shadow-none z-10"
            >
                {t('applyFilters')}
            </Button>
        </div>
    );
}
