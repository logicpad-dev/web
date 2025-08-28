'use server';

import * as z from 'zod';
import nodemailer from 'nodemailer';

const formSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  inquiry: z.string().min(10),
  service: z.string(),
});

export async function submitInquiry(data: z.infer<typeof formSchema>) {
  console.log('New inquiry received:', data);

  // Configure Nodemailer to use a third-party SMTP service.
  // Replace the placeholder values with the actual credentials from your provider (e.g., SendGrid, Mailgun).
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST, // e.g., 'smtp.sendgrid.net'
    port: Number(process.env.SMTP_PORT || 587),
    secure: (process.env.SMTP_PORT || 587) === '465', // true for 465, false for other ports
    auth: {
      user: process.env.SMTP_USER, // Your username (often 'apikey' for services like SendGrid)
      pass: process.env.SMTP_PASS, // Your password or API key
    },
  });

  const mailOptions = {
    from: `"${data.name}" <${data.email}>`,
    to: process.env.EMAIL_TO, // The email address that will receive the inquiries
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
}
