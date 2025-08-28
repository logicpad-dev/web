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

  const transporter = nodemailer.createTransport({
    // IMPORTANT: You'll need to configure your email provider here.
    // This is an example for Gmail, but you should use a dedicated email
    // service like SendGrid, Mailgun, or Amazon SES for production.
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER, // Add your email address to .env
      pass: process.env.EMAIL_PASS, // Add your email password or app-specific password to .env
    },
  });

  const mailOptions = {
    from: `"${data.name}" <${data.email}>`,
    to: 'your-receiving-email@example.com', // Change this to the email address where you want to receive inquiries
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
