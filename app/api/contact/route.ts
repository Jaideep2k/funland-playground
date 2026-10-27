import { bad, deliver, isEmail, ok, readJson, str } from "@/lib/forms";

export async function POST(req: Request) {
  const body = await readJson(req);
  if (!body) return bad("We couldn’t read that message.");
  const name = str(body.name, 120);
  const email = str(body.email, 200);
  const message = str(body.message, 5000);
  if (!name || !isEmail(email) || message.length < 2) return bad("Please fill in your name, email and message.");
  const result = await deliver("contact", { name, email, message });
  return ok(result);
}
