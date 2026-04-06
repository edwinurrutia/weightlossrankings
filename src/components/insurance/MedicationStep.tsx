interface MedicationStepProps {
  value: string;
  onNext: (value: string) => void;
  onBack: () => void;
}

const MEDICATIONS = [
  "Wegovy (Semaglutide)",
  "Ozempic (Semaglutide)",
  "Mounjaro (Tirzepatide)",
  "Zepbound (Tirzepatide)",
  "Not sure yet",
];

export default function MedicationStep({ value, onNext, onBack }: MedicationStepProps) {
  return (
    <div className="flex flex-col gap-4">
      <div className="text-center mb-2">
        <h2 className="text-2xl font-bold text-brand-text-primary font-heading">
          Which medication are you interested in?
        </h2>
        <p className="text-brand-text-secondary mt-1 text-sm">
          We&apos;ll check your coverage for this specific medication.
        </p>
      </div>
      <div className="flex flex-col gap-3">
        {MEDICATIONS.map((med) => (
          <button
            key={med}
            onClick={() => onNext(med)}
            className={`w-full rounded-2xl border px-5 py-4 text-left transition-all hover:border-brand-violet/50 hover:shadow-md ${
              value === med
                ? "border-brand-violet bg-brand-bg-purple"
                : "border-brand-violet/10 bg-white"
            }`}
          >
            <span className="font-semibold text-brand-text-primary">{med}</span>
          </button>
        ))}
      </div>
      <button
        onClick={onBack}
        className="mt-2 text-sm text-brand-text-secondary hover:text-brand-violet transition-colors self-start"
      >
        &larr; Back
      </button>
    </div>
  );
}
