interface InsuranceStepProps {
  value: string;
  onNext: (value: string) => void;
}

const INSURANCE_OPTIONS = [
  "Blue Cross Blue Shield",
  "United Healthcare",
  "Aetna",
  "Cigna",
  "Kaiser Permanente",
  "Humana",
  "Anthem",
  "Medicare",
  "Medicaid",
  "Other / No Insurance",
];

export default function InsuranceStep({ value, onNext }: InsuranceStepProps) {
  return (
    <div className="flex flex-col gap-4">
      <div className="text-center mb-2">
        <h2 className="text-2xl font-bold text-brand-text-primary font-heading">
          What insurance do you have?
        </h2>
        <p className="text-brand-text-secondary mt-1 text-sm">
          Select your current insurance provider.
        </p>
      </div>
      <div className="flex flex-col gap-3">
        {INSURANCE_OPTIONS.map((option) => (
          <button
            key={option}
            onClick={() => onNext(option)}
            className={`w-full rounded-2xl border px-5 py-4 text-left transition-all hover:border-brand-violet/50 hover:shadow-md ${
              value === option
                ? "border-brand-violet bg-brand-bg-purple"
                : "border-brand-violet/10 bg-white"
            }`}
          >
            <span className="font-semibold text-brand-text-primary">{option}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
