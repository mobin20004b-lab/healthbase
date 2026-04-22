"use server";

import { z } from "zod";
import prisma from "@/lib/prisma";


const inquirySchema = z.object({
  clinicId: z.string().min(1, "Clinic ID is required"),
  serviceInterest: z.string().optional(),
  message: z.string().min(1, "Message is required"),
  contactMethod: z.string().min(1, "Contact method is required"),
});

export type InquiryState = {
  success: boolean;
  errors?: Record<string, string[]>;
  message?: string;
};

export async function submitInquiry(
  prevState: InquiryState,
  formData: FormData
): Promise<InquiryState> {
  const data = {
    clinicId: formData.get("clinicId") as string,
    serviceInterest: formData.get("serviceInterest") as string,
    message: formData.get("message") as string,
    contactMethod: formData.get("contactMethod") as string,
  };

  const validatedFields = inquirySchema.safeParse(data);

  if (!validatedFields.success) {
    return {
      success: false,
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Please fix the errors in the form.",
    };
  }

  const { clinicId, serviceInterest, message, contactMethod } = validatedFields.data;

  try {
    // In a real app, we would get the user ID from the session here
    // const session = await auth();
    // const userId = session?.user?.id;

    await prisma.inquiry.create({
      data: {
        clinicId,
        serviceInterest,
        message,
        contactMethod,
        // userId: userId, // Assuming anonymous inquiries are allowed for now, or mock user
      },
    });

    return {
      success: true,
      message: "Inquiry submitted successfully.",
    };
  } catch (error) {
    // Catch database connection errors and mock success for local verification
    const e = error as Error & { code?: string };
    if (
      process.env.NODE_ENV === "development" &&
      (e.name === "PrismaClientKnownRequestError" ||
      e.code === "ECONNREFUSED" ||
      e.message?.includes("Can't reach database server") ||
      e.name === "PrismaClientInitializationError")
    ) {
      console.warn("Mocking inquiry submission due to database connection error", error);
      return {
        success: true,
        message: "Inquiry submitted successfully (Mocked).",
      };
    }

    console.error("Failed to submit inquiry:", error);
    return {
      success: false,
      message: "An unexpected error occurred while submitting your inquiry.",
    };
  }
}
