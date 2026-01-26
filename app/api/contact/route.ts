import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resendApiKey = process.env.RESEND_API_KEY;
const toEmail = process.env.CONTACT_TO_EMAIL;
const fromEmail = process.env.CONTACT_FROM_EMAIL || 'portfolio@example.com';

/**
 * NOTE:
 * In local dev and before Resend is configured, this route will return 501 and
 * the contact form should be treated as a visual placeholder. Once credentials
 * are available, these env vars should be set and the route will send real mail.
 */
export async function POST(request: Request) {
  if (!resendApiKey || !toEmail) {
    return NextResponse.json(
      { ok: false, message: 'Email delivery not yet configured.' },
      { status: 501 },
    );
  }

  const { name, email, message } = await request.json();

  const resend = new Resend(resendApiKey);

  try {
    await resend.emails.send({
      from: fromEmail,
      to: toEmail,
      subject: `New message from CraftedByNafis`,
      replyTo: email,
      text: `From: ${name} <${email}>

${message}`,
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error('Resend error', error);
    return NextResponse.json(
      { ok: false, message: 'Failed to send message.' },
      { status: 500 },
    );
  }
}
