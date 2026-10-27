"use client";

import { useRef, useState, type FormEvent } from "react";
import { waiverAcknowledgement, waiverClauses, waiverIntro } from "@/content/waiver";
import { SignaturePad } from "@/components/forms/SignaturePad";
import { digits, isEmail, useFormSubmit } from "@/components/forms/useFormSubmit";
import { FormSuccess } from "@/components/forms/FormSuccess";
import { buttonClass } from "@/components/ui/Button";
import { ArrowIcon } from "@/components/ui/Icons";
import { gsap } from "@/lib/gsap";
import { prefersReducedMotion } from "@/lib/motion";

type Child = { first: string; last: string; age: string };
const blankChild: Child = { first: "", last: "", age: "" };
const kidColors = ["bg-pink text-white", "bg-sun", "bg-sky", "bg-pink-soft", "bg-sun-soft"];

/** The Funland waiver: same fields as the old Gravity Form (kids 1–5, parent, phone, email, signature). */
export function WaiverForm() {
  const { status, message, submit } = useFormSubmit("/api/waiver");
  const [count, setCount] = useState(1);
  const [kids, setKids] = useState<Child[]>([{ ...blankChild }]);
  const [parent, setParent] = useState({ first: "", last: "", phone: "", email: "" });
  const [signature, setSignature] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const kidsWrap = useRef<HTMLDivElement>(null);

  const setKidCount = (n: number) => {
    setCount(n);
    setKids((prev) => Array.from({ length: n }, (_, i) => prev[i] ?? { ...blankChild }));
    requestAnimationFrame(() => {
      if (prefersReducedMotion() || !kidsWrap.current) return;
      const last = kidsWrap.current.querySelectorAll("[data-kid]");
      const added = last[n - 1];
      if (added) gsap.fromTo(added, { scale: 0.9, y: 20, autoAlpha: 0 }, { scale: 1, y: 0, autoAlpha: 1, duration: 0.6, ease: "back.out(1.8)" });
    });
  };

  const updateKid = (i: number, key: keyof Child, value: string) =>
    setKids((prev) => prev.map((k, idx) => (idx === i ? { ...k, [key]: value } : k)));

  const validate = () => {
    const e: Record<string, string> = {};
    kids.forEach((k, i) => {
      if (!k.first.trim()) e[`kid${i}first`] = "Please enter a first name.";
      if (!k.last.trim()) e[`kid${i}last`] = "Please enter a last name.";
      const age = Number(k.age);
      if (!k.age || !Number.isFinite(age) || age < 1 || age > 16) e[`kid${i}age`] = "Please enter an age from 1 to 16.";
    });
    if (!parent.first.trim()) e.pfirst = "Please enter your first name.";
    if (!parent.last.trim()) e.plast = "Please enter your last name.";
    if (digits(parent.phone).length < 10) e.phone = "Please enter a 10-digit phone number.";
    if (!isEmail(parent.email)) e.email = "Please enter your email address.";
    if (!signature) e.signature = "Please sign the waiver.";
    return e;
  };

  const onSubmit = async (ev: FormEvent) => {
    ev.preventDefault();
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length) {
      const firstKey = Object.keys(e)[0];
      const node = document.getElementById(`f-${firstKey}`);
      node?.focus();
      if (window.__lenis && node) window.__lenis.scrollTo(node, { offset: -140 });
      return;
    }
    await submit({
      kids: kids.map((k) => ({ first: k.first.trim(), last: k.last.trim(), age: Number(k.age) })),
      parent: { first: parent.first.trim(), last: parent.last.trim(), phone: digits(parent.phone), email: parent.email.trim() },
      signature,
      signedOn: new Date().toISOString(),
    });
  };

  if (status === "success") {
    return (
      <FormSuccess title="You’re all set!" tone="sun">
        Thanks, {parent.first}! Your waiver for {kids.map((k) => k.first).join(", ")} is signed. See you at Funland. Let the fun
        begin!
      </FormSuccess>
    );
  }

  return (
    <form noValidate onSubmit={onSubmit} className="space-y-10">
      {/* The legal text */}
      <section aria-labelledby="w-text" className="sticker bg-cloud">
        <h2 id="w-text" className="border-b-[3px] border-ink px-6 py-4 font-display text-2xl md:px-8">
          FUNLAND WAIVER
        </h2>
        <div data-lenis-prevent tabIndex={0} className="max-h-[26rem] overflow-y-auto px-6 py-5 text-[0.98rem] leading-relaxed text-ink-soft md:px-8">
          <p>{waiverIntro}</p>
          <ol className="mt-4 space-y-3">
            {waiverClauses.map((c, i) => (
              <li key={i}>
                <span className="font-bold text-ink">{i + 1}.</span> {c}
              </li>
            ))}
          </ol>
        </div>
        <p className="border-t-2 border-dashed border-ink/20 px-6 py-3 text-sm text-ink-faint md:px-8">
          <span className="text-pink">*</span> indicates required fields
        </p>
      </section>

      {/* Kids */}
      <fieldset className="sticker bg-sun-soft p-6 md:p-8">
        <legend className="sr-only">Children</legend>
        <p className="field-label text-xl" id="kid-count-label">
          How many kids going to play today? <span className="text-pink">*</span>
        </p>
        <p className="text-sm text-ink-soft">Please choose a number from 1 to 5.</p>
        <div role="radiogroup" aria-labelledby="kid-count-label" className="mt-4 flex flex-wrap gap-2 sm:gap-2.5">
          {[1, 2, 3, 4, 5].map((n) => (
            <button
              key={n}
              type="button"
              role="radio"
              aria-checked={count === n}
              onClick={() => setKidCount(n)}
              className={`grid size-12 place-items-center rounded-2xl border-[3px] border-ink font-display text-2xl transition-[transform,box-shadow,background-color] duration-200 sm:size-14 ${
                count === n ? "-translate-y-0.5 bg-pink text-white shadow-[var(--shadow-sticker)]" : "bg-cloud hover:bg-sun"
              }`}
            >
              {n}
            </button>
          ))}
        </div>

        <div ref={kidsWrap} className="mt-8 grid gap-5">
          {kids.map((k, i) => (
            <div key={i} data-kid className="rounded-[1.25rem] border-[2.5px] border-ink bg-cloud p-5">
              <p className="flex items-center gap-3 font-display text-lg">
                <span className={`grid size-8 place-items-center rounded-full border-[2.5px] border-ink text-sm ${kidColors[i]}`}>{i + 1}</span>
                Child #{i + 1}
              </p>
              <div className="mt-4 grid gap-4 sm:grid-cols-[1fr_1fr_8rem]">
                <Field id={`kid${i}first`} label="First" required value={k.first} error={errors[`kid${i}first`]} onChange={(v) => updateKid(i, "first", v)} autoComplete="off" />
                <Field id={`kid${i}last`} label="Last" required value={k.last} error={errors[`kid${i}last`]} onChange={(v) => updateKid(i, "last", v)} autoComplete="off" />
                <Field
                  id={`kid${i}age`}
                  label={`Age`}
                  required
                  type="number"
                  inputMode="numeric"
                  min={1}
                  max={16}
                  value={k.age}
                  error={errors[`kid${i}age`]}
                  onChange={(v) => updateKid(i, "age", v)}
                />
              </div>
            </div>
          ))}
        </div>
      </fieldset>

      {/* Parent */}
      <fieldset className="sticker bg-sky-soft p-6 md:p-8">
        <legend className="sr-only">Parent or guardian</legend>
        <p className="field-label text-xl">
          Parent/Guardian Name <span className="text-pink">*</span>
        </p>
        <div className="mt-3 grid gap-4 sm:grid-cols-2">
          <Field id="pfirst" label="First" required value={parent.first} error={errors.pfirst} onChange={(v) => setParent({ ...parent, first: v })} autoComplete="given-name" />
          <Field id="plast" label="Last" required value={parent.last} error={errors.plast} onChange={(v) => setParent({ ...parent, last: v })} autoComplete="family-name" />
          <Field
            id="phone"
            label="Phone"
            required
            type="tel"
            inputMode="tel"
            value={parent.phone}
            error={errors.phone}
            hint="Please enter the phone number without space or dashes (i.e. 9058680888)"
            onChange={(v) => setParent({ ...parent, phone: v })}
            autoComplete="tel"
          />
          <Field
            id="email"
            label="Email"
            required
            type="email"
            value={parent.email}
            error={errors.email}
            hint="Please enter your email address."
            onChange={(v) => setParent({ ...parent, email: v })}
            autoComplete="email"
          />
        </div>
      </fieldset>

      {/* Sign */}
      <fieldset className="sticker bg-cloud p-6 md:p-8">
        <legend className="sr-only">Signature</legend>
        <p className="rounded-2xl border-2 border-dashed border-ink/25 bg-cream p-4 text-[0.85rem] font-bold leading-relaxed tracking-wide text-ink-soft">
          {waiverAcknowledgement}
        </p>
        <p id="f-signature" tabIndex={-1} className="field-label mt-6 text-xl">
          Parent/Guardian Signature <span className="text-pink">*</span>
        </p>
        <SignaturePad onChange={setSignature} invalid={!!errors.signature} describedBy={errors.signature ? "e-signature" : undefined} />
        {errors.signature ? (
          <p id="e-signature" className="mt-2 text-sm font-bold text-danger">
            {errors.signature}
          </p>
        ) : null}
      </fieldset>

      {status === "error" ? (
        <p role="alert" className="rounded-2xl border-[2.5px] border-danger bg-pink-soft p-4 font-semibold text-danger">
          {message} Please try again, or call us at 905-868-0888.
        </p>
      ) : null}

      <button type="submit" disabled={status === "sending"} className={buttonClass("pink", "w-full text-lg sm:w-auto sm:px-10")}>
        <span>{status === "sending" ? "Sending…" : "Submit"}</span>
        <ArrowIcon className="transition-transform group-hover:translate-x-1" />
      </button>
    </form>
  );
}

