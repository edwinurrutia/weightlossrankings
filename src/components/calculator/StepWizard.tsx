"use client";

import { useState } from "react";
import type { Provider } from "@/lib/types";
import MedicationStep from "./MedicationStep";
import DoseStep from "./DoseStep";
import CostStep from "./CostStep";
import EmailGate from "./EmailGate";
import SavingsResults from "./SavingsResults";

export interface CalcState {
  medication: string;
  dose: string;
  currentCost: number | null;
  email: string;
}

interface StepWizardProps {
  providers: Provider[];
}

const TOTAL_STEPS = 5;

export default function StepWizard({ providers }: StepWizardProps) {
  const [step, setStep] = useState(0);
  const [state, setState] = useState<CalcState>({
    medication: "",
    dose: "",
    currentCost: null,
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
      <div className="flex gap-1.5" role="progressbar" aria-valuenow={step} aria-valuemax={TOTAL_STEPS - 1}>
        {Array.from({ length: TOTAL_STEPS }).map((_, i) => (
          <div
            key={i}
            className={`h-2 flex-1 rounded-full transition-all duration-300 ${
              i <= step
                ? "bg-brand-gradient"
                : "bg-brand-violet/10"
            }`}
          />
        ))}
      </div>

      {/* Step content */}
      <div className="bg-white rounded-2xl border border-brand-violet/10 shadow-sm p-6">
        {step === 0 && (
          <MedicationStep
            value={state.medication}
            onNext={(medication) => {
              setState((s) => ({ ...s, medication }));
              goNext();
            }}
          />
        )}
        {step === 1 && (
          <DoseStep
            medication={state.medication}
            value={state.dose}
            onNext={(dose) => {
              setState((s) => ({ ...s, dose }));
              goNext();
            }}
            onBack={goBack}
          />
        )}
        {step === 2 && (
          <CostStep
            value={state.currentCost}
            onNext={(currentCost) => {
              setState((s) => ({ ...s, currentCost }));
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
          <SavingsResults state={state} providers={providers} />
        )}
      </div>
    </div>
  );
}
