import { Card } from '@/web/components/ui/card';
import { ShieldAlert, Droplet, Weight, Ruler } from 'lucide-react';
import { useTranslations } from 'next-intl';

export function HealthPassport() {
  const t = useTranslations('Patient');

  return (
    <Card className="p-6">
      <h2 className="text-xl font-bold mb-4">{t('healthPassport') || 'Health Passport'}</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="flex flex-col items-center p-4 bg-surface-container rounded-xl">
          <Droplet className="w-8 h-8 text-error mb-2" />
          <span className="text-sm text-on-surface-variant">Blood Type</span>
          <span className="text-lg font-bold">O+</span>
        </div>
        <div className="flex flex-col items-center p-4 bg-surface-container rounded-xl">
          <ShieldAlert className="w-8 h-8 text-error mb-2" />
          <span className="text-sm text-on-surface-variant">Allergies</span>
          <span className="text-lg font-bold">Penicillin</span>
        </div>
        <div className="flex flex-col items-center p-4 bg-surface-container rounded-xl">
          <Weight className="w-8 h-8 text-primary mb-2" />
          <span className="text-sm text-on-surface-variant">Weight</span>
          <span className="text-lg font-bold">72 kg</span>
        </div>
        <div className="flex flex-col items-center p-4 bg-surface-container rounded-xl">
          <Ruler className="w-8 h-8 text-primary mb-2" />
          <span className="text-sm text-on-surface-variant">Height</span>
          <span className="text-lg font-bold">180 cm</span>
        </div>
      </div>
    </Card>
  );
}
