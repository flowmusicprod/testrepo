import { Resend } from "resend";

let resendClient = null;

function getResendClient() {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return null;
  }

  if (!resendClient) {
    resendClient = new Resend(apiKey);
  }

  return resendClient;
}

export async function sendContactEmail({ name, email, subject, message }) {
  const client = getResendClient();
  if (!client) {
    return { delivered: false, reason: "Missing RESEND_API_KEY" };
  }

  const to = process.env.BRAND_CONTACT_EMAIL;
  const from = process.env.RESEND_FROM_EMAIL;

  if (!to || !from) {
    return { delivered: false, reason: "Missing BRAND_CONTACT_EMAIL or RESEND_FROM_EMAIL" };
  }

  const result = await client.emails.send({
    from,
    to,
    subject: `[DE'JERI Contact] ${subject}`,
    replyTo: email,
    text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
  });

  return { delivered: true, result };
}

