'use client';

import { useActionState } from 'react';
import { submitInquiry, type InquiryState } from '@/app/actions/inquiry';
import { Button } from '@/web/components/ui/button';
import { useTranslations } from 'next-intl';

export function InquiryForm({ clinicId }: { clinicId: string }) {
  const t = useTranslations('Inquiry');

  const initialState: InquiryState = {};
  const [state, formAction, isPending] = useActionState(submitInquiry, initialState);

  return (
    <form action={formAction} className="space-y-4">
      <input type="hidden" name="clinicId" value={clinicId} />

      {state?.message && (
        <div className="p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50" role="alert">
          {state.message}
        </div>
      )}

      {state?.error && (
        <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50" role="alert">
          {state.error}
        </div>
      )}

      <div>
        <label htmlFor="serviceInterest" className="block mb-2 text-sm font-medium text-gray-900">
          {t('serviceInterest')}
        </label>
        <input
          type="text"
          id="serviceInterest"
          name="serviceInterest"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5"
          placeholder={t('serviceInterestPlaceholder')}
        />
        {state?.fieldErrors?.serviceInterest && (
          <p className="mt-2 text-sm text-red-600">{state.fieldErrors.serviceInterest[0]}</p>
        )}
      </div>

      <div>
        <label htmlFor="contactMethod" className="block mb-2 text-sm font-medium text-gray-900">
          {t('contactMethod')}
        </label>
        <select
          id="contactMethod"
          name="contactMethod"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5"
          required
        >
          <option value="phone">{t('phone')}</option>
          <option value="whatsapp">{t('whatsapp')}</option>
          <option value="email">{t('email')}</option>
        </select>
        {state?.fieldErrors?.contactMethod && (
          <p className="mt-2 text-sm text-red-600">{state.fieldErrors.contactMethod[0]}</p>
        )}
      </div>

      <div>
        <label htmlFor="message" className="block mb-2 text-sm font-medium text-gray-900">
          {t('message')}
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary focus:border-primary"
          placeholder={t('messagePlaceholder')}
          required
        ></textarea>
        {state?.fieldErrors?.message && (
          <p className="mt-2 text-sm text-red-600">{state.fieldErrors.message[0]}</p>
        )}
      </div>

      <Button type="submit" variant="filled" className="w-full" disabled={isPending}>
        {isPending ? t('submitting') : t('submit')}
      </Button>
    </form>
  );
}
