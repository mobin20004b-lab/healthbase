'use client';

import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { Search, ChevronDown } from 'lucide-react';
import { useRouter, usePathname } from '@/routing'; // Localized router
import { useSearchParams } from 'next/navigation';
import { Button } from '@/web/components/ui/button';
import { Input } from '@/web/components/ui/input';
import { Card } from '@/web/components/ui/card';
import { Checkbox } from '@/web/components/ui/checkbox';
import { Label } from '@/web/components/ui/label';
import { getProvinces, getCities } from '@/lib/constants/locations';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface SearchFiltersProps {
    // locale: string;
}

const SPECIALTIES = ['Dentistry', 'Cardiology', 'Dermatology', 'Neurology'];
const INSURANCES = ['Salamat', 'Tamin', 'NiroohayeMosallah'];

export default function SearchFilters({}: SearchFiltersProps) {
    const t = useTranslations('Clinics');
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const [city, setCity] = useState(searchParams.get('city') || '');
    const [province, setProvince] = useState(searchParams.get('province') || '');
    const [q, setQ] = useState(searchParams.get('q') || '');

    // Arrays for multi-select
    const [specialties, setSpecialties] = useState<string[]>(searchParams.getAll('specialty') || []);
    const [insurances, setInsurances] = useState<string[]>(searchParams.getAll('insurance') || []);

    const handleSearch = () => {
        const params = new URLSearchParams(searchParams.toString());

        if (city) params.set('city', city); else params.delete('city');
        if (province) params.set('province', province); else params.delete('province');
        if (q) params.set('q', q); else params.delete('q');

        // Handle arrays
        params.delete('specialty');
        specialties.forEach(s => params.append('specialty', s));

        params.delete('insurance');
        insurances.forEach(i => params.append('insurance', i));

        // Use pathname to stay on current page (e.g. /search)
        router.push(`${pathname}?${params.toString()}`);
    };

    const handleClear = () => {
        setCity('');
        setProvince('');
        setQ('');
        setSpecialties([]);
        setInsurances([]);
        router.push(pathname);
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

                {/* Specialty Filter (Checkboxes) */}
                <div>
                    <label className="block text-sm font-bold text-on-surface-variant mb-3">{t('specialty')}</label>
                    <div className="space-y-2">
                        {SPECIALTIES.map((spec) => (
                            <div key={spec} className="flex items-center space-x-2">
                                <Checkbox
                                    id={`spec-${spec}`}
                                    checked={specialties.includes(spec)}
                                    onChange={() => toggleSpecialty(spec)}
                                />
                                <Label htmlFor={`spec-${spec}`} className="cursor-pointer">
                                    {t(`specialties.${spec}`)}
                                </Label>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Insurance Filter (Checkboxes) */}
                <div>
                    <label className="block text-sm font-bold text-on-surface-variant mb-3">{t('insurance')}</label>
                    <div className="space-y-2">
                        {INSURANCES.map((ins) => (
                            <div key={ins} className="flex items-center space-x-2">
                                <Checkbox
                                    id={`ins-${ins}`}
                                    checked={insurances.includes(ins)}
                                    onChange={() => toggleInsurance(ins)}
                                />
                                <Label htmlFor={`ins-${ins}`} className="cursor-pointer">
                                    {t(`insurances.${ins}`)}
                                </Label>
                            </div>
                        ))}
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
