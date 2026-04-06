"use client";

import { useState } from "react";

interface CostStepProps {
  value: number | null;
  onNext: (value: number | null) => void;
  onBack: () => void;
}

export default function CostStep({ value, onNext, onBack }: CostStepProps) {
  const [input, setInput] = useState(value !== null ? String(value) : "");

  function handleNext() {
    const parsed = parseFloat(input.replace(/[^0-9.]/g, ""));
    onNext(isNaN(parsed) ? null : parsed);
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="text-center mb-2">
        <h2 className="text-2xl font-bold text-brand-text-primary font-heading">
          What do you currently pay per month?
        </h2>
        <p className="text-brand-text-secondary mt-1 text-sm">
          Include insurance copay or out-of-pocket cost.
        </p>
      </div>

      <div className="relative">
        <span className="absolute left-5 top-1/2 -translate-y-1/2 text-2xl text-brand-text-secondary font-semibold">
          $
        </span>
        <input
          type="number"
          min={0}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="0"
          style={{ fontSize: "24px" }}
          className="w-full rounded-2xl border border-brand-violet/20 pl-10 pr-5 py-4 text-2xl font-semibold text-brand-text-primary placeholder:text-brand-text-secondary/40 focus:outline-none focus:ring-2 focus:ring-brand-violet/40 bg-white"
        />
      </div>

      <div className="flex flex-col gap-2 mt-2">
        <button
          onClick={handleNext}
          disabled={!input}
          className="w-full rounded-full bg-brand-gradient text-white font-semibold px-6 py-3 text-base shadow-lg hover:shadow-xl hover:brightness-110 transition-all tap-target disabled:opacity-50"
        >
          Next
        </button>
        <button
          onClick={() => onNext(null)}
          className="w-full rounded-full border border-brand-violet/20 text-brand-text-secondary font-medium px-6 py-3 text-sm hover:border-brand-violet/40 hover:text-brand-violet transition-all"
        >
          I don&apos;t know — skip
        </button>
      </div>

      <button
        onClick={onBack}
        className="mt-1 text-sm text-brand-text-secondary hover:text-brand-violet transition-colors self-start"
      >
        &larr; Back
      </button>
    </div>
  );
}
