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
import { getProvinces, getCities } from '@/lib/constants/locations';

interface SearchFiltersProps {
    basePath?: string;
}

export default function SearchFilters({ basePath = '/clinics' }: SearchFiltersProps) {
    const t = useTranslations('Clinics');
    const router = useRouter();
    const searchParams = useSearchParams();

    // Parse initial state from URL
    const initialSpecialties = searchParams.getAll('specialty').length > 0
        ? searchParams.getAll('specialty')
        : searchParams.get('specialty')?.split(',').filter(Boolean) || [];

    const initialInsurances = searchParams.getAll('insurance').length > 0
        ? searchParams.getAll('insurance')
        : searchParams.get('insurance')?.split(',').filter(Boolean) || [];

    const [city, setCity] = useState(searchParams.get('city') || '');
    const [province, setProvince] = useState(searchParams.get('province') || '');
    const [q, setQ] = useState(searchParams.get('q') || '');
    const [specialties, setSpecialties] = useState<string[]>(initialSpecialties);
    const [insurances, setInsurances] = useState<string[]>(initialInsurances);

    // Update local state when URL changes (e.g. back button)
    useEffect(() => {
        setCity(searchParams.get('city') || '');
        setProvince(searchParams.get('province') || '');
        setQ(searchParams.get('q') || '');

        const urlSpecialties = searchParams.getAll('specialty').length > 0
            ? searchParams.getAll('specialty')
            : searchParams.get('specialty')?.split(',').filter(Boolean) || [];
        setSpecialties(urlSpecialties);

        const urlInsurances = searchParams.getAll('insurance').length > 0
            ? searchParams.getAll('insurance')
            : searchParams.get('insurance')?.split(',').filter(Boolean) || [];
        setInsurances(urlInsurances);
    }, [searchParams]);

    const handleSearch = () => {
        const params = new URLSearchParams();
        if (city) params.set('city', city);
        if (province) params.set('province', province);
        if (q) params.set('q', q);

        // Use multiple keys for arrays (standard) or comma separated
        // Let's use comma separated for cleaner URL in this specific implementation
        // as per typical Next.js patterns unless backend requires strictly otherwise.
        // Actually, let's stick to standard append for robustness if multiple values.
        // But previously I used getAll in init logic, so let's check.
        // To be safe and cleaner URL:
        if (specialties.length > 0) params.set('specialty', specialties.join(','));
        if (insurances.length > 0) params.set('insurance', insurances.join(','));

        // useRouter from next-intl automatically handles locale prefix
        router.push(`${basePath}?${params.toString()}`);
    };

    const handleClear = () => {
        setCity('');
        setProvince('');
        setQ('');
        setSpecialties([]);
        setInsurances([]);
        router.push(basePath);
    };

    const toggleSpecialty = (value: string) => {
        setSpecialties(prev =>
            prev.includes(value)
                ? prev.filter(item => item !== value)
                : [...prev, value]
        );
    };

    const toggleInsurance = (value: string) => {
        setInsurances(prev =>
            prev.includes(value)
                ? prev.filter(item => item !== value)
                : [...prev, value]
        );
    };

    const specialtyOptions = [
        { value: "Dentistry", label: t('specialties.Dentistry') },
        { value: "Cardiology", label: t('specialties.Cardiology') },
        { value: "Dermatology", label: t('specialties.Dermatology') },
        { value: "Neurology", label: t('specialties.Neurology') },
    ];

    const insuranceOptions = [
        { value: "Salamat", label: t('insurances.Salamat') },
        { value: "Tamin", label: t('insurances.Tamin') },
        { value: "NiroohayeMosallah", label: t('insurances.NiroohayeMosallah') },
    ];

    return (
        <Card variant="bento" className="p-6 sticky top-24 h-full overflow-y-auto max-h-[calc(100vh-120px)]">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-bold text-on-surface">{t('filters')}</h2>
                <Button variant="ghost" size="sm" onClick={handleClear} className="font-bold text-primary">
                    {t('clearAll')}
                </Button>
            </div>

            <div className="space-y-8">
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

                {/* Province & City */}
                <div className="space-y-4">
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
                </div>

                {/* Specialty Filter (Checkbox) */}
                <div>
                    <label className="block text-sm font-bold text-on-surface-variant mb-3">{t('specialty')}</label>
                    <div className="space-y-3">
                        {specialtyOptions.map((option) => (
                            <div key={option.value} className="flex items-center space-x-3 space-x-reverse">
                                <Checkbox
                                    id={`specialty-${option.value}`}
                                    checked={specialties.includes(option.value)}
                                    onCheckedChange={() => toggleSpecialty(option.value)}
                                    onChange={() => toggleSpecialty(option.value)} // Fallback for native input inside Checkbox if onCheckedChange isn't wired
                                />
                                <label
                                    htmlFor={`specialty-${option.value}`}
                                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer text-on-surface"
                                >
                                    {option.label}
                                </label>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Insurance Filter (Checkbox) */}
                <div>
                    <label className="block text-sm font-bold text-on-surface-variant mb-3">{t('insurance')}</label>
                    <div className="space-y-3">
                        {insuranceOptions.map((option) => (
                            <div key={option.value} className="flex items-center space-x-3 space-x-reverse">
                                <Checkbox
                                    id={`insurance-${option.value}`}
                                    checked={insurances.includes(option.value)}
                                    onCheckedChange={() => toggleInsurance(option.value)}
                                    onChange={() => toggleInsurance(option.value)}
                                />
                                <label
                                    htmlFor={`insurance-${option.value}`}
                                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer text-on-surface"
                                >
                                    {option.label}
                                </label>
                            </div>
                        ))}
                    </div>
                </div>

                <Button
                    onClick={handleSearch}
                    className="w-full h-12 text-base rounded-xl"
                >
                    {t('applyFilters')}
                </Button>
            </div>
        </Card>
    );
}
