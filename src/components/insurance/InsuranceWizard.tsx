"use client";

import { useState } from "react";
import type { Provider } from "@/lib/types";
import InsuranceStep from "./InsuranceStep";
import MedicationStep from "./MedicationStep";
import StateStep from "./StateStep";
import EmailGate from "./EmailGate";
import CoverageResults from "./CoverageResults";

export interface InsuranceState {
  insurance: string;
  medication: string;
  state: string;
  email: string;
}

interface InsuranceWizardProps {
  providers: Provider[];
}

const TOTAL_STEPS = 5;

export default function InsuranceWizard({ providers }: InsuranceWizardProps) {
  const [step, setStep] = useState(0);
  const [state, setState] = useState<InsuranceState>({
    insurance: "",
    medication: "",
    state: "",
    email: "",
  });

  function goNext() {
    setStep((s) => Math.min(s + 1, TOTAL_STEPS - 1));
  }

  function goBack() {
    setStep((s) => Math.max(s - 1, 0));
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Progress bar */}
      <div
        className="flex gap-1.5"
        role="progressbar"
        aria-valuenow={step}
        aria-valuemax={TOTAL_STEPS - 1}
      >
        {Array.from({ length: TOTAL_STEPS }).map((_, i) => (
          <div
            key={i}
            className={`h-2 flex-1 rounded-full transition-all duration-300 ${
              i <= step ? "bg-brand-gradient" : "bg-brand-violet/10"
            }`}
          />
        ))}
      </div>

      {/* Step content */}
      <div className="bg-white rounded-2xl border border-brand-violet/10 shadow-sm p-6">
        {step === 0 && (
          <InsuranceStep
            value={state.insurance}
            onNext={(insurance) => {
              setState((s) => ({ ...s, insurance }));
              goNext();
            }}
          />
        )}
        {step === 1 && (
          <MedicationStep
            value={state.medication}
            onNext={(medication) => {
              setState((s) => ({ ...s, medication }));
              goNext();
            }}
            onBack={goBack}
          />
        )}
        {step === 2 && (
          <StateStep
            value={state.state}
            onNext={(stateCode) => {
              setState((s) => ({ ...s, state: stateCode }));
              goNext();
            }}
            onBack={goBack}
          />
        )}
        {step === 3 && (
          <EmailGate
            onNext={(email) => {
              setState((s) => ({ ...s, email }));
              goNext();
            }}
            onBack={goBack}
          />
        )}
        {step === 4 && (
          <CoverageResults state={state} providers={providers} />
        )}
      </div>
    </div>
  );
}
