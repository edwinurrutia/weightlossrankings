interface DoseStepProps {
  medication: string;
  value: string;
  onNext: (value: string) => void;
  onBack: () => void;
}

const SEMAGLUTIDE_DOSES = ["0.25mg", "0.5mg", "1mg", "1.7mg", "2.4mg"];
const TIRZEPATIDE_DOSES = ["2.5mg", "5mg", "7.5mg", "10mg", "12.5mg", "15mg"];

const TIRZEPATIDE_MEDS = ["Mounjaro", "Zepbound"];

function getDoses(medication: string): string[] {
  if (TIRZEPATIDE_MEDS.includes(medication)) return TIRZEPATIDE_DOSES;
  return SEMAGLUTIDE_DOSES;
}

export default function DoseStep({ medication, value, onNext, onBack }: DoseStepProps) {
  const doses = getDoses(medication);

  return (
    <div className="flex flex-col gap-4">
      <div className="text-center mb-2">
        <h2 className="text-2xl font-bold text-brand-text-primary font-heading">
          What dose are you on?
        </h2>
        <p className="text-brand-text-secondary mt-1 text-sm">
          Select your current weekly injection dose.
        </p>
      </div>
      <div className="flex flex-wrap gap-3 justify-center">
        {doses.map((dose) => (
          <button
            key={dose}
            onClick={() => onNext(dose)}
            className={`rounded-full border px-6 py-3 font-semibold text-sm transition-all hover:border-brand-violet/50 hover:shadow-md ${
              value === dose
                ? "border-brand-violet bg-brand-gradient text-white shadow-md"
                : "border-brand-violet/20 bg-white text-brand-text-primary"
            }`}
          >
            {dose}
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
