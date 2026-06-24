'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import { Card } from '@/web/components/ui/card';
import { Droplet, ShieldAlert } from 'lucide-react';
import { cn } from '@/lib/utils';

interface HealthPassportProps {
  className?: string;
}

export function HealthPassport({ className }: HealthPassportProps) {
  const t = useTranslations('Patient.records');

  // Mock data for the passport
  const bloodType = 'O+';
  const allergies = ['Penicillin', 'Peanuts'];

  return (
    <Card variant="bento" className={cn("p-6 flex flex-col h-full bg-primary-container/10 border-primary/20", className)}>
      <div className="mb-6">
        <h2 className="text-xl font-bold text-on-surface">{t('healthPassport')}</h2>
      </div>

      <div className="flex flex-col gap-6">
        {/* Blood Type */}
        <div className="flex items-start gap-4">
          <div className="p-3 rounded-full bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400">
            <Droplet className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm font-medium text-on-surface-variant">{t('bloodType')}</p>
            <p className="text-2xl font-black text-on-surface">{bloodType}</p>
          </div>
        </div>

        {/* Allergies */}
        <div className="flex items-start gap-4">
          <div className="p-3 rounded-full bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400">
            <ShieldAlert className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm font-medium text-on-surface-variant mb-1">{t('allergies')}</p>
            <div className="flex flex-wrap gap-2">
              {allergies.map((allergy, index) => (
                <span
                  key={index}
                  className="px-2 py-1 text-xs font-bold rounded-md bg-surface-variant text-on-surface-variant"
                >
                  {allergy}
                </span>
              ))}
            </div>
            {allergies.length === 0 && (
              <p className="text-sm text-on-surface-variant">None</p>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
}
