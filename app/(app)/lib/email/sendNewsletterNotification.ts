import nodemailer from "nodemailer";

export async function sendNewsletterNotification(email: string) {
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: true,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  await transporter.sendMail({
    from: `"ScholarBrood Website" <${process.env.SMTP_USER}>`,
    to: "info@scholarbrood.com",
    subject: "📬 New Newsletter Subscription",
    html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.6">
        <h2>New Newsletter Subscriber</h2>
        <p>A new user has subscribed to the ScholarBrood newsletter.</p>
        <hr />
        <p><strong>Email:</strong> ${email}</p>
        <hr />
        <p style="color: #666; font-size: 12px">
          Sent automatically from the ScholarBrood website
        </p>
      </div>
    `,
  });
}
