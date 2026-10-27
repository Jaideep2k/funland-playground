"use client";

import { useState, type FormEvent } from "react";
import { Field } from "@/components/forms/WaiverForm";
import { FormSuccess } from "@/components/forms/FormSuccess";
import { isEmail, useFormSubmit } from "@/components/forms/useFormSubmit";
import { buttonClass } from "@/components/ui/Button";
import { ArrowIcon } from "@/components/ui/Icons";

/** "Contact Us": Name, Email, Message, as on the old site. */
export function ContactForm() {
  const { status, message, submit } = useFormSubmit("/api/contact");
  const [v, setV] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const onSubmit = async (ev: FormEvent) => {
    ev.preventDefault();
    const e: Record<string, string> = {};
    if (!v.name.trim()) e.name = "Please enter your name.";
    if (!isEmail(v.email)) e.email = "Please enter a valid email address.";
    if (v.message.trim().length < 2) e.message = "Please enter a message.";
    setErrors(e);
    if (Object.keys(e).length) {
      document.getElementById(`f-${Object.keys(e)[0]}`)?.focus();
      return;
    }
    await submit({ name: v.name.trim(), email: v.email.trim(), message: v.message.trim() });
  };

  if (status === "success") {
    return (
      <FormSuccess title="Message sent!" tone="sky">
        Thanks, {v.name.split(" ")[0]}! We’ll get back to you soon. For anything urgent, call us at 905-868-0888.
      </FormSuccess>
    );
  }

  return (
    <form noValidate onSubmit={onSubmit} className="space-y-5">
      <Field id="name" label="Name" required value={v.name} error={errors.name} onChange={(x) => setV({ ...v, name: x })} autoComplete="name" />
      <Field id="email" label="Email" required type="email" value={v.email} error={errors.email} onChange={(x) => setV({ ...v, email: x })} autoComplete="email" />
      <Field id="message" label="Message" required textarea value={v.message} error={errors.message} onChange={(x) => setV({ ...v, message: x })} />
      {status === "error" ? (
        <p role="alert" className="rounded-2xl border-[2.5px] border-danger bg-pink-soft p-4 font-semibold text-danger">
          {message}
        </p>
      ) : null}
      <button type="submit" disabled={status === "sending"} className={buttonClass("pink", "w-full sm:w-auto sm:px-10")}>
        <span>{status === "sending" ? "Sending…" : "Submit"}</span>
        <ArrowIcon className="transition-transform group-hover:translate-x-1" />
      </button>
    </form>
  );
}

/** "Newsletter Sign-up!": E-Mail, First Name, Last Name. */
export function NewsletterForm() {
  const { status, message, submit } = useFormSubmit("/api/newsletter");
  const [v, setV] = useState({ email: "", first: "", last: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const onSubmit = async (ev: FormEvent) => {
    ev.preventDefault();
    const e: Record<string, string> = {};
    if (!isEmail(v.email)) e.nemail = "Please enter a valid email address.";
    setErrors(e);
    if (Object.keys(e).length) {
      document.getElementById("f-nemail")?.focus();
      return;
    }
    await submit({ email: v.email.trim(), first: v.first.trim(), last: v.last.trim() });
  };

  if (status === "success") {
    return (
      <FormSuccess title="You’re on the list!" tone="sun">
        Watch your inbox for Funland news, specials and holiday hours.
      </FormSuccess>
    );
  }

  return (
    <form noValidate onSubmit={onSubmit} className="space-y-4">
      <Field id="nemail" label="E-Mail" required type="email" value={v.email} error={errors.nemail} onChange={(x) => setV({ ...v, email: x })} autoComplete="email" />
      <div className="grid gap-4 sm:grid-cols-2">
        <Field id="nfirst" label="First Name" value={v.first} onChange={(x) => setV({ ...v, first: x })} autoComplete="given-name" />
        <Field id="nlast" label="Last Name" value={v.last} onChange={(x) => setV({ ...v, last: x })} autoComplete="family-name" />
      </div>
      {status === "error" ? (
        <p role="alert" className="rounded-2xl border-[2.5px] border-danger bg-pink-soft p-4 font-semibold text-danger">
          {message}
        </p>
      ) : null}
      <button type="submit" disabled={status === "sending"} className={buttonClass("ink", "w-full sm:w-auto sm:px-8")}>
        <span>{status === "sending" ? "Signing up…" : "Sign me up"}</span>
        <ArrowIcon className="transition-transform group-hover:translate-x-1" />
      </button>
    </form>
  );
}
