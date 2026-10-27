import { bad, deliver, isEmail, ok, readJson, str } from "@/lib/forms";

const MAX_SIGNATURE = 400_000; // ~400 KB PNG data URL

export async function POST(req: Request) {
  const body = await readJson(req);
  if (!body) return bad("We couldn’t read that waiver.");

  const kidsIn = Array.isArray(body.kids) ? body.kids.slice(0, 5) : [];
  const kids = kidsIn.map((k) => {
    const o = (k ?? {}) as Record<string, unknown>;
    return { first: str(o.first, 80), last: str(o.last, 80), age: Number(o.age) };
  });
  if (!kids.length || kids.some((k) => !k.first || !k.last || !(k.age >= 1 && k.age <= 16))) {
    return bad("Please complete the name and age for each child.");
  }

  const p = (body.parent ?? {}) as Record<string, unknown>;
  const parent = { first: str(p.first, 80), last: str(p.last, 80), phone: str(p.phone, 20).replace(/\D/g, ""), email: str(p.email, 200) };
  if (!parent.first || !parent.last) return bad("Please enter the parent/guardian name.");
  if (parent.phone.length < 10) return bad("Please enter a 10-digit phone number.");
  if (!isEmail(parent.email)) return bad("Please enter a valid email address.");

  const signature = typeof body.signature === "string" ? body.signature : "";
  if (!signature.startsWith("data:image/png;base64,") || signature.length > MAX_SIGNATURE) return bad("Please sign the waiver.");

  const result = await deliver("waiver", { kids, parent, signature, signedOn: new Date().toISOString() });
  return ok(result);
}
