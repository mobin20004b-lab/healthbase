'use client';

import { useTranslations } from 'next-intl';
import { useState, useEffect } from 'react';
import { Search, ChevronDown } from 'lucide-react';
import { useRouter } from '@/routing'; // Localized router
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

const SPECIALTIES = ['Dentistry', 'Cardiology', 'Dermatology', 'Neurology', 'Orthopedics', 'General', 'Surgery'];
const INSURANCES = ['Salamat', 'Tamin', 'NiroohayeMosallah', 'Dana', 'Asia', 'Saman'];

export default function SearchFilters({}: SearchFiltersProps) {
    const t = useTranslations('Clinics');
    const router = useRouter();
    const searchParams = useSearchParams();

    const [city, setCity] = useState(searchParams.get('city') || '');
    const [province, setProvince] = useState(searchParams.get('province') || '');
    const [q, setQ] = useState(searchParams.get('q') || '');
    const [selectedSpecialties, setSelectedSpecialties] = useState<string[]>(
        searchParams.get('specialty')?.split(',').filter(Boolean) || []
    );
    const [selectedInsurances, setSelectedInsurances] = useState<string[]>(
        searchParams.get('insurance')?.split(',').filter(Boolean) || []
    );

    // Update state when URL params change (e.g. browser back button)
    useEffect(() => {
        setCity(searchParams.get('city') || '');
        setProvince(searchParams.get('province') || '');
        setQ(searchParams.get('q') || '');
        setSelectedSpecialties(searchParams.get('specialty')?.split(',').filter(Boolean) || []);
        setSelectedInsurances(searchParams.get('insurance')?.split(',').filter(Boolean) || []);
    }, [searchParams]);


    const handleSearch = () => {
        const params = new URLSearchParams();
        // Preserve existing params if needed, or just set new ones.
        // Here we build fresh to avoid stale keys, but we might want to keep others if any.
        // For this page, these are the main ones.

        if (city) params.set('city', city);
        if (province) params.set('province', province);
        if (q) params.set('q', q);
        if (selectedSpecialties.length > 0) params.set('specialty', selectedSpecialties.join(','));
        if (selectedInsurances.length > 0) params.set('insurance', selectedInsurances.join(','));

        router.push(`/search?${params.toString()}`);
    };

    const handleClear = () => {
        setCity('');
        setProvince('');
        setQ('');
        setSelectedSpecialties([]);
        setSelectedInsurances([]);
        router.push(`/search`);
    };

    const toggleSpecialty = (item: string) => {
        setSelectedSpecialties(prev =>
            prev.includes(item) ? prev.filter(i => i !== item) : [...prev, item]
        );
    };

    const toggleInsurance = (item: string) => {
        setSelectedInsurances(prev =>
            prev.includes(item) ? prev.filter(i => i !== item) : [...prev, item]
        );
    };

    return (
        <Card variant="bento" className="p-6 sticky top-24 max-h-[calc(100vh-6rem)] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-bold text-on-surface">{t('filters')}</h2>
                <Button variant="ghost" size="sm" onClick={handleClear} className="font-bold">
                    {t('clearAll')}
                </Button>
            </div>

            <div className="space-y-6">
                {/* Search Input */}
                <div>
                    <Label className="block mb-2">{t('search')}</Label>
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
                    <Label className="block mb-2">{t('province')}</Label>
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
                    <Label className="block mb-2">{t('city')}</Label>
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
                    <Label className="block mb-3">{t('specialty')}</Label>
                    <div className="space-y-2">
                        {SPECIALTIES.map((spec) => (
                            <div key={spec} className="flex items-center space-x-2 rtl:space-x-reverse">
                                <Checkbox
                                    id={`spec-${spec}`}
                                    checked={selectedSpecialties.includes(spec)}
                                    onCheckedChange={() => toggleSpecialty(spec)}
                                />
                                <Label htmlFor={`spec-${spec}`} className="cursor-pointer font-normal">
                                    {t(`specialties.${spec}`) === `specialties.${spec}` ? spec : t(`specialties.${spec}`)}
                                </Label>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Insurance Filter (Checkbox) */}
                <div>
                    <Label className="block mb-3">{t('insurance')}</Label>
                    <div className="space-y-2">
                        {INSURANCES.map((ins) => (
                             <div key={ins} className="flex items-center space-x-2 rtl:space-x-reverse">
                                <Checkbox
                                    id={`ins-${ins}`}
                                    checked={selectedInsurances.includes(ins)}
                                    onCheckedChange={() => toggleInsurance(ins)}
                                />
                                <Label htmlFor={`ins-${ins}`} className="cursor-pointer font-normal">
                                    {t(`insurances.${ins}`) === `insurances.${ins}` ? ins : t(`insurances.${ins}`)}
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
