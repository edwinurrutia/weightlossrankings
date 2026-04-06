"use client";

import { useState } from "react";

type Status =
  | { kind: "idle" }
  | { kind: "submitting" }
  | { kind: "success" }
  | { kind: "error"; message: string };

const SUBJECTS = [
  "General inquiry",
  "Provider Correction",
  "Press",
  "Partnership",
  "Privacy Request",
  "Other",
] as const;

export default function ContactForm() {
  const [status, setStatus] = useState<Status>({ kind: "idle" });

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // Capture the form element before any awaits — React invalidates
    // e.currentTarget once the synthetic handler returns.
    const formEl = e.currentTarget;
    setStatus({ kind: "submitting" });

    const formData = new FormData(formEl);
    const payload = {
      name: formData.get("name"),
      email: formData.get("email"),
      subject: formData.get("subject"),
      message: formData.get("message"),
      // honeypot — real users leave this empty
      company: formData.get("company"),
    };

    // Isolate the fetch call so only true network failures show
    // "Network error". Don't wrap response-body parsing in the same
    // try/catch — a Grammarly/adblocker/extension that mangles the
    // response body would otherwise mask a real success (email sent,
    // 200 OK) as a fake network error.
    let res: Response;
    try {
      res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
    } catch {
      setStatus({
        kind: "error",
        message: "Network error. Please try again.",
      });
      return;
    }

    if (!res.ok) {
      let errorMessage = "Something went wrong. Please try again.";
      try {
        const data = await res.json();
        if (data && typeof data.error === "string") errorMessage = data.error;
      } catch {
        // Response body wasn't JSON — fall back to the generic message.
      }
      setStatus({ kind: "error", message: errorMessage });
      return;
    }

    // Success: do NOT parse the response body. The server already
    // returned 200 OK, which means the email was queued/sent. Reading
    // the body here would re-introduce the bug if anything in the
    // browser pipeline (extensions, service workers, antivirus shims)
    // intercepts the response stream.
    setStatus({ kind: "success" });
    try {
      formEl.reset();
    } catch {
      // Defensive — never let a reset() failure mask a real success.
    }
  }

  if (status.kind === "success") {
    return (
      <div className="rounded-2xl border border-brand-violet/20 bg-brand-violet/5 p-8 text-center">
        <h3 className="font-heading text-xl font-bold text-brand-text-primary mb-2">
          Thanks — we got your message.
        </h3>
        <p className="text-sm text-brand-text-secondary">
          We typically reply within one business day.
        </p>
        <button
          type="button"
          onClick={() => setStatus({ kind: "idle" })}
          className="mt-5 text-sm font-semibold text-brand-violet hover:underline"
        >
          Send another message
        </button>
      </div>
    );
  }

  const submitting = status.kind === "submitting";

  return (
    <form onSubmit={handleSubmit} className="grid gap-4 sm:grid-cols-2">
      <label className="text-sm font-medium text-brand-text-primary">
        Name
        <input
          type="text"
          name="name"
          required
          maxLength={200}
          disabled={submitting}
          className="mt-1 w-full rounded-xl border border-gray-300 px-3 py-2 text-sm focus:border-brand-violet focus:outline-none focus:ring-2 focus:ring-brand-violet/20 disabled:opacity-60"
        />
      </label>
      <label className="text-sm font-medium text-brand-text-primary">
        Email
        <input
          type="email"
          name="email"
          required
          maxLength={320}
          disabled={submitting}
          className="mt-1 w-full rounded-xl border border-gray-300 px-3 py-2 text-sm focus:border-brand-violet focus:outline-none focus:ring-2 focus:ring-brand-violet/20 disabled:opacity-60"
        />
      </label>
      <label className="text-sm font-medium text-brand-text-primary sm:col-span-2">
        Subject
        <select
          name="subject"
          defaultValue="General inquiry"
          disabled={submitting}
          className="mt-1 w-full rounded-xl border border-gray-300 px-3 py-2 text-sm focus:border-brand-violet focus:outline-none focus:ring-2 focus:ring-brand-violet/20 disabled:opacity-60"
        >
          {SUBJECTS.map((s) => (
            <option key={s}>{s}</option>
          ))}
        </select>
      </label>
      <label className="text-sm font-medium text-brand-text-primary sm:col-span-2">
        Message
        <textarea
          name="message"
          required
          rows={6}
          minLength={5}
          maxLength={5000}
          disabled={submitting}
          className="mt-1 w-full rounded-xl border border-gray-300 px-3 py-2 text-sm focus:border-brand-violet focus:outline-none focus:ring-2 focus:ring-brand-violet/20 disabled:opacity-60"
        />
      </label>

      {/* Honeypot — visually hidden, off-screen, not announced. Real users
          never touch this; bots fill every input they see. */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          left: "-10000px",
          width: "1px",
          height: "1px",
          overflow: "hidden",
        }}
      >
        <label>
          Company (leave blank)
          <input
            type="text"
            name="company"
            tabIndex={-1}
            autoComplete="off"
          />
        </label>
      </div>

      <div className="sm:col-span-2 flex flex-col gap-3">
        <div className="flex flex-col sm:flex-row sm:items-center gap-4">
          <button
            type="submit"
            disabled={submitting}
            className="inline-flex items-center justify-center rounded-xl bg-brand-violet px-6 py-3 text-white font-semibold hover:bg-brand-violet/90 transition disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {submitting ? "Sending..." : "Send message"}
          </button>
          {status.kind === "error" && (
            <p className="text-sm text-red-600">{status.message}</p>
          )}
        </div>
        {status.kind === "error" && (
          <p className="text-xs text-brand-text-secondary leading-relaxed">
            Having trouble? Email us directly at{" "}
            <a
              href="mailto:hello@weightlossrankings.org?subject=Contact%20form%20fallback"
              className="text-brand-violet font-semibold underline"
            >
              hello@weightlossrankings.org
            </a>{" "}
            and we&apos;ll get back to you within one business day.
          </p>
        )}
      </div>
    </form>
  );
}
