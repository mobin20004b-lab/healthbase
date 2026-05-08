'use client';

import * as React from 'react';
import { useTranslations } from 'next-intl';
import { MessageSquarePlus } from 'lucide-react';
import { Button } from '@/web/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from '@/web/components/ui/dialog';
import { InquiryForm } from './InquiryForm';

interface InquiryDialogProps {
  clinicId: string;
  clinicName: string;
}

export function InquiryDialog({ clinicId, clinicName }: InquiryDialogProps) {
  const t = useTranslations('Inquiry');
  const [isOpen, setIsOpen] = React.useState(false);

  const fallbackT = (key: string) => {
    const fallbacks: Record<string, string> = {
      'trigger': 'Request Info',
      'title': 'Request Information',
      'description': 'Send a message to',
    };
    return t(key) || fallbacks[key] || key;
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button size="lg" className="rounded-2xl shadow-2xl shadow-primary/20 gap-3">
          <MessageSquarePlus className="h-5 w-5" />
          {fallbackT('trigger')}
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-md">
        <DialogHeader className="mb-4">
          <DialogTitle>{fallbackT('title')}</DialogTitle>
          <DialogDescription>
            {fallbackT('description')} <strong className="text-on-surface">{clinicName}</strong>.
          </DialogDescription>
        </DialogHeader>

        <InquiryForm
          clinicId={clinicId}
          onSuccess={() => setIsOpen(false)}
        />
      </DialogContent>
    </Dialog>
  );
}
