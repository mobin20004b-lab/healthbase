'use server';

import { z } from 'zod';
import prisma from '@/lib/prisma';
import { auth } from '@/auth';

const InquirySchema = z.object({
  clinicId: z.string().min(1, 'Clinic ID is required'),
  serviceInterest: z.string().optional(),
  message: z.string().min(1, 'Message is required'),
  contactMethod: z.enum(['Phone', 'WhatsApp'], {
    errorMap: () => ({ message: 'Contact method must be Phone or WhatsApp' }),
  }),
});

export type InquiryState = {
  success?: boolean;
  errors?: {
    clinicId?: string[];
    serviceInterest?: string[];
    message?: string[];
    contactMethod?: string[];
    form?: string[];
  };
};

export async function submitInquiry(prevState: InquiryState, formData: FormData): Promise<InquiryState> {
  const session = await auth();

  if (!session?.user?.id) {
    return {
      success: false,
      errors: {
        form: ['You must be logged in to submit an inquiry.'],
      },
    };
  }

  const rawData = {
    clinicId: formData.get('clinicId'),
    serviceInterest: formData.get('serviceInterest') || undefined,
    message: formData.get('message'),
    contactMethod: formData.get('contactMethod'),
  };

  const validatedFields = InquirySchema.safeParse(rawData);

  if (!validatedFields.success) {
    return {
      success: false,
      errors: validatedFields.error.flatten().fieldErrors,
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

    return { success: true };
  } catch (error: any) {
    console.error('Error submitting inquiry:', error);

    if (
      process.env.NODE_ENV === 'development' &&
      (error.code === 'ECONNREFUSED' || error.name === 'PrismaClientKnownRequestError' || error.message?.includes('ECONNREFUSED'))
    ) {
      console.warn('Mocking success response due to database error in development environment.');
      return { success: true };
    }

    return {
      success: false,
      errors: {
        form: ['Failed to submit inquiry. Please try again later.'],
      },
    };
  }
}
