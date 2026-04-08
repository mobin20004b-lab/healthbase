'use client';

import { useActionState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { toast } from 'sonner';
import { Button } from '@/web/components/ui/button';
import { submitInquiry, type InquiryState } from '@/app/actions/inquiry';
import { Send } from 'lucide-react';

interface ServiceOption {
    id: string;
    name: string;
}

interface InquiryFormProps {
    clinicId: string;
    services: ServiceOption[];
    onSuccess?: () => void;
}

const initialState: InquiryState = {
    success: undefined,
    errors: {},
    message: '',
};

export function InquiryForm({ clinicId, services, onSuccess }: InquiryFormProps) {
    const t = useTranslations('Inquiry');
    const [state, formAction, isPending] = useActionState(submitInquiry, initialState);

    useEffect(() => {
        if (state.success) {
            toast.success(state.message || t('successMessage'));
            if (onSuccess) {
                onSuccess();
            }
        } else if (state.success === false && state.message) {
            toast.error(state.message);
        }
    }, [state, t, onSuccess]);

    return (
        <form action={formAction} className="space-y-6">
            <input type="hidden" name="clinicId" value={clinicId} />

            <div className="space-y-4">
                {services.length > 0 && (
                    <div className="space-y-2">
                        <label htmlFor="serviceInterest" className="text-sm font-bold text-on-surface">
                            {t('serviceInterest')}
                        </label>
                        <select
                            id="serviceInterest"
                            name="serviceInterest"
                            className="w-full rounded-xl border border-outline-variant/30 bg-surface-container-low px-4 py-3 text-on-surface focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-colors"
                        >
                            <option value="">{t('selectService')}</option>
                            {services.map((service) => (
                                <option key={service.id} value={service.name}>
                                    {service.name}
                                </option>
                            ))}
                        </select>
                        {state.errors?.serviceInterest && (
                            <p className="text-sm text-error font-medium">{state.errors.serviceInterest[0]}</p>
                        )}
                    </div>
                )}

                <div className="space-y-2">
                    <label className="text-sm font-bold text-on-surface">
                        {t('contactMethod')}
                    </label>
                    <div className="flex gap-4">
                        <label className="flex items-center gap-2 text-on-surface-variant font-medium cursor-pointer">
                            <input type="radio" name="contactMethod" value="phone" className="accent-primary w-4 h-4" defaultChecked />
                            {t('methodPhone')}
                        </label>
                        <label className="flex items-center gap-2 text-on-surface-variant font-medium cursor-pointer">
                            <input type="radio" name="contactMethod" value="whatsapp" className="accent-primary w-4 h-4" />
                            {t('methodWhatsApp')}
                        </label>
                        <label className="flex items-center gap-2 text-on-surface-variant font-medium cursor-pointer">
                            <input type="radio" name="contactMethod" value="email" className="accent-primary w-4 h-4" />
                            {t('methodEmail')}
                        </label>
                    </div>
                    {state.errors?.contactMethod && (
                        <p className="text-sm text-error font-medium">{state.errors.contactMethod[0]}</p>
                    )}
                </div>

                <div className="space-y-2">
                    <label htmlFor="message" className="text-sm font-bold text-on-surface">
                        {t('message')}
                    </label>
                    <textarea
                        id="message"
                        name="message"
                        rows={4}
                        placeholder={t('messagePlaceholder')}
                        className="w-full rounded-xl border border-outline-variant/30 bg-surface-container-low px-4 py-3 text-on-surface focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-colors resize-none"
                    />
                    {state.errors?.message && (
                        <p className="text-sm text-error font-medium">{state.errors.message[0]}</p>
                    )}
                </div>
            </div>

            <Button
                type="submit"
                disabled={isPending}
                className="w-full rounded-xl gap-2 font-black py-6 text-lg"
            >
                <Send className="h-5 w-5" />
                {isPending ? t('sending') : t('submit')}
            </Button>
        </form>
    );
}
