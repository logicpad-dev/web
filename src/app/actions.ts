// 'use server';
// This file is disabled because Server Actions are not compatible with static export.
// You will need to use a third-party form service for the contact form
// when deploying to a static hosting provider like GitHub Pages.

import * as z from 'zod';
import nodemailer from 'nodemailer';

const formSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  inquiry: z.string().min(10),
  service: z.string(),
});

export async function submitInquiry(data: z.infer<typeof formSchema>) {
  console.log('Form submission is disabled for static export.');
  // The original email sending logic is commented out.
  /*
  console.log('New inquiry received:', data);

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT || 587),
    secure: (process.env.SMTP_PORT || 587) === '465',
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  const mailOptions = {
    from: `"${data.name}" <${data.email}>`,
    to: process.env.EMAIL_TO,
    subject: `New Inquiry: ${data.service}`,
    text: `
      Name: ${data.name}
      Email: ${data.email}
      Service: ${data.service}
      
      Message:
      ${data.inquiry}
    `,
    html: `
      <h3>New Inquiry</h3>
      <p><strong>Name:</strong> ${data.name}</p>
      <p><strong>Email:</strong> ${data.email}</p>
      <p><strong>Service:</strong> ${data.service}</p>
      <hr>
      <p><strong>Message:</strong></p>
      <p>${data.inquiry.replace(/\n/g, '<br>')}</p>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    return { success: true, message: 'Thank you for your inquiry! We will get back to you shortly.' };
  } catch (error) {
    console.error('Error sending email:', error);
    return { success: false, message: 'Sorry, there was an error sending your message. Please try again later.' };
  }
  */
  return { success: true, message: 'This is a simulated success message.' };
}
