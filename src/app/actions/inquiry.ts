'use server';

import { z } from 'zod';
import { auth } from '@/auth';
import prisma from '@/lib/prisma';

const inquirySchema = z.object({
  clinicId: z.string().min(1, 'Clinic ID is required'),
  serviceInterest: z.string().optional(),
  contactMethod: z.enum(['Phone', 'WhatsApp', 'Email'], {
    message: 'Please select a contact method',
  }),
  message: z.string().min(10, 'Message must be at least 10 characters long'),
});

export type InquiryState = {
  errors?: {
    clinicId?: string[];
    serviceInterest?: string[];
    contactMethod?: string[];
    message?: string[];
    form?: string[];
  };
  message?: string;
  success?: boolean;
};

export async function submitInquiry(
  prevState: InquiryState,
  formData: FormData
): Promise<InquiryState> {
  // Validate form fields
  const validatedFields = inquirySchema.safeParse({
    clinicId: formData.get('clinicId'),
    serviceInterest: formData.get('serviceInterest'),
    contactMethod: formData.get('contactMethod'),
    message: formData.get('message'),
  });

  // Return early if the form data is invalid
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to submit inquiry.',
      success: false,
    };
  }

  const { clinicId, serviceInterest, contactMethod, message } = validatedFields.data;

  try {
    // Check authentication
    const session = await auth();
    if (!session || !session.user || !session.user.id) {
      return {
        message: 'You must be logged in to submit an inquiry.',
        success: false,
      };
    }

    // Create inquiry in database
    await prisma.inquiry.create({
      data: {
        clinicId,
        userId: session.user.id,
        serviceInterest,
        contactMethod,
        message,
        status: 'PENDING',
      },
    });

    return {
      message: 'Inquiry submitted successfully!',
      success: true,
    };
  } catch (error) {
    console.error('Database Error:', error);
    return {
      message: 'Database Error: Failed to submit inquiry.',
      success: false,
    };
  }
}
