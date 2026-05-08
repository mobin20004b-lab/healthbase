'use client';

import * as React from 'react';
import { useActionState } from 'react';
import { useTranslations } from 'next-intl';
import { Button } from '@/web/components/ui/button';
import { Input } from '@/web/components/ui/input';
import { submitInquiry, type InquiryState } from '@/app/actions/inquiry';
import { Send, CheckCircle2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface InquiryFormProps {
  clinicId: string;
  onSuccess?: () => void;
  className?: string;
}

const initialState: InquiryState = {
  success: undefined,
  errors: {},
};

export function InquiryForm({ clinicId, onSuccess, className }: InquiryFormProps) {
  const t = useTranslations('Inquiry');
  const fallbackT = (key: string) => {
    const fallbacks: Record<string, string> = {
      'title': 'Request Information',
      'description': 'Send a message to the clinic and they will get back to you.',
      'serviceInterest': 'Service of Interest (Optional)',
      'serviceInterestPlaceholder': 'e.g. Dental Checkup',
      'message': 'Message',
      'messagePlaceholder': 'How can we help you?',
      'contactMethod': 'Preferred Contact Method',
      'phone': 'Phone',
      'whatsapp': 'WhatsApp',
      'submit': 'Send Inquiry',
      'submitting': 'Sending...',
      'successTitle': 'Inquiry Sent!',
      'successMessage': 'The clinic has received your message and will contact you soon.',
      'close': 'Close',
    };
    return t(key) || fallbacks[key] || key;
  };

  const [state, formAction, isPending] = useActionState(submitInquiry, initialState);

  React.useEffect(() => {
    if (state.success && onSuccess) {
      // Optional timeout before closing or let user see success state first
      const timer = setTimeout(onSuccess, 3000);
      return () => clearTimeout(timer);
    }
  }, [state.success, onSuccess]);

  if (state.success) {
    return (
      <div className={cn("py-8 flex flex-col items-center justify-center text-center space-y-4 animate-in fade-in-0 zoom-in-95", className)}>
        <div className="h-16 w-16 bg-primary/10 rounded-full flex items-center justify-center m3-shape-flower shadow-inner">
          <CheckCircle2 className="h-8 w-8 text-primary" />
        </div>
        <div className="space-y-2">
          <h3 className="text-2xl font-black text-on-surface tracking-tight">{fallbackT('successTitle')}</h3>
          <p className="text-on-surface-variant font-medium">{fallbackT('successMessage')}</p>
        </div>
        <Button onClick={onSuccess} className="mt-4 rounded-2xl w-full max-w-xs font-black">
          {fallbackT('close')}
        </Button>
      </div>
    );
  }

  return (
    <form action={formAction} className={cn("space-y-6", className)}>
      <input type="hidden" name="clinicId" value={clinicId} />

      {state.errors?.form && (
        <div className="p-4 bg-error-container/20 border border-error-container text-on-error-container rounded-2xl text-sm font-bold">
          {state.errors.form[0]}
        </div>
      )}

      <div className="space-y-2">
        <label htmlFor="serviceInterest" className="text-sm font-bold text-on-surface-variant ml-1">
          {fallbackT('serviceInterest')}
        </label>
        <Input
          id="serviceInterest"
          name="serviceInterest"
          placeholder={fallbackT('serviceInterestPlaceholder')}
          className="rounded-2xl"
        />
        {state.errors?.serviceInterest && (
          <p className="text-sm font-bold text-error ml-1">{state.errors.serviceInterest[0]}</p>
        )}
      </div>

      <div className="space-y-2">
        <label htmlFor="message" className="text-sm font-bold text-on-surface-variant ml-1">
          {fallbackT('message')} <span className="text-error">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={4}
          placeholder={fallbackT('messagePlaceholder')}
          className="w-full rounded-2xl border-outline-variant/50 bg-surface-container-lowest px-4 py-3 text-base text-on-surface placeholder:text-on-surface-variant/50 focus:border-primary focus:ring-2 focus:ring-primary/20 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 transition-colors shadow-sm"
        />
        {state.errors?.message && (
          <p className="text-sm font-bold text-error ml-1">{state.errors.message[0]}</p>
        )}
      </div>

      <div className="space-y-3">
        <label className="text-sm font-bold text-on-surface-variant ml-1">
          {fallbackT('contactMethod')} <span className="text-error">*</span>
        </label>
        <div className="flex gap-4">
          <label className="flex-1 flex items-center gap-3 p-4 rounded-2xl border border-outline-variant/30 bg-surface-container-lowest cursor-pointer hover:bg-surface-container-low transition-colors has-[:checked]:border-primary has-[:checked]:bg-primary/5 has-[:checked]:ring-1 has-[:checked]:ring-primary">
            <input type="radio" name="contactMethod" value="Phone" className="sr-only" defaultChecked />
            <div className="h-5 w-5 rounded-full border-2 border-on-surface-variant/30 flex items-center justify-center relative">
              <div className="h-2.5 w-2.5 rounded-full bg-primary opacity-0 transition-opacity absolute" />
            </div>
            <span className="font-bold text-on-surface">{fallbackT('phone')}</span>
          </label>
          <label className="flex-1 flex items-center gap-3 p-4 rounded-2xl border border-outline-variant/30 bg-surface-container-lowest cursor-pointer hover:bg-surface-container-low transition-colors has-[:checked]:border-primary has-[:checked]:bg-primary/5 has-[:checked]:ring-1 has-[:checked]:ring-primary">
            <input type="radio" name="contactMethod" value="WhatsApp" className="sr-only" />
            <div className="h-5 w-5 rounded-full border-2 border-on-surface-variant/30 flex items-center justify-center relative">
              <div className="h-2.5 w-2.5 rounded-full bg-primary opacity-0 transition-opacity absolute" />
            </div>
            <span className="font-bold text-on-surface">{fallbackT('whatsapp')}</span>
          </label>
        </div>
        {state.errors?.contactMethod && (
          <p className="text-sm font-bold text-error ml-1">{state.errors.contactMethod[0]}</p>
        )}
      </div>

      <Button
        type="submit"
        disabled={isPending}
        className="w-full rounded-2xl shadow-lg shadow-primary/20 gap-2 font-black py-6 mt-4"
      >
        {isPending ? (
          <div className="flex items-center justify-center gap-2">
            <div className="h-5 w-5 rounded-full border-2 border-on-primary border-t-transparent animate-spin" />
            {fallbackT('submitting')}
          </div>
        ) : (
          <>
            <Send className="h-5 w-5" />
            {fallbackT('submit')}
          </>
        )}
      </Button>
    </form>
  );
}
