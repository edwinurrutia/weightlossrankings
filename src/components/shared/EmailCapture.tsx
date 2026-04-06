"use client";

import { useState } from "react";

type Status = "idle" | "loading" | "success" | "error";

interface EmailCaptureProps {
  heading?: string;
  description?: string;
  buttonText?: string;
  className?: string;
}

export default function EmailCapture({
  heading = "Get the Free GLP-1 Starter Guide",
  description = "Plus weekly price alerts and new provider reviews.",
  buttonText = "Send Me the Guide",
  className = "",
}: EmailCaptureProps) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!email || status === "loading") return;

    setStatus("loading");

    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (res.ok) {
        setStatus("success");
        setEmail("");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div
        className={`rounded-2xl bg-brand-success/10 border border-brand-success/30 p-6 text-center ${className}`}
      >
        <p className="text-2xl mb-2">✅</p>
        <p className="font-semibold text-brand-success">You&apos;re in!</p>
        <p className="text-sm text-brand-text-secondary mt-1">
          Check your inbox for the GLP-1 Starter Guide.
        </p>
      </div>
    );
  }

  return (
    <div className={`rounded-2xl bg-white border border-brand-violet/10 shadow-sm p-6 ${className}`}>
      {heading && (
        <h3 className="text-lg font-semibold text-brand-text-primary mb-1">
          {heading}
        </h3>
      )}
      {description && (
        <p className="text-sm text-brand-text-secondary mb-4">{description}</p>
      )}

      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          disabled={status === "loading"}
          style={{ fontSize: "16px" }}
          className="flex-1 rounded-full border border-gray-200 px-5 py-3 text-brand-text-primary placeholder:text-brand-text-secondary/50 focus:outline-none focus:ring-2 focus:ring-brand-violet/40 disabled:opacity-60"
        />
        <button
          type="submit"
          disabled={status === "loading"}
          className="inline-flex items-center justify-center rounded-full bg-brand-gradient text-white font-semibold px-6 py-3 text-base shadow-lg hover:shadow-xl hover:brightness-110 transition-all tap-target disabled:opacity-60 whitespace-nowrap"
        >
          {status === "loading" ? "Sending…" : buttonText}
        </button>
      </form>

      {status === "error" && (
        <p className="mt-3 text-sm text-red-500">
          Something went wrong. Please try again.
        </p>
      )}
    </div>
  );
}
