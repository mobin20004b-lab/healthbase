"use client";

import { useActionState } from "react";
import { useTranslations } from "next-intl";
import { submitInquiry, InquiryState } from "@/app/actions/inquiry";
import { Button } from "@/web/components/ui/button";

interface InquiryFormProps {
  clinicId: string;
  onSuccess?: () => void;
}

const initialState: InquiryState = {
  success: false,
};

export function InquiryForm({ clinicId, onSuccess }: InquiryFormProps) {
  const t = useTranslations("ClinicDetail.inquiry");

  // Wrap submitInquiry to call onSuccess when success is true
  const submitAction = async (prevState: InquiryState, formData: FormData) => {
    const result = await submitInquiry(prevState, formData);
    if (result.success && onSuccess) {
      onSuccess();
    }
    return result;
  };

  const [state, formAction, isPending] = useActionState(submitAction, initialState);

  if (state.success) {
    return (
      <div className="py-8 text-center" data-testid="inquiry-success">
        <div className="mb-4 text-green-600">
          <svg className="w-12 h-12 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-xl font-medium mb-2">{t("successMessage") || "Inquiry sent successfully!"}</h3>
        <p className="text-muted-foreground">{t("successDesc") || "The clinic will contact you shortly."}</p>
      </div>
    );
  }

  return (
    <form action={formAction} className="space-y-4" data-testid="inquiry-form">
      <input type="hidden" name="clinicId" value={clinicId} />

      {state.message && !state.success && (
        <div className="p-3 bg-red-100 text-red-700 rounded-md text-sm">
          {state.message}
        </div>
      )}

      <div>
        <label htmlFor="serviceInterest" className="block text-sm font-medium mb-1">
          {t("serviceInterest") || "Service Interest (Optional)"}
        </label>
        <input
          id="serviceInterest"
          name="serviceInterest"
          type="text"
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
          placeholder={t("servicePlaceholder") || "e.g., Dental Checkup"}
        />
        {state.errors?.serviceInterest && (
          <p className="mt-1 text-sm text-red-600">{state.errors.serviceInterest[0]}</p>
        )}
      </div>

      <div>
        <label htmlFor="contactMethod" className="block text-sm font-medium mb-1">
          {t("contactMethod") || "Preferred Contact Method"} *
        </label>
        <select
          id="contactMethod"
          name="contactMethod"
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary bg-background"
          required
        >
          <option value="">{t("selectContactMethod") || "Select..."}</option>
          <option value="Phone">{t("phone") || "Phone"}</option>
          <option value="WhatsApp">{t("whatsapp") || "WhatsApp"}</option>
          <option value="Email">{t("email") || "Email"}</option>
        </select>
        {state.errors?.contactMethod && (
          <p className="mt-1 text-sm text-red-600">{state.errors.contactMethod[0]}</p>
        )}
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium mb-1">
          {t("message") || "Message"} *
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary resize-none"
          placeholder={t("messagePlaceholder") || "I would like to know more about..."}
          required
        />
        {state.errors?.message && (
          <p className="mt-1 text-sm text-red-600">{state.errors.message[0]}</p>
        )}
      </div>

      <Button
        type="submit"
        className="w-full"
        disabled={isPending}
      >
        {isPending ? (t("submitting") || "Sending...") : (t("submit") || "Send Inquiry")}
      </Button>
    </form>
  );
}