export function Field({
  id,
  label,
  value,
  onChange,
  error,
  hint,
  required,
  type = "text",
  textarea,
  ...rest
}: {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  error?: string;
  hint?: string;
  required?: boolean;
  type?: string;
  textarea?: boolean;
  inputMode?: React.HTMLAttributes<HTMLInputElement>["inputMode"];
  autoComplete?: string;
  min?: number;
  max?: number;
}) {
  const fid = `f-${id}`;
  const describedBy = [hint ? `h-${id}` : "", error ? `e-${id}` : ""].filter(Boolean).join(" ") || undefined;
  return (
    <div>
      <label htmlFor={fid} className="field-label">
        {label} {required ? <span className="text-pink">*</span> : null}
      </label>
      {textarea ? (
        <textarea
          id={fid}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          aria-invalid={!!error}
          aria-describedby={describedBy}
          aria-required={required}
          rows={6}
          className="field min-h-40 resize-y"
        />
      ) : (
        <input
          id={fid}
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          aria-invalid={!!error}
          aria-describedby={describedBy}
          aria-required={required}
          className="field"
          {...rest}
        />
      )}
      {hint ? (
        <p id={`h-${id}`} className="mt-1.5 text-sm text-ink-soft">
          {hint}
        </p>
      ) : null}
      {error ? (
        <p id={`e-${id}`} className="mt-1.5 text-sm font-bold text-danger">
          {error}
        </p>
      ) : null}
    </div>
  );
}
