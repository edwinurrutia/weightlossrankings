"use client";

import { useState } from "react";

interface EmailGateProps {
  onNext: (email: string) => void;
  onBack: () => void;
}

type Status = "idle" | "loading" | "error";

export default function EmailGate({ onNext, onBack }: EmailGateProps) {
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
        onNext(email);
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  return (
    <div className="flex flex-col items-center gap-6 text-center">
      <div className="text-5xl">💰</div>
      <div>
        <h2 className="text-2xl font-bold text-brand-text-primary font-heading">
          Your savings report is ready!
        </h2>
        <p className="text-brand-text-secondary mt-2 text-sm">
          Enter your email to see how much you could save every month.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="w-full flex flex-col gap-3">
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          disabled={status === "loading"}
          style={{ fontSize: "16px" }}
          className="w-full rounded-full border border-gray-200 px-5 py-3 text-brand-text-primary placeholder:text-brand-text-secondary/50 focus:outline-none focus:ring-2 focus:ring-brand-violet/40 disabled:opacity-60"
        />
        <button
          type="submit"
          disabled={status === "loading" || !email}
          className="w-full inline-flex items-center justify-center rounded-full bg-brand-gradient text-white font-semibold px-6 py-3 text-base shadow-lg hover:shadow-xl hover:brightness-110 transition-all tap-target disabled:opacity-60"
        >
          {status === "loading" ? "Loading…" : "See My Savings"}
        </button>
      </form>

      {status === "error" && (
        <p className="text-sm text-red-500">
          Something went wrong. Please try again.
        </p>
      )}

      <button
        onClick={onBack}
        className="text-sm text-brand-text-secondary hover:text-brand-violet transition-colors"
      >
        &larr; Back
      </button>
    </div>
  );
}
