'use client';

import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { Search, ChevronDown } from 'lucide-react';
import { useRouter } from '@/routing'; // Localized router
import { useSearchParams } from 'next/navigation';
import { Button } from '@/web/components/ui/button';
import { Input } from '@/web/components/ui/input';
import { Card } from '@/web/components/ui/card';
import { getProvinces, getCities } from '@/lib/constants/locations';

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
    const [specialty, setSpecialty] = useState(searchParams.get('specialty') || '');
    const [insurance, setInsurance] = useState(searchParams.get('insurance') || '');

    const handleSearch = () => {
        const params = new URLSearchParams(searchParams.toString());
        if (city) params.set('city', city); else params.delete('city');
        if (province) params.set('province', province); else params.delete('province');
        if (q) params.set('q', q); else params.delete('q');
        if (specialty) params.set('specialty', specialty); else params.delete('specialty');
        if (insurance) params.set('insurance', insurance); else params.delete('insurance');

        // useRouter from next-intl automatically handles locale prefix
        router.push(`/search?${params.toString()}`);
    };

    const handleClear = () => {
        setCity('');
        setProvince('');
        setQ('');
        setSpecialty('');
        setInsurance('');
        router.push(`/search`);
    };

    return (
        <Card variant="bento" className="p-6 sticky top-24">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-bold text-on-surface">{t('filters')}</h2>
                <Button variant="ghost" size="sm" onClick={handleClear} className="font-bold">
                    {t('clearAll')}
                </Button>
            </div>

            <div className="space-y-6">
                {/* Search Input */}
                <div>
                    <label className="block text-sm font-bold text-on-surface-variant mb-2">{t('search')}</label>
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
                    <label className="block text-sm font-bold text-on-surface-variant mb-2">{t('province')}</label>
                    <div className="relative">
                        <select
                            value={province}
                            onChange={(e) => {
                                setProvince(e.target.value);
                                setCity(''); // Reset city when province changes
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
                    <label className="block text-sm font-bold text-on-surface-variant mb-2">{t('city')}</label>
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

                {/* Specialty Filter */}
                <div>
                    <label className="block text-sm font-bold text-on-surface-variant mb-2">{t('specialty')}</label>
                    <div className="relative">
                        <select
                            value={specialty}
                            onChange={(e) => setSpecialty(e.target.value)}
                            className="w-full px-4 py-2.5 bg-surface-variant/30 border border-outline-variant rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none appearance-none cursor-pointer text-on-surface font-bold"
                        >
                            <option value="">{t('all')}</option>
                            <option value="Dentistry">{t('specialties.Dentistry')}</option>
                            <option value="Cardiology">{t('specialties.Cardiology')}</option>
                            <option value="Dermatology">{t('specialties.Dermatology')}</option>
                            <option value="Neurology">{t('specialties.Neurology')}</option>
                        </select>
                        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-on-surface-variant pointer-events-none" />
                    </div>
                </div>

                {/* Insurance Filter */}
                <div>
                    <label className="block text-sm font-bold text-on-surface-variant mb-2">{t('insurance')}</label>
                    <div className="relative">
                        <select
                            value={insurance}
                            onChange={(e) => setInsurance(e.target.value)}
                            className="w-full px-4 py-2.5 bg-surface-variant/30 border border-outline-variant rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none appearance-none cursor-pointer text-on-surface font-bold"
                        >
                            <option value="">{t('all')}</option>
                            <option value="Salamat">{t('insurances.Salamat')}</option>
                            <option value="Tamin">{t('insurances.Tamin')}</option>
                            <option value="NiroohayeMosallah">{t('insurances.NiroohayeMosallah')}</option>
                        </select>
                        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-on-surface-variant pointer-events-none" />
                    </div>
                </div>

                <Button
                    onClick={handleSearch}
                    className="w-full h-12 text-base"
                >
                    {t('applyFilters')}
                </Button>
            </div>
        </Card>
    );
}
