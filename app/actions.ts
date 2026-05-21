"use server"

import { z } from "zod"

const contactFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  message: z.string().min(10, "Message must be at least 10 characters"),
})

export async function sendEmail(formData: FormData) {
  const name = formData.get("name") as string
  const email = formData.get("email") as string
  const message = formData.get("message") as string

  const validatedFields = contactFormSchema.safeParse({
    name,
    email,
    message,
  })

  if (!validatedFields.success) {
    return {
      error: validatedFields.error.flatten().fieldErrors,
    }
  }

  // Here you would typically use a service like Resend, SendGrid, or Nodemailer
  // For now, we'll simulate a delay and log the message
  console.log("Form Submission:", validatedFields.data)
  
  await new Promise((resolve) => setTimeout(resolve, 1000))

  return {
    success: true,
  }
}
