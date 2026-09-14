import { createHmac, timingSafeEqual } from 'crypto';

export const SITE_SESSION_COOKIE = 'site_session';
const SESSION_TTL_MS = 1000 * 60 * 60 * 24 * 7; // 7 days

function getSecret(): string {
  const secret = process.env.SITE_SESSION_SECRET;
  if (!secret) {
    throw new Error('SITE_SESSION_SECRET is not set');
  }
  return secret;
}

function base64url(input: string): string {
  return Buffer.from(input, 'utf8').toString('base64url');
}

function fromBase64url(input: string): string {
  return Buffer.from(input, 'base64url').toString('utf8');
}

function sign(payload: string, secret: string): string {
  return createHmac('sha256', secret).update(payload).digest('hex');
}

/** Creates a signed session token: base64url(payload).hexSignature */
export function createSessionToken(): string {
  const secret = getSecret();
  const payload = JSON.stringify({ exp: Date.now() + SESSION_TTL_MS });
  const encodedPayload = base64url(payload);
  const signature = sign(encodedPayload, secret);
  return `${encodedPayload}.${signature}`;
}

/** Verifies a session token's signature and expiry. Never throws. */
export function verifySessionToken(token: string | undefined | null): boolean {
  if (!token) return false;
  const parts = token.split('.');
  if (parts.length !== 2) return false;
  const [encodedPayload, signature] = parts;

  let secret: string;
  try {
    secret = getSecret();
  } catch {
    return false;
  }

  const expectedSignature = sign(encodedPayload, secret);
  const sigBuffer = Buffer.from(signature, 'hex');
  const expectedBuffer = Buffer.from(expectedSignature, 'hex');
  if (sigBuffer.length !== expectedBuffer.length) return false;
  if (!timingSafeEqual(sigBuffer, expectedBuffer)) return false;

  try {
    const payload = JSON.parse(fromBase64url(encodedPayload)) as { exp: number };
    return typeof payload.exp === 'number' && payload.exp > Date.now();
  } catch {
    return false;
  }
}

/** Constant-time comparison of the submitted password against the server secret. */
export function verifyPassword(submitted: string): boolean {
  const expected = process.env.SITE_ACCESS_PASSWORD;
  if (!expected) return false;
  const a = Buffer.from(submitted);
  const b = Buffer.from(expected);
  if (a.length !== b.length) return false;
  return timingSafeEqual(a, b);
}
