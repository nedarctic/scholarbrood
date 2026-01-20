import nodemailer from "nodemailer";

interface ContactEmailPayload {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export async function sendContactNotification(payload: ContactEmailPayload) {
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: true,
    auth: {
      user: process.env.SMTP_SUPPORT_USER,
      pass: process.env.SMTP_SUPPORT_PASS,
    },
  });

  await transporter.sendMail({
    from: `"ScholarBrood Website" <${process.env.SMTP_SUPPORT_USER}>`,
    to: "info@scholarbrood.com",
    replyTo: payload.email,
    subject: `📩 New Contact Message: ${payload.subject}`,
    html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.6">
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${payload.name}</p>
        <p><strong>Email:</strong> ${payload.email}</p>
        <p><strong>Subject:</strong> ${payload.subject}</p>
        <hr />
        <p><strong>Message:</strong></p>
        <p>${payload.message.replace(/\n/g, "<br />")}</p>
        <hr />
        <p style="color: #666; font-size: 12px">
          Sent from ScholarBrood contact form
        </p>
      </div>
    `,
  });
}
