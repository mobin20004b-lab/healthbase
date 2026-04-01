'use client';

import { useActionState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { submitInquiry, type InquiryState } from '@/app/actions/inquiry';
import { Button } from '@/web/components/ui/button';
import { Input } from '@/web/components/ui/input';
import { Card } from '@/web/components/ui/card';
import { Send, Phone, MessageSquare, Mail } from 'lucide-react';
import { toast } from 'sonner';

interface InquiryFormProps {
    clinicId: string;
    services?: { id: string; name: string }[];
}

const initialState: InquiryState = {};

export function InquiryForm({ clinicId, services = [] }: InquiryFormProps) {
    const t = useTranslations('Inquiry');
    const [state, formAction, isPending] = useActionState(submitInquiry, initialState);

    useEffect(() => {
        if (state.success) {
            toast.success(t('successMessage') || 'Your inquiry has been sent successfully. The clinic will contact you soon.');
            // Reset form could be handled by a ref, but standard form reset works naturally if not blocked
        }
        if (state.error) {
            toast.error(state.error);
        }
    }, [state.success, state.error, t]);

    return (
        <Card variant="bento" className="p-8 bg-surface-container-low border-outline-variant/20 shadow-lg">
            <div className="mb-8">
                <h3 className="text-2xl font-black text-on-surface flex items-center gap-3">
                    <Send className="h-6 w-6 text-primary" />
                    {t('requestInfo') || 'Request Information'}
                </h3>
                <p className="text-on-surface-variant font-medium mt-2">
                    {t('description') || 'Interested in a service? Send an inquiry and the clinic will reach out to you.'}
                </p>
            </div>

            <form action={formAction} className="space-y-6">
                <input type="hidden" name="clinicId" value={clinicId} />

                {/* Service Interest */}
                <div className="space-y-2">
                    <label htmlFor="serviceInterest" className="block text-sm font-bold text-on-surface">
                        {t('serviceInterest') || 'Service of Interest'}
                    </label>
                    <div className="relative">
                        <select
                            id="serviceInterest"
                            name="serviceInterest"
                            className="w-full px-4 py-3 bg-surface-variant/30 border border-outline-variant rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none appearance-none text-on-surface font-medium"
                            defaultValue=""
                        >
                            <option value="" disabled>{t('selectService') || 'Select a service (optional)'}</option>
                            {services.map(service => (
                                <option key={service.id} value={service.name}>
                                    {service.name}
                                </option>
                            ))}
                            <option value="General Inquiry">{t('generalInquiry') || 'General Inquiry'}</option>
                        </select>
                    </div>
                </div>

                {/* Message */}
                <div className="space-y-2">
                    <label htmlFor="message" className="block text-sm font-bold text-on-surface">
                        {t('message') || 'Message'} <span className="text-error">*</span>
                    </label>
                    <textarea
                        id="message"
                        name="message"
                        rows={4}
                        placeholder={t('messagePlaceholder') || 'Hello, I would like to know more about...'}
                        className="w-full px-4 py-3 bg-surface-variant/30 border border-outline-variant rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none resize-none text-on-surface font-medium"
                    ></textarea>
                    {state.errors?.message && (
                        <p className="text-sm font-bold text-error">{state.errors.message[0]}</p>
                    )}
                </div>

                {/* Contact Method */}
                <div className="space-y-3">
                    <label className="block text-sm font-bold text-on-surface">
                        {t('preferredContact') || 'Preferred Contact Method'} <span className="text-error">*</span>
                    </label>
                    <div className="grid grid-cols-3 gap-3">
                        <label className="cursor-pointer">
                            <input type="radio" name="contactMethod" value="Phone" className="peer sr-only" defaultChecked />
                            <div className="flex flex-col items-center justify-center p-4 rounded-xl border-2 border-outline-variant/30 peer-checked:border-primary peer-checked:bg-primary/5 transition-all gap-2 text-on-surface-variant peer-checked:text-primary font-bold">
                                <Phone className="h-5 w-5" />
                                <span className="text-sm">Phone</span>
                            </div>
                        </label>
                        <label className="cursor-pointer">
                            <input type="radio" name="contactMethod" value="WhatsApp" className="peer sr-only" />
                            <div className="flex flex-col items-center justify-center p-4 rounded-xl border-2 border-outline-variant/30 peer-checked:border-[#25D366] peer-checked:bg-[#25D366]/5 transition-all gap-2 text-on-surface-variant peer-checked:text-[#25D366] font-bold">
                                <MessageSquare className="h-5 w-5" />
                                <span className="text-sm">WhatsApp</span>
                            </div>
                        </label>
                        <label className="cursor-pointer">
                            <input type="radio" name="contactMethod" value="Email" className="peer sr-only" />
                            <div className="flex flex-col items-center justify-center p-4 rounded-xl border-2 border-outline-variant/30 peer-checked:border-primary peer-checked:bg-primary/5 transition-all gap-2 text-on-surface-variant peer-checked:text-primary font-bold">
                                <Mail className="h-5 w-5" />
                                <span className="text-sm">Email</span>
                            </div>
                        </label>
                    </div>
                    {state.errors?.contactMethod && (
                        <p className="text-sm font-bold text-error">{state.errors.contactMethod[0]}</p>
                    )}
                </div>

                {/* Submit Button */}
                <div className="pt-4 border-t border-outline-variant/20">
                    <Button
                        type="submit"
                        disabled={isPending || state.success}
                        className="w-full h-12 text-base font-bold shadow-lg shadow-primary/20"
                    >
                        {isPending ? (t('sending') || 'Sending...') : (state.success ? (t('sent') || 'Sent!') : (t('submitInquiry') || 'Submit Inquiry'))}
                    </Button>
                    <p className="text-center text-xs text-on-surface-variant mt-4">
                        {t('privacyNote') || 'Your information is securely sent directly to the clinic.'}
                    </p>
                </div>
            </form>
        </Card>
    );
}
