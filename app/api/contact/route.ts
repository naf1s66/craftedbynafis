import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { z } from 'zod';

const resendApiKey = process.env.RESEND_API_KEY;
const toEmail = process.env.CONTACT_TO_EMAIL;
const fromEmail = process.env.CONTACT_FROM_EMAIL || 'portfolio@example.com';

const MAX_NAME_LENGTH = 200;
const MAX_EMAIL_LENGTH = 320;
const MAX_MESSAGE_LENGTH = 10000;

const noNewlines = (value: string) => !/[\r\n]/.test(value);

const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, 'Name is required.')
    .max(MAX_NAME_LENGTH, 'Name is too long.')
    .refine(noNewlines, 'Name must not contain newlines.'),
  email: z
    .string()
    .trim()
    .min(1, 'Email is required.')
    .max(MAX_EMAIL_LENGTH, 'Email is too long.')
    .email('Email is invalid.')
    .refine(noNewlines, 'Email must not contain newlines.'),
  message: z
    .string()
    .trim()
    .min(1, 'Message is required.')
    .max(MAX_MESSAGE_LENGTH, 'Message is too long.'),
});

/**
 * NOTE:
 * In local dev and before Resend is configured, this route will return 501 and
 * the contact form should be treated as a visual placeholder. Once credentials
 * are available, these env vars should be set and the route will send real mail.
 */
/**
 * Handles contact form submissions and forwards them to Resend.
 */
export async function POST(request: Request) {
  if (!resendApiKey || !toEmail) {
    return NextResponse.json(
      { ok: false, message: 'Email delivery not yet configured.' },
      { status: 501 },
    );
  }

  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, message: 'Invalid JSON payload.' },
      { status: 400 },
    );
  }

  const parsed = contactSchema.safeParse(payload);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, message: 'Invalid contact form payload.' },
      { status: 400 },
    );
  }

  const { name, email, message } = parsed.data;

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
