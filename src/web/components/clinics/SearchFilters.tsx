'use client';

import { useState } from 'react';
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

const SPECIALTIES = [
    'Dentistry',
    'Cardiology',
    'Dermatology',
    'Neurology',
    'Orthopedics',
    'Pediatrics',
    'General',
    'Surgery',
    'Gynecology',
    'Obstetrics',
    'Ophthalmology'
];

const INSURANCES = [
    'Salamat',
    'Tamin',
    'NiroohayeMosallah',
    'International'
];

export default function SearchFilters({}: SearchFiltersProps) {
    // const t = useTranslations('Clinics');
    // Mock translation for now to avoid errors if keys missing
    const t = (key: string) => {
        if (key.startsWith('specialties.')) return key.split('.')[1];
        if (key.startsWith('insurances.')) return key.split('.')[1];
        const map: Record<string, string> = {
            filters: 'Filters',
            clearAll: 'Clear All',
            search: 'Search',
            searchPlaceholder: 'Search clinics...',
            province: 'Province',
            city: 'City',
            specialty: 'Specialty',
            insurance: 'Insurance',
            all: 'All',
            applyFilters: 'Apply Filters'
        };
        return map[key] || key;
    };

    const router = useRouter();
    const searchParams = useSearchParams();

    const [city, setCity] = useState(searchParams.get('city') || '');
    const [province, setProvince] = useState(searchParams.get('province') || '');
    const [q, setQ] = useState(searchParams.get('q') || '');

    // Multi-select states
    // Initial state derived from URL.
    // We rely on the parent providing a `key` based on searchParams to reset state on URL changes.
    const [specialties, setSpecialties] = useState<string[]>(searchParams.get('specialty')?.split(',').filter(Boolean) || []);
    const [insurances, setInsurances] = useState<string[]>(searchParams.get('insurance')?.split(',').filter(Boolean) || []);

    const handleSearch = () => {
        const params = new URLSearchParams(); // Reset params to ensure clean state or use existing?
        // Usually we want to keep other params, but here we are controlling all filters.
        // Let's iterate existing params if there are any we don't control, but here we control all.

        if (city) params.set('city', city);
        if (province) params.set('province', province);
        if (q) params.set('q', q);

        if (specialties.length > 0) {
            params.set('specialty', specialties.join(','));
        }

        if (insurances.length > 0) {
            params.set('insurance', insurances.join(','));
        }

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

    return (
        <Card variant="bento" className="p-6 sticky top-24 h-[calc(100vh-100px)] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-bold text-on-surface">{t('filters')}</h2>
                <Button variant="ghost" size="sm" onClick={handleClear} className="font-bold text-primary">
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
                            placeholder={t('searchPlaceholder')}
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
                                    {prov.label}
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
                                    {c.label}
                                </option>
                            ))}
                        </select>
                        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-on-surface-variant pointer-events-none" />
                    </div>
                </div>

                {/* Specialty Filter - Checkboxes */}
                <div>
                    <label className="block text-sm font-bold text-on-surface-variant mb-3">{t('specialty')}</label>
                    <div className="space-y-3 max-h-48 overflow-y-auto pr-2 custom-scrollbar">
                        {SPECIALTIES.map((spec) => (
                            <div key={spec} className="flex items-center space-x-2">
                                <Checkbox
                                    id={`spec-${spec}`}
                                    checked={specialties.includes(spec)}
                                    onChange={() => toggleSpecialty(spec)}
                                />
                                <Label
                                    htmlFor={`spec-${spec}`}
                                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                                >
                                    {t(`specialties.${spec}`)}
                                </Label>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Insurance Filter - Checkboxes */}
                <div>
                    <label className="block text-sm font-bold text-on-surface-variant mb-3">{t('insurance')}</label>
                    <div className="space-y-3">
                        {INSURANCES.map((ins) => (
                            <div key={ins} className="flex items-center space-x-2">
                                <Checkbox
                                    id={`ins-${ins}`}
                                    checked={insurances.includes(ins)}
                                    onChange={() => toggleInsurance(ins)}
                                />
                                <Label
                                    htmlFor={`ins-${ins}`}
                                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                                >
                                    {t(`insurances.${ins}`)}
                                </Label>
                            </div>
                        ))}
                    </div>
                </div>

                <Button
                    onClick={handleSearch}
                    className="w-full h-12 text-base sticky bottom-0"
                >
                    {t('applyFilters')}
                </Button>
            </div>
        </Card>
    );
}
