import { NextResponse } from "next/server";

export type FormKind = "contact" | "newsletter" | "waiver";

/**
 * Hand-off point for every form on the site.
 *
 * NOT CONNECTED YET. Submissions are validated and accepted, but nothing is emailed or stored.
 * Connect each kind here (for example: Resend for contact enquiries, Mailchimp for the newsletter,
 * and a database or e-signature service for waivers) before launch. See README.md.
 */
export async function deliver(kind: FormKind, data: Record<string, unknown>) {
  if (process.env.NODE_ENV !== "production") {
    const preview = kind === "waiver" ? { ...data, signature: "[signature image]" } : data;
    console.info(`[forms] ${kind} submission (not delivered: no integration yet)`, preview);
  }
  return { delivered: false };
}

export function ok(extra: Record<string, unknown> = {}) {
  return NextResponse.json({ ok: true, ...extra });
}

export function bad(error: string, status = 400) {
  return NextResponse.json({ ok: false, error }, { status });
}

export const str = (v: unknown, max = 500) => (typeof v === "string" ? v.trim().slice(0, max) : "");
export const isEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v);

export async function readJson(req: Request) {
  try {
    return (await req.json()) as Record<string, unknown>;
  } catch {
    return null;
  }
}
