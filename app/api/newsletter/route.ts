import { bad, deliver, isEmail, ok, readJson, str } from "@/lib/forms";

export async function POST(req: Request) {
  const body = await readJson(req);
  if (!body) return bad("We couldn’t read that sign-up.");
  const email = str(body.email, 200);
  if (!isEmail(email)) return bad("Please enter a valid email address.");
  const result = await deliver("newsletter", { email, first: str(body.first, 80), last: str(body.last, 80) });
  return ok(result);
}
