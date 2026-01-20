import nodemailer from "nodemailer";

interface OrderEmailPayload {
  service: string;
  name: string;
  email: string;
  details: string;
  files?: { filename: string; content: Buffer }[];
}

export async function sendOrderNotification(payload: OrderEmailPayload) {
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: true,
    auth: {
      user: process.env.SMTP_ORDER_USER,
      pass: process.env.SMTP_ORDER_PASS,
    },
  });

  await transporter.sendMail({
    from: `"ScholarBrood Website" <${process.env.SMTP_ORDER_USER}>`,
    to: "orders@scholarbrood.com",
    replyTo: payload.email,
    subject: `📩 New Order: ${payload.service}`,
    html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.6">
        <h2>New Order Submission</h2>
        <p><strong>Name:</strong> ${payload.name}</p>
        <p><strong>Email:</strong> ${payload.email}</p>
        <p><strong>Service:</strong> ${payload.service}</p>
        <hr />
        <p><strong>Project Details:</strong></p>
        <p>${payload.details.replace(/\n/g, "<br />")}</p>
      </div>
    `,
    attachments: payload.files?.map(f => ({
      filename: f.filename,
      content: f.content
    })),
  });
}
