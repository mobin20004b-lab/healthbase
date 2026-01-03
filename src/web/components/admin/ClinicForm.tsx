'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Button } from '@/web/components/ui/button';
import { Input } from '@/web/components/ui/input';
import { Card } from '@/web/components/ui/card';
import { Globe, Save, AlertCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { getProvinces, getCities } from '@/lib/constants/locations';

interface TranslationData {
    name: string;
    description: string;
    address: string;
    city: string;
    province: string;
    country: string;
}

interface ClinicFormProps {
    initialData?: { id?: string; phone?: string; website?: string; image?: string; translations?: { locale: string; name?: string; description?: string; address?: string; city?: string; province?: string; country?: string }[] };
}

export function ClinicForm({ initialData }: ClinicFormProps) {
    const t = useTranslations('Admin.clinics');
    const router = useRouter();
    const [activeTab, setActiveTab] = useState<'fa' | 'en'>('fa');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const [commonData, setCommonData] = useState({
        phone: initialData?.phone || '',
        website: initialData?.website || '',
        image: initialData?.image || ''
    });

    const getInitialTranslation = (locale: string) => {
        const trans = initialData?.translations?.find((t: { locale: string; name?: string; description?: string; address?: string; city?: string; province?: string; country?: string }) => t.locale === locale);
        return {
            name: trans?.name || '',
            description: trans?.description || '',
            address: trans?.address || '',
            city: trans?.city || '',
            province: trans?.province || '',
            country: trans?.country || 'Iran'
        };
    };

    const [translations, setTranslations] = useState<Record<'fa' | 'en', TranslationData>>({
        fa: getInitialTranslation('fa'),
        en: getInitialTranslation('en')
    });

    const handleTranslationChange = (field: keyof TranslationData, value: string) => {
        setTranslations(prev => ({
            ...prev,
            [activeTab]: {
                ...prev[activeTab],
                [field]: value
            }
        }));
    };

    const handleCommonChange = (field: string, value: string) => {
        setCommonData(prev => ({ ...prev, [field]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const url = initialData ? `/api/clinics/${initialData.id}` : '/api/clinics';
            const method = initialData ? 'PUT' : 'POST';

            const res = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    // For the main model, we use Farsi as default or just empty
                    name: translations.fa.name || translations.en.name,
                    description: translations.fa.description || translations.en.description,
                    address: translations.fa.address || translations.en.address,
                    city: translations.fa.city || translations.en.city,
                    province: translations.fa.province || translations.en.province,
                    country: translations.fa.country || translations.en.country || 'Iran',
                    ...commonData,
                    translations: {
                        fa: { ...translations.fa, country: translations.fa.country || 'Iran' },
                        en: { ...translations.en, country: translations.en.country || 'Iran' }
                    }
                })
            });

            if (!res.ok) throw new Error(t('form.error'));

            router.refresh();
        } catch (err: unknown) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError('An unknown error occurred');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-8">
            <Card className="p-8 bg-surface-container-lowest border-outline-variant/10 shadow-sm rounded-[var(--radius-3xl)]">
                {/* Language Tabs */}
                <div className="flex gap-2 mb-8 bg-surface-container-low p-1.5 rounded-2xl w-fit">
                    {(['fa', 'en'] as const).map((lang) => (
                        <button
                            key={lang}
                            type="button"
                            onClick={() => setActiveTab(lang)}
                            className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-black transition-all ${activeTab === lang
                                ? 'bg-primary text-on-primary shadow-lg shadow-primary/20'
                                : 'text-on-surface-variant hover:bg-surface-container-high'
                                }`}
                        >
                            <Globe className={`h-4 w-4 ${activeTab === lang ? 'animate-pulse' : ''}`} />
                            {t(`languages.${lang}`)}
                        </button>
                    ))}
                </div>

                {/* Localized Fields */}
                <div className="grid gap-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
                    <div className="space-y-2">
                        <label className="text-sm font-black text-on-surface-variant ml-2">{t('form.name')}</label>
                        <Input
                            required={activeTab === 'fa'}
                            value={translations[activeTab].name}
                            onChange={(e) => handleTranslationChange('name', e.target.value)}
                            placeholder={t('form.name')}
                            className="bg-surface-container-low border-none h-14 rounded-2xl px-6 font-bold"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-black text-on-surface-variant ml-2">{t('form.description')}</label>
                        <textarea
                            value={translations[activeTab].description}
                            onChange={(e) => handleTranslationChange('description', e.target.value)}
                            className="w-full bg-surface-container-low border-none rounded-2xl p-6 font-bold text-on-surface min-h-[160px] focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                            placeholder={t('form.description')}
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="space-y-2">
                            <label className="text-sm font-black text-on-surface-variant ml-2">{t('form.country')}</label>
                            <Input
                                value={translations[activeTab].country || 'Iran'}
                                readOnly
                                disabled
                                className="bg-surface-container-low/50 border-none h-14 rounded-2xl px-6 font-bold text-on-surface-variant cursor-not-allowed"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-black text-on-surface-variant ml-2">{t('form.province')}</label>
                            <select
                                value={translations[activeTab].province}
                                onChange={(e) => {
                                    handleTranslationChange('province', e.target.value);
                                    handleTranslationChange('city', ''); // Reset city on province change
                                }}
                                className="w-full bg-surface-container-low border-none h-14 rounded-2xl px-6 font-bold text-on-surface outline-none focus:ring-2 focus:ring-primary/20 appearance-none"
                            >
                                <option value="">{t('form.selectProvince')}</option>
                                {getProvinces(translations[activeTab].country || 'Iran').map((prov) => (
                                    <option key={prov.value} value={prov.value}>
                                        {t(prov.label)}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-black text-on-surface-variant ml-2">{t('form.city')}</label>
                            <select
                                value={translations[activeTab].city}
                                onChange={(e) => handleTranslationChange('city', e.target.value)}
                                className="w-full bg-surface-container-low border-none h-14 rounded-2xl px-6 font-bold text-on-surface outline-none focus:ring-2 focus:ring-primary/20 appearance-none"
                                disabled={!translations[activeTab].province}
                            >
                                <option value="">{t('form.selectCity')}</option>
                                {translations[activeTab].province && getCities(translations[activeTab].province, translations[activeTab].country || 'Iran').map((city) => (
                                    <option key={city.value} value={city.value}>
                                        {t(city.label)}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="space-y-2 md:col-span-3">
                            <label className="text-sm font-black text-on-surface-variant ml-2">{t('form.address')}</label>
                            <Input
                                value={translations[activeTab].address}
                                onChange={(e) => handleTranslationChange('address', e.target.value)}
                                placeholder={t('form.address')}
                                className="bg-surface-container-low border-none h-14 rounded-2xl px-6 font-bold"
                            />
                        </div>
                    </div>
                </div>

                <div className="my-10 border-t border-outline-variant/10" />

                {/* Common Fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-sm font-black text-on-surface-variant ml-2">{t('form.phone')}</label>
                        <Input
                            value={commonData.phone}
                            onChange={(e) => handleCommonChange('phone', e.target.value)}
                            type="tel"
                            placeholder="+98 ..."
                            className="bg-surface-container-low border-none h-14 rounded-2xl px-6 font-bold"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-black text-on-surface-variant ml-2">{t('form.website')}</label>
                        <Input
                            value={commonData.website}
                            onChange={(e) => handleCommonChange('website', e.target.value)}
                            type="url"
                            placeholder="https://..."
                            className="bg-surface-container-low border-none h-14 rounded-2xl px-6 font-bold"
                        />
                    </div>
                </div>

                {error && (
                    <div className="mt-8 flex items-center gap-3 p-4 rounded-2xl bg-error-container text-on-error-container font-bold animate-in bounce-in">
                        <AlertCircle className="h-5 w-5" />
                        {error}
                    </div>
                )}

                <div className="mt-12">
                    <Button
                        type="submit"
                        disabled={loading}
                        className="w-full md:w-auto min-w-[200px] h-14 rounded-2xl font-black shadow-xl shadow-primary/20 flex items-center justify-center gap-3"
                    >
                        {loading ? (
                            <div className="h-5 w-5 border-2 border-on-primary border-t-transparent rounded-full animate-spin" />
                        ) : (
                            <Save className="h-5 w-5" />
                        )}
                        {t('form.submit')}
                    </Button>
                </div>
            </Card>
        </form>
    );
}
