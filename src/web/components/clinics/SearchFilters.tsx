'use client';

import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { Search, ChevronDown } from 'lucide-react';
import { useRouter } from '@/routing';
import { useSearchParams } from 'next/navigation';
import { Button } from '@/web/components/ui/button';
import { Input } from '@/web/components/ui/input';
import { Card } from '@/web/components/ui/card';
import { Checkbox } from '@/web/components/ui/checkbox';
import { Label } from '@/web/components/ui/label';
import { getProvinces, getCities } from '@/lib/constants/locations';

// Constants for filters
const SPECIALTIES = ['Dentistry', 'Cardiology', 'Dermatology', 'Neurology'];
const INSURANCES = ['Salamat', 'Tamin', 'NiroohayeMosallah'];

export default function SearchFilters() {
    const t = useTranslations('Clinics');
    const router = useRouter();
    const searchParams = useSearchParams();

    // Single value filters
    const [city, setCity] = useState(searchParams.get('city') || '');
    const [province, setProvince] = useState(searchParams.get('province') || '');
    const [q, setQ] = useState(searchParams.get('q') || '');

    // Multi-value filters
    const [specialties, setSpecialties] = useState<string[]>(searchParams.getAll('specialty'));
    const [insurances, setInsurances] = useState<string[]>(searchParams.getAll('insurance'));

    const handleSearch = () => {
        const params = new URLSearchParams();
        if (city) params.set('city', city);
        if (province) params.set('province', province);
        if (q) params.set('q', q);

        specialties.forEach(s => params.append('specialty', s));
        insurances.forEach(i => params.append('insurance', i));

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

    const toggleSpecialty = (value: string, checked: boolean) => {
        if (checked) {
            setSpecialties([...specialties, value]);
        } else {
            setSpecialties(specialties.filter(s => s !== value));
        }
    };

    const toggleInsurance = (value: string, checked: boolean) => {
        if (checked) {
            setInsurances([...insurances, value]);
        } else {
            setInsurances(insurances.filter(i => i !== value));
        }
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
                    <label className="block text-sm font-bold text-on-surface-variant mb-3">{t('specialty')}</label>
                    <div className="space-y-3">
                        {SPECIALTIES.map((spec) => (
                            <div key={spec} className="flex items-center space-x-2 rtl:space-x-reverse">
                                <Checkbox
                                    id={`specialty-${spec}`}
                                    checked={specialties.includes(spec)}
                                    onCheckedChange={(checked) => toggleSpecialty(spec, checked as boolean)}
                                />
                                <Label htmlFor={`specialty-${spec}`} className="cursor-pointer">
                                    {t(`specialties.${spec}`)}
                                </Label>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Insurance Filter */}
                <div>
                    <label className="block text-sm font-bold text-on-surface-variant mb-3">{t('insurance')}</label>
                    <div className="space-y-3">
                        {INSURANCES.map((ins) => (
                            <div key={ins} className="flex items-center space-x-2 rtl:space-x-reverse">
                                <Checkbox
                                    id={`insurance-${ins}`}
                                    checked={insurances.includes(ins)}
                                    onCheckedChange={(checked) => toggleInsurance(ins, checked as boolean)}
                                />
                                <Label htmlFor={`insurance-${ins}`} className="cursor-pointer">
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
