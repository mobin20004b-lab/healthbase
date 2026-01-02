
'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { Card } from '@/web/components/ui/card';
import { Button } from '@/web/components/ui/button';
import { Input } from '@/web/components/ui/input';
import { Plus, Edit3, Trash2, Save, X, Layers, Stethoscope, ShieldCheck } from 'lucide-react';

interface Translation {
    locale: string;
    name: string;
}

interface TaxonomyItem {
    id: string;
    name: string | null;
    translations: Translation[];
}

interface TaxonomyData {
    categories: TaxonomyItem[];
    specialties: TaxonomyItem[];
    insurances: TaxonomyItem[];
}

export function TaxonomyManager({ locale }: { locale: string }) {
    const t = useTranslations('Admin.taxonomy');
    const [data, setData] = useState<TaxonomyData | null>(null);
    const [activeTab, setActiveTab] = useState<'category' | 'specialty' | 'insurance'>('category');
    const [editingItem, setEditingItem] = useState<{ id: string | null; type: string; name: string; nameFa: string } | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchTaxonomy();
    }, []);

    const fetchTaxonomy = async () => {
        setLoading(true);
        try {
            const res = await fetch('/api/admin/taxonomy');
            if (res.ok) {
                const json = await res.json();
                setData(json);
            }
        } catch (error) {
            console.error('Error fetching taxonomy:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSave = async () => {
        if (!editingItem) return;

        const isNew = editingItem.id === null;
        const url = isNew ? '/api/admin/taxonomy' : `/api/admin/taxonomy/${editingItem.type}/${editingItem.id}`;
        const method = isNew ? 'POST' : 'PUT';

        try {
            const res = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    type: editingItem.type,
                    name: editingItem.name,
                    translations: [
                        { locale: 'en', name: editingItem.name },
                        { locale: 'fa', name: editingItem.nameFa }
                    ]
                })
            });

            if (res.ok) {
                setEditingItem(null);
                fetchTaxonomy();
            }
        } catch (error) {
            console.error('Error saving taxonomy:', error);
        }
    };

    const handleDelete = async (type: string, id: string) => {
        if (!confirm(t('deleteConfirm', { type: t(`types.${type as any}`) }))) return;

        try {
            const res = await fetch(`/api/admin/taxonomy/${type}/${id}`, { method: 'DELETE' });
            if (res.ok) {
                fetchTaxonomy();
            }
        } catch (error) {
            console.error('Error deleting taxonomy:', error);
        }
    };

    if (loading) return <div className="p-20 text-center font-bold">Loading...</div>;
    if (!data) return <div className="p-20 text-center font-bold">Error loading data.</div>;

    const currentItems = activeTab === 'category' ? data.categories :
        activeTab === 'specialty' ? data.specialties :
            data.insurances;

    const TabButton = ({ type, label, icon: Icon }: any) => (
        <button
            onClick={() => setActiveTab(type)}
            className={`flex items-center gap-3 px-8 py-4 rounded-2xl font-black transition-all ${activeTab === type
                    ? 'bg-primary text-on-primary shadow-lg shadow-primary/20 scale-105'
                    : 'bg-surface-container-low text-on-surface-variant hover:bg-surface-container-high'
                }`}
        >
            <Icon className="h-5 w-5" />
            {label}
        </button>
    );

    return (
        <div className="space-y-12">
            <div className="flex flex-wrap gap-4">
                <TabButton type="category" label={t('categories')} icon={Layers} />
                <TabButton type="specialty" label={t('specialties')} icon={Stethoscope} />
                <TabButton type="insurance" label={t('insurances')} icon={ShieldCheck} />
            </div>

            <Card className="p-8 bg-surface-container-low rounded-[var(--radius-3xl)] border border-outline-variant/10">
                <div className="flex justify-between items-center mb-8">
                    <h2 className="text-2xl font-black text-on-surface">{t(`${activeTab as any}s`)}</h2>
                    <Button
                        onClick={() => setEditingItem({ id: null, type: activeTab, name: '', nameFa: '' })}
                        className="rounded-xl font-black gap-2"
                    >
                        <Plus className="h-5 w-5" />
                        {t('addNew', { type: t(`types.${activeTab as any}`) })}
                    </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {editingItem && editingItem.id === null && (
                        <Card className="p-6 bg-primary/5 border-primary/20 border-2 border-dashed">
                            <div className="space-y-4">
                                <Input
                                    placeholder={t('name')}
                                    value={editingItem.name}
                                    onChange={e => setEditingItem({ ...editingItem, name: e.target.value })}
                                    className="font-bold h-12"
                                />
                                <Input
                                    placeholder={t('nameFa')}
                                    value={editingItem.nameFa}
                                    onChange={e => setEditingItem({ ...editingItem, nameFa: e.target.value })}
                                    className="font-bold h-12 text-right font-vazir"
                                />
                                <div className="flex gap-2">
                                    <Button onClick={handleSave} className="flex-1 font-black"><Save className="h-4 w-4 mr-2" /> {t('save')}</Button>
                                    <Button onClick={() => setEditingItem(null)} variant="tonal" className="px-3"><X className="h-4 w-4" /></Button>
                                </div>
                            </div>
                        </Card>
                    )}

                    {currentItems.map(item => {
                        const isEditing = editingItem?.id === item.id;
                        const faName = item.translations.find(tr => tr.locale === 'fa')?.name || '';
                        const enName = item.translations.find(tr => tr.locale === 'en')?.name || item.name || '';

                        return (
                            <Card key={item.id} className="p-6 bg-surface-container-lowest hover:shadow-md transition-shadow">
                                {isEditing ? (
                                    <div className="space-y-4">
                                        <Input
                                            value={editingItem.name}
                                            onChange={e => setEditingItem({ ...editingItem, name: e.target.value })}
                                            className="font-bold h-12"
                                        />
                                        <Input
                                            value={editingItem.nameFa}
                                            onChange={e => setEditingItem({ ...editingItem, nameFa: e.target.value })}
                                            className="font-bold h-12 text-right font-vazir"
                                        />
                                        <div className="flex gap-2">
                                            <Button onClick={handleSave} className="flex-1 font-black"><Save className="h-4 w-4 mr-2" /></Button>
                                            <Button onClick={() => setEditingItem(null)} variant="tonal" className="px-3"><X className="h-4 w-4" /></Button>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <p className="text-lg font-black text-on-surface">{enName}</p>
                                            <p className="text-md font-bold text-on-surface-variant font-vazir mt-1">{faName}</p>
                                        </div>
                                        <div className="flex gap-2">
                                            <Button
                                                variant="tonal"
                                                size="icon"
                                                onClick={() => setEditingItem({ id: item.id, type: activeTab, name: enName, nameFa: faName })}
                                                className="rounded-xl h-10 w-10"
                                            >
                                                <Edit3 className="h-4 w-4 text-primary" />
                                            </Button>
                                            <Button
                                                variant="tonal"
                                                size="icon"
                                                onClick={() => handleDelete(activeTab, item.id)}
                                                className="rounded-xl h-10 w-10 text-error hover:bg-error/10"
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </div>
                                )}
                            </Card>
                        );
                    })}
                </div>
            </Card>
        </div>
    );
}
