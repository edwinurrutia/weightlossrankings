"use client";

import { useState } from "react";
import { US_STATES } from "@/lib/states";

interface StateStepProps {
  value: string;
  onNext: (value: string) => void;
  onBack: () => void;
}

export default function StateStep({ value, onNext, onBack }: StateStepProps) {
  const [selected, setSelected] = useState(value);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (selected) onNext(selected);
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="text-center mb-2">
        <h2 className="text-2xl font-bold text-brand-text-primary font-heading">
          What state are you in?
        </h2>
        <p className="text-brand-text-secondary mt-1 text-sm">
          Coverage rules vary by state — this helps us give you accurate results.
        </p>
      </div>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <select
          value={selected}
          onChange={(e) => setSelected(e.target.value)}
          required
          className="w-full rounded-2xl border border-brand-violet/20 bg-white px-5 py-4 text-brand-text-primary focus:outline-none focus:ring-2 focus:ring-brand-violet/40 appearance-none"
          style={{ fontSize: "16px" }}
        >
          <option value="" disabled>
            Select your state…
          </option>
          {US_STATES.map((state) => (
            <option key={state.code} value={state.code}>
              {state.name}
            </option>
          ))}
        </select>
        <button
          type="submit"
          disabled={!selected}
          className="w-full inline-flex items-center justify-center rounded-full bg-brand-gradient text-white font-semibold px-6 py-3 text-base shadow-lg hover:shadow-xl hover:brightness-110 transition-all tap-target disabled:opacity-60"
        >
          Continue
        </button>
      </form>
      <button
        onClick={onBack}
        className="text-sm text-brand-text-secondary hover:text-brand-violet transition-colors self-start"
      >
        &larr; Back
      </button>
    </div>
  );
}
