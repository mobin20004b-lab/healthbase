'use server';

import prisma from '@/lib/prisma';
import { auth } from '@/auth';
import { z } from 'zod';
import { revalidatePath } from 'next/cache';

const inquirySchema = z.object({
  clinicId: z.string().min(1, 'Clinic ID is required'),
  serviceInterest: z.string().optional(),
  message: z.string().min(10, 'Message must be at least 10 characters long').max(1000, 'Message is too long'),
  contactMethod: z.enum(['phone', 'whatsapp', 'email'], {
    errorMap: () => ({ message: 'Please select a valid contact method' }),
  }),
});

export type InquiryState = {
  message?: string;
  error?: string;
  fieldErrors?: Record<string, string[]>;
};

export async function submitInquiry(
  prevState: InquiryState,
  formData: FormData
): Promise<InquiryState> {
  const session = await auth();

  if (!session?.user?.id) {
    return { error: 'You must be logged in to send an inquiry.' };
  }

  const rawData = {
    clinicId: formData.get('clinicId'),
    serviceInterest: formData.get('serviceInterest'),
    message: formData.get('message'),
    contactMethod: formData.get('contactMethod'),
  };

  const validatedFields = inquirySchema.safeParse(rawData);

  if (!validatedFields.success) {
    return {
      fieldErrors: validatedFields.error.flatten().fieldErrors,
      error: 'Please fix the errors in the form.',
    };
  }

  const { clinicId, serviceInterest, message, contactMethod } = validatedFields.data;

  try {
    await prisma.inquiry.create({
      data: {
        clinicId,
        userId: session.user.id,
        serviceInterest,
        message,
        contactMethod,
        status: 'PENDING',
      },
    });

    // We don't need to revalidate path since this does not display immediately on the clinic detail page for the public.
    // If we wanted to revalidate we would need the locale e.g. revalidatePath(`/[locale]/clinics/[id]`, 'page')

    return { message: 'Your inquiry has been sent successfully!' };
  } catch (error) {
    console.error('Failed to submit inquiry:', error);
    return { error: 'An unexpected error occurred. Please try again later.' };
  }
}
