'use server';

import { suggestService } from '@/ai/flows/suggest-service';
import * as z from 'zod';
import { services } from '@/lib/services';

const formSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  inquiry: z.string().min(10),
  service: z.string(),
});

export async function handleSuggestService(inquiry: string) {
  if (!inquiry || inquiry.length < 10) return null;
  try {
    const result = await suggestService({ inquiry, services: services.filter(s => s !== 'Other') });
    return result.suggestedService;
  } catch (error) {
    console.error('AI suggestion failed:', error);
    return null;
  }
}

export async function submitInquiry(data: z.infer<typeof formSchema>) {
  console.log('New inquiry received:', data);
  // Here you would typically send an email, save to a database, etc.
  // For this demo, we'll just log it to the server console.
  return { success: true, message: 'Thank you for your inquiry! We will get back to you shortly.' };
}
