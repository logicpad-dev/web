'use server';

import * as z from 'zod';

const formSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  inquiry: z.string().min(10),
  service: z.string(),
});

export async function submitInquiry(data: z.infer<typeof formSchema>) {
  console.log('New inquiry received:', data);
  // Here you would typically send an email, save to a database, etc.
  // For this demo, we'll just log it to the server console.
  return { success: true, message: 'Thank you for your inquiry! We will get back to you shortly.' };
}
