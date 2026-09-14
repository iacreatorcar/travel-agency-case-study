import { Resend } from 'resend';
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { verifySessionToken, SITE_SESSION_COOKIE } from '../../../lib/site-session';

const NOTIFY_TO = 'info@cdalise.com';
const NOTIFY_FROM = 'Voyara Travel Website <onboarding@resend.dev>';

export async function POST(request: Request) {
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get(SITE_SESSION_COOKIE)?.value;
  if (!verifySessionToken(sessionToken)) {
    return NextResponse.json({ ok: false, error: 'Unauthorized' }, { status: 401 });
  }

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
