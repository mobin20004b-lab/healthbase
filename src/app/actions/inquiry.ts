'use server'

import { z } from 'zod'
import { auth } from '@/auth'
import prisma from '@/lib/prisma'
import { revalidatePath } from 'next/cache'

const inquirySchema = z.object({
  clinicId: z.string().min(1, 'Clinic ID is required'),
  serviceInterest: z.string().optional().nullable(),
  message: z.string().min(10, 'Message must be at least 10 characters'),
  contactMethod: z.enum(['PHONE', 'WHATSAPP']),
})

export type InquiryFormState = {
  success?: boolean
  error?: string
  fieldErrors?: {
    [key: string]: string[]
  }
}

export async function submitInquiry(
  prevState: InquiryFormState,
  formData: FormData
): Promise<InquiryFormState> {
  const session = await auth()

  if (!session?.user?.id) {
    return { error: 'You must be logged in to submit an inquiry.' }
  }

  const rawData = {
    clinicId: formData.get('clinicId'),
    serviceInterest: formData.get('serviceInterest'),
    message: formData.get('message'),
    contactMethod: formData.get('contactMethod'),
  }

  const validatedFields = inquirySchema.safeParse(rawData)

  if (!validatedFields.success) {
    return {
      error: 'Invalid form data. Please check your inputs.',
      fieldErrors: validatedFields.error.flatten().fieldErrors,
    }
  }

  const { clinicId, serviceInterest, message, contactMethod } = validatedFields.data

  try {
    await prisma.inquiry.create({
      data: {
        clinicId,
        userId: session.user.id,
        serviceInterest: serviceInterest || null,
        message,
        contactMethod,
        status: 'PENDING',
      },
    })

    // Revalidate the clinic page to reflect any changes if we were showing inquiries there,
    // but mostly just to ensure cache consistency.
    revalidatePath(`/clinics/${clinicId}`)

    return { success: true }
  } catch (error) {
    console.error('Failed to submit inquiry:', error)
    return { error: 'Failed to submit inquiry. Please try again.' }
  }
}
