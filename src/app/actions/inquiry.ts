'use server';

import { z } from 'zod';
import prisma from '@/lib/prisma';
import { auth } from '@/auth';
import { revalidatePath } from 'next/cache';

const inquirySchema = z.object({
    clinicId: z.string().min(1, 'Clinic ID is required'),
    serviceInterest: z.string().optional(),
    message: z.string().min(10, 'Message must be at least 10 characters').max(1000, 'Message must be less than 1000 characters'),
    contactMethod: z.enum(['phone', 'whatsapp', 'email'], {
        message: 'Please select a valid contact method',
    }),
});

export type InquiryState = {
    errors?: {
        clinicId?: string[];
        serviceInterest?: string[];
        message?: string[];
        contactMethod?: string[];
        _form?: string[];
    };
    success?: boolean;
};

export async function submitInquiry(prevState: InquiryState, formData: FormData): Promise<InquiryState> {
    const session = await auth();

    const validatedFields = inquirySchema.safeParse({
        clinicId: formData.get('clinicId'),
        serviceInterest: formData.get('serviceInterest') || undefined,
        message: formData.get('message'),
        contactMethod: formData.get('contactMethod'),
    });

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            success: false,
        };
    }

    const { clinicId, serviceInterest, message, contactMethod } = validatedFields.data;

    try {
        await prisma.inquiry.create({
            data: {
                clinicId,
                userId: session?.user?.id || null, // Allow anonymous inquiries if not logged in
                serviceInterest,
                message,
                contactMethod,
            },
        });

        // revalidatePath(`/clinics/${clinicId}`); // Not strictly needed as inquiries aren't displayed publicly
        return { success: true };
    } catch (error) {
        console.error('Failed to submit inquiry:', error);

        return {
            errors: {
                _form: ['Failed to submit inquiry. Please try again later.'],
            },
            success: false,
        };
    }
}
