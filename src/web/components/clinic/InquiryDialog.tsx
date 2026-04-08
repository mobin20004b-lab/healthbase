'use client';

import * as React from 'react';
import { useTranslations } from 'next-intl';
import { Button } from '@/web/components/ui/button';
import { Dialog, DialogContent, DialogTrigger, useDialog } from '@/web/components/ui/dialog';
import { InquiryForm } from '@/web/components/clinic/InquiryForm';
import { MessageCircle } from 'lucide-react';

interface ServiceOption {
    id: string;
    name: string;
}

interface InquiryDialogProps {
    clinicId: string;
    services: ServiceOption[];
}

// Inner component to access dialog context for closing
function InquiryDialogInner({ clinicId, services }: InquiryDialogProps) {
    const t = useTranslations('Inquiry');
    const { close } = useDialog();

    return (
        <DialogContent title={t('requestInfo')}>
            <div className="mb-6">
                <p className="text-on-surface-variant text-base">
                    {t('description')}
                </p>
            </div>
            <InquiryForm clinicId={clinicId} services={services} onSuccess={close} />
        </DialogContent>
    );
}

export function InquiryDialog({ clinicId, services }: InquiryDialogProps) {
    const t = useTranslations('Inquiry');

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button size="lg" className="rounded-2xl shadow-2xl shadow-primary/20 gap-3 w-full sm:w-auto">
                    <MessageCircle className="h-5 w-5" />
                    {t('requestInfo')}
                </Button>
            </DialogTrigger>
            <InquiryDialogInner clinicId={clinicId} services={services} />
        </Dialog>
    );
}
