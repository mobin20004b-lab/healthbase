'use client';

import { useActionState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { submitInquiry } from '@/app/actions/inquiry';
import { Button } from '@/web/components/ui/button';
import { toast } from 'sonner';
import { Loader2, Send } from 'lucide-react';

export function InquiryForm({ clinicId }: { clinicId: string }) {
    const t = useTranslations('InquiryForm');

    const [state, formAction, isPending] = useActionState(submitInquiry, {
        success: false,
    });

    useEffect(() => {
        if (state.success) {
            toast.success(t('successMessage'));
            // Optionally, we could reset the form here
            // document.getElementById('inquiry-form')?.reset();
        } else if (state.errors?._form) {
            toast.error(state.errors._form[0]);
        }
    }, [state, t]);

    return (
        <form action={formAction} className="space-y-4" id="inquiry-form">
            <input type="hidden" name="clinicId" value={clinicId} />

            <div>
                <label htmlFor="serviceInterest" className="block text-sm font-bold text-on-surface mb-1">
                    {t('serviceInterestLabel')}
                </label>
                <input
                    type="text"
                    id="serviceInterest"
                    name="serviceInterest"
                    placeholder={t('serviceInterestPlaceholder')}
                    className="w-full h-12 px-4 rounded-xl border border-outline bg-surface text-on-surface focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-shadow"
                />
                {state.errors?.serviceInterest && (
                    <p className="text-error text-xs mt-1 font-bold">{state.errors.serviceInterest[0]}</p>
                )}
            </div>

            <div>
                <label htmlFor="contactMethod" className="block text-sm font-bold text-on-surface mb-1">
                    {t('contactMethodLabel')}
                </label>
                <select
                    id="contactMethod"
                    name="contactMethod"
                    className="w-full h-12 px-4 rounded-xl border border-outline bg-surface text-on-surface focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-shadow appearance-none"
                    defaultValue="phone"
                >
                    <option value="phone">{t('contactMethodPhone')}</option>
                    <option value="whatsapp">{t('contactMethodWhatsApp')}</option>
                    <option value="email">{t('contactMethodEmail')}</option>
                </select>
                {state.errors?.contactMethod && (
                    <p className="text-error text-xs mt-1 font-bold">{state.errors.contactMethod[0]}</p>
                )}
            </div>

            <div>
                <label htmlFor="message" className="block text-sm font-bold text-on-surface mb-1">
                    {t('messageLabel')} <span className="text-error">*</span>
                </label>
                <textarea
                    id="message"
                    name="message"
                    required
                    placeholder={t('messagePlaceholder')}
                    rows={4}
                    className="w-full p-4 rounded-xl border border-outline bg-surface text-on-surface focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-shadow resize-y min-h-[100px]"
                />
                {state.errors?.message && (
                    <p className="text-error text-xs mt-1 font-bold">{state.errors.message[0]}</p>
                )}
            </div>

            <Button
                type="submit"
                className="w-full gap-2 mt-2"
                size="lg"
                disabled={isPending}
            >
                {isPending ? (
                    <Loader2 className="h-5 w-5 animate-spin" />
                ) : (
                    <Send className="h-5 w-5" />
                )}
                {t('submitButton')}
            </Button>
        </form>
    );
}
