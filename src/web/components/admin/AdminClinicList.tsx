
'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Card } from '@/web/components/ui/card';
import { Button } from '@/web/components/ui/button';
import {
    BadgeCheck,
    XCircle,
    Edit3,
    Trash2,
    MapPin,
    Calendar,
    CheckCircle2,
    Clock,
    Search,
    Plus,
    Hospital
} from 'lucide-react';
import { Link } from '@/routing'; // Localized Link
import { Input } from '@/web/components/ui/input';

interface Clinic {
    id: string;
    name: string;
    city: string;
    isVerified: boolean;
    reviewCount: number;
    serviceCount: number;
    createdAt: string;
}

interface AdminClinicListProps {
    initialClinics: Clinic[];
    locale: string;
}

export function AdminClinicList({ initialClinics, locale }: AdminClinicListProps) {
    const t = useTranslations('Admin.clinics');
    const [clinics, setClinics] = useState(initialClinics);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState<string | null>(null);

    const filteredClinics = clinics.filter(c =>
        c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.city?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleToggleVerify = async (id: string, currentStatus: boolean) => {
        setLoading(id);
        try {
            const res = await fetch(`/api/admin/clinics/${id}/verify`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ isVerified: !currentStatus })
            });
            if (res.ok) {
                setClinics(prev => prev.map(c =>
                    c.id === id ? { ...c, isVerified: !currentStatus } : c
                ));
            }
        } catch (error) {
            console.error('Error toggling verification:', error);
        } finally {
            setLoading(null);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this clinic?')) return;

        try {
            const res = await fetch(`/api/clinics/${id}`, { method: 'DELETE' });
            if (res.ok) {
                setClinics(prev => prev.filter(c => c.id !== id));
            }
        } catch (error) {
            console.error('Error deleting clinic:', error);
        }
    };

    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row gap-6 items-center justify-between bg-surface-container-low p-6 rounded-[var(--radius-2xl)] border border-outline-variant/10">
                <div className="relative w-full md:w-96">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-on-surface-variant/40" />
                    <Input
                        placeholder={t('form.name') + '...'}
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-12 bg-surface-container-lowest border-none h-12 rounded-xl font-bold"
                    />
                </div>
                <Link href={`/admin/clinics/new`}>
                    <Button className="h-12 px-8 rounded-xl font-black flex items-center gap-2 shadow-lg shadow-primary/20">
                        <Plus className="h-5 w-5" />
                        {t('addNew')}
                    </Button>
                </Link>
            </div>

            {filteredClinics.length === 0 ? (
                <Card className="p-20 text-center bg-surface-container-low border-dashed border-2 border-outline-variant/30 rounded-[var(--radius-3xl)]">
                    <Hospital className="h-16 w-16 text-primary/30 mx-auto mb-6" />
                    <p className="text-2xl font-bold text-on-surface-variant font-vazir">{t('list.noClinics')}</p>
                </Card>
            ) : (
                <div className="grid gap-6">
                    {filteredClinics.map((clinic) => (
                        <Card key={clinic.id} variant="bento" className="p-6 bg-surface-container-lowest border-outline-variant/10 shadow-sm hover:shadow-md transition-shadow">
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                                <div className="flex-1">
                                    <div className="flex items-center gap-3 mb-2">
                                        <h3 className="text-xl font-black text-on-surface">{clinic.name}</h3>
                                        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${clinic.isVerified
                                                ? 'bg-success-container text-on-success-container'
                                                : 'bg-warning-container text-on-warning-container'
                                            }`}>
                                            {clinic.isVerified ? <CheckCircle2 className="h-3 w-3" /> : <Clock className="h-3 w-3" />}
                                            {clinic.isVerified ? t('list.verified') : t('list.pending')}
                                        </span>
                                    </div>
                                    <div className="flex flex-wrap gap-4 text-sm font-bold text-on-surface-variant">
                                        <div className="flex items-center gap-1.5">
                                            <MapPin className="h-4 w-4 text-primary" />
                                            {clinic.city || '---'}
                                        </div>
                                        <div className="flex items-center gap-1.5">
                                            <Calendar className="h-4 w-4 text-primary" />
                                            {new Date(clinic.createdAt).toLocaleDateString(locale)}
                                        </div>
                                        <div className="flex items-center gap-4 border-l border-outline-variant/20 pl-4 ml-2">
                                            <span>{clinic.serviceCount} Services</span>
                                            <span>{clinic.reviewCount} Reviews</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3">
                                    <Button
                                        variant="tonal"
                                        size="sm"
                                        className={`rounded-xl font-black ${clinic.isVerified ? 'text-warning' : 'text-success'}`}
                                        onClick={() => handleToggleVerify(clinic.id, clinic.isVerified)}
                                        disabled={loading === clinic.id}
                                    >
                                        {loading === clinic.id ? (
                                            <div className="h-4 w-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                                        ) : (
                                            clinic.isVerified ? <XCircle className="h-4 w-4 mr-2" /> : <BadgeCheck className="h-4 w-4 mr-2" />
                                        )}
                                        {clinic.isVerified ? t('list.pending') : t('list.verify')}
                                    </Button>

                                    <Link href={`/admin/clinics/${clinic.id}`}>
                                        <Button variant="tonal" size="icon" className="rounded-xl text-primary m3-shape-flower">
                                            <Edit3 className="h-4 w-4" />
                                        </Button>
                                    </Link>

                                    <Button
                                        variant="tonal"
                                        size="icon"
                                        className="rounded-xl text-error bg-error-container/10 hover:bg-error-container/20"
                                        onClick={() => handleDelete(clinic.id)}
                                    >
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    );
}
