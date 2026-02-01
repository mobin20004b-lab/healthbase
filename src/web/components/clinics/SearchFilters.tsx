'use client';

import { useTranslations } from 'next-intl';
import { useState, useEffect } from 'react';
import { Search, ChevronDown } from 'lucide-react';
import { useRouter, usePathname } from '@/routing';
import { useSearchParams } from 'next/navigation';
import { Button } from '@/web/components/ui/button';
import { Input } from '@/web/components/ui/input';
import { Card } from '@/web/components/ui/card';
import { Checkbox } from '@/web/components/ui/checkbox';
import { Label } from '@/web/components/ui/label';
import { getProvinces, getCities } from '@/lib/constants/locations';

const SPECIALTIES = ['Dentistry', 'Cardiology', 'Dermatology', 'Neurology', 'Orthopedics', 'Pediatrics'];
const INSURANCES = ['Salamat', 'Tamin', 'NiroohayeMosallah', 'Dana', 'Asia'];

export default function SearchFilters() {
    const t = useTranslations('Clinics');
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const [city, setCity] = useState(searchParams.get('city') || '');
    const [province, setProvince] = useState(searchParams.get('province') || '');
    const [q, setQ] = useState(searchParams.get('q') || '');
    const [specialties, setSpecialties] = useState<string[]>(searchParams.getAll('specialty') || []);
    const [insurances, setInsurances] = useState<string[]>(searchParams.getAll('insurance') || []);
    const [minRating, setMinRating] = useState(searchParams.get('minRating') || '');

    // Sync local state with URL params on navigation (e.g. back button)
    useEffect(() => {
        setCity(searchParams.get('city') || '');
        setProvince(searchParams.get('province') || '');
        setQ(searchParams.get('q') || '');
        setSpecialties(searchParams.getAll('specialty') || []);
        setInsurances(searchParams.getAll('insurance') || []);
        setMinRating(searchParams.get('minRating') || '');
    }, [searchParams]);

    const handleSearch = () => {
        const params = new URLSearchParams();
        if (city) params.set('city', city);
        if (province) params.set('province', province);
        if (q) params.set('q', q);

        specialties.forEach(s => params.append('specialty', s));
        insurances.forEach(i => params.append('insurance', i));

        if (minRating) params.set('minRating', minRating);

        // Reset page on new search
        // params.delete('page'); // Implicit since we create new URLSearchParams

        router.push(`${pathname}?${params.toString()}`);
    };

    const handleClear = () => {
        setCity('');
        setProvince('');
        setQ('');
        setSpecialties([]);
        setInsurances([]);
        setMinRating('');
        router.push(pathname);
    };

    const toggleSpecialty = (value: string) => {
        setSpecialties(prev =>
            prev.includes(value) ? prev.filter(s => s !== value) : [...prev, value]
        );
    };

    const toggleInsurance = (value: string) => {
        setInsurances(prev =>
            prev.includes(value) ? prev.filter(s => s !== value) : [...prev, value]
        );
    };

    return (
        <Card variant="bento" className="p-6 sticky top-24 max-h-[calc(100vh-120px)] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-bold text-on-surface">{t('filters')}</h2>
                <Button variant="ghost" size="sm" onClick={handleClear} className="font-bold">
                    {t('clearAll')}
                </Button>
            </div>

            <div className="space-y-6">
                {/* Search Input */}
                <div>
                    <Label className="block mb-2 text-on-surface-variant">{t('search')}</Label>
                    <div className="relative">
                        <Input
                            type="text"
                            value={q}
                            onChange={(e) => setQ(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                            placeholder={t('searchPlaceholder') || 'Search...'}
                            className="pl-10 h-11"
                        />
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-on-surface-variant" />
                    </div>
                </div>

                {/* Province Filter */}
                <div>
                    <Label className="block mb-2 text-on-surface-variant">{t('province')}</Label>
                    <div className="relative">
                        <select
                            value={province}
                            onChange={(e) => {
                                setProvince(e.target.value);
                                setCity('');
                            }}
                            className="w-full px-4 py-2.5 bg-surface-variant/30 border border-outline-variant rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none appearance-none cursor-pointer text-on-surface font-bold"
                        >
                            <option value="">{t('all')}</option>
                            {getProvinces().map((prov) => (
                                <option key={prov.value} value={prov.value}>
                                    {t(prov.label)}
                                </option>
                            ))}
                        </select>
                        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-on-surface-variant pointer-events-none" />
                    </div>
                </div>

                {/* City Filter */}
                <div>
                    <Label className="block mb-2 text-on-surface-variant">{t('city')}</Label>
                    <div className="relative">
                        <select
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                            className="w-full px-4 py-2.5 bg-surface-variant/30 border border-outline-variant rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none appearance-none cursor-pointer text-on-surface font-bold"
                            disabled={!province}
                        >
                            <option value="">{t('all')}</option>
                            {province && getCities(province).map((c) => (
                                <option key={c.value} value={c.value}>
                                    {t(c.label)}
                                </option>
                            ))}
                        </select>
                        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-on-surface-variant pointer-events-none" />
                    </div>
                </div>

                {/* Specialty Filter (Checkbox) */}
                <div>
                    <Label className="block mb-3 text-on-surface-variant">{t('specialty')}</Label>
                    <div className="space-y-3">
                        {SPECIALTIES.map((spec) => (
                            <div key={spec} className="flex items-center space-x-2">
                                <Checkbox
                                    id={`spec-${spec}`}
                                    checked={specialties.includes(spec)}
                                    onChange={() => toggleSpecialty(spec)}
                                />
                                <Label htmlFor={`spec-${spec}`} className="font-normal cursor-pointer">
                                    {t(`specialties.${spec}`) || spec}
                                </Label>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Insurance Filter (Checkbox) */}
                <div>
                    <Label className="block mb-3 text-on-surface-variant">{t('insurance')}</Label>
                    <div className="space-y-3">
                        {INSURANCES.map((ins) => (
                            <div key={ins} className="flex items-center space-x-2">
                                <Checkbox
                                    id={`ins-${ins}`}
                                    checked={insurances.includes(ins)}
                                    onChange={() => toggleInsurance(ins)}
                                />
                                <Label htmlFor={`ins-${ins}`} className="font-normal cursor-pointer">
                                    {t(`insurances.${ins}`) || ins}
                                </Label>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Rating Filter */}
                 <div>
                    <Label className="block mb-2 text-on-surface-variant">{t('rating') || 'Minimum Rating'}</Label>
                    <div className="relative">
                        <select
                            value={minRating}
                            onChange={(e) => setMinRating(e.target.value)}
                            className="w-full px-4 py-2.5 bg-surface-variant/30 border border-outline-variant rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none appearance-none cursor-pointer text-on-surface font-bold"
                        >
                            <option value="">{t('anyRating') || 'Any'}</option>
                            <option value="4.5">4.5+ {t('stars') || 'Stars'}</option>
                            <option value="4">4+ {t('stars') || 'Stars'}</option>
                            <option value="3">3+ {t('stars') || 'Stars'}</option>
                        </select>
                         <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-on-surface-variant pointer-events-none" />
                    </div>
                </div>

                <Button
                    onClick={handleSearch}
                    className="w-full h-12 text-base mt-4"
                >
                    {t('applyFilters')}
                </Button>
            </div>
        </Card>
    );
}
