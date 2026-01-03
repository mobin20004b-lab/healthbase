
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import prisma from '@/lib/prisma';
import { Card } from '@/web/components/ui/card';
import { Button } from '@/web/components/ui/button';
import { CheckCircle2, XCircle, MapPin, Phone } from 'lucide-react';
import { revalidatePath } from 'next/cache';

async function verifyClinic(clinicId: string) {
    "use server"
    const session = await auth();
    if (!session || session.user.role !== 'ADMIN') return;

    await prisma.clinic.update({
        where: { id: clinicId },
        data: { isVerified: true }
    });
    revalidatePath('/[locale]/admin/clinics');
}

async function unverifyClinic(clinicId: string) {
    "use server"
    const session = await auth();
    if (!session || session.user.role !== 'ADMIN') return;

    await prisma.clinic.update({
        where: { id: clinicId },
        data: { isVerified: false }
    });
    revalidatePath('/[locale]/admin/clinics');
}

export default async function AdminClinicsPage({ params }: { params: Promise<{ locale: string }> }) {
    const locale = (await params).locale;
    setRequestLocale(locale);
    const t = await getTranslations('Admin.clinics');

    const session = await auth();
    if (!session || session.user.role !== 'ADMIN') {
        redirect('/');
    }

    const clinics = await prisma.clinic.findMany({
        orderBy: { createdAt: 'desc' },
        include: {
            _count: {
                select: { reviews: true }
            }
        }
    });

    return (
        <div className="p-8">
            <header className="mb-8">
                <h1 className="text-3xl font-black text-on-surface mb-2">{t('title')}</h1>
                <p className="text-on-surface-variant">{t('subtitle')}</p>
            </header>

            <div className="grid grid-cols-1 gap-4">
                {clinics.map((clinic) => (
                    <Card key={clinic.id} variant="outlined" className="p-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                                <h3 className="text-lg font-bold text-on-surface">{clinic.name}</h3>
                                {clinic.isVerified && (
                                    <CheckCircle2 className="h-4 w-4 text-primary" />
                                )}
                            </div>
                            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-sm text-on-surface-variant">
                                {clinic.city && (
                                    <div className="flex items-center gap-1">
                                        <MapPin className="h-3 w-3" />
                                        <span>{clinic.city}</span>
                                    </div>
                                )}
                                {clinic.phone && (
                                    <div className="flex items-center gap-1">
                                        <Phone className="h-3 w-3" />
                                        <span>{clinic.phone}</span>
                                    </div>
                                )}
                                <div>
                                    {clinic._count.reviews} {t('reviews_count')}
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center gap-2">
                            {clinic.isVerified ? (
                                <form action={unverifyClinic.bind(null, clinic.id)}>
                                    <Button variant="outlined" size="sm" type="submit" className="text-error border-error hover:bg-error/10">
                                        <XCircle className="h-4 w-4 mr-2" />
                                        {t('unverify')}
                                    </Button>
                                </form>
                            ) : (
                                <form action={verifyClinic.bind(null, clinic.id)}>
                                    <Button variant="filled" size="sm" type="submit">
                                        <CheckCircle2 className="h-4 w-4 mr-2" />
                                        {t('verify')}
                                    </Button>
                                </form>
                            )}
                            <Button variant="tonal" size="sm" asChild>
                                <a href={`/${locale}/admin/clinics/${clinic.id}`}>{t('edit')}</a>
                            </Button>
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    );
}
