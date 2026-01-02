import { useTranslations } from 'next-intl';
import { Card } from '@/web/components/ui/card';

export default function StatsGrid() {
    const t = useTranslations('HomePage.stats');

    return (
        <div className="bg-background py-16 sm:py-24">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    {/* Primary Stat - Large Cell */}
                    <Card variant="bento" className="md:col-span-2 p-10 flex flex-col justify-center items-center text-center bg-primary-container/20 border-primary/10">
                        <dt className="text-lg font-medium text-on-primary-container/80 mb-2">{t('trust')}</dt>
                        <dd className="text-5xl md:text-7xl font-bold tracking-tight text-on-primary-container leading-none">100%</dd>
                    </Card>

                    {/* Secondary Stat */}
                    <Card variant="bento" className="md:col-span-1 p-8 flex flex-col justify-center items-center text-center bg-secondary-container/30 border-secondary/10">
                        <dt className="text-sm font-medium text-on-secondary-container/70 mb-1">{t('verified')}</dt>
                        <dd className="text-3xl md:text-4xl font-black text-on-secondary-container">150+</dd>
                    </Card>

                    {/* Tertiary Stat */}
                    <Card variant="bento" className="md:col-span-1 p-8 flex flex-col justify-center items-center text-center bg-tertiary-container/30 border-tertiary/10">
                        <dt className="text-sm font-medium text-on-tertiary-container/70 mb-1">{t('users')}</dt>
                        <dd className="text-3xl md:text-4xl font-black text-on-tertiary-container">10k+</dd>
                    </Card>
                </div>
            </div>
        </div>
    );
}
