import { Resend } from 'resend';
import { NextResponse } from 'next/server';

const NOTIFY_TO = 'info@cdalise.com';
const NOTIFY_FROM = 'Voyara Travel Website <onboarding@resend.dev>';

export async function POST(request: Request) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ skipped: true, reason: 'RESEND_API_KEY not configured' }, { status: 200 });
  }

  const body = await request.json();
  const { subject, name, phone, email, message } = body as {
    subject: string;
    name?: string;
    phone?: string;
    email?: string;
    message: string;
  };

  const resend = new Resend(apiKey);

  try {
    await resend.emails.send({
      from: NOTIFY_FROM,
      to: NOTIFY_TO,
      subject: `[Voyara Travel Website] ${subject}`,
      text: [
        name ? `Name: ${name}` : null,
        phone ? `Phone: ${phone}` : null,
        email ? `Email: ${email}` : null,
        '',
        message
      ].filter(Boolean).join('\n')
    });
    return NextResponse.json({ ok: true });
  } catch (err) {
    return NextResponse.json({ ok: false, error: String(err) }, { status: 500 });
  }
}
