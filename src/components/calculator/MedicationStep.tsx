interface MedicationStepProps {
  value: string;
  onNext: (value: string) => void;
}

const MEDICATIONS = [
  { label: "Wegovy", price: 1349 },
  { label: "Ozempic", price: 935 },
  { label: "Mounjaro", price: 1023 },
  { label: "Zepbound", price: 1059 },
  { label: "I'm not currently taking anything", price: null },
];

export default function MedicationStep({ value, onNext }: MedicationStepProps) {
  return (
    <div className="flex flex-col gap-4">
      <div className="text-center mb-2">
        <h2 className="text-2xl font-bold text-brand-text-primary font-heading">
          Which medication are you taking?
        </h2>
        <p className="text-brand-text-secondary mt-1 text-sm">
          We&apos;ll find you the best compounded alternative price.
        </p>
      </div>
      <div className="flex flex-col gap-3">
        {MEDICATIONS.map(({ label, price }) => (
          <button
            key={label}
            onClick={() => onNext(label)}
            className={`w-full rounded-2xl border px-5 py-4 text-left transition-all hover:border-brand-violet/50 hover:shadow-md flex items-center justify-between ${
              value === label
                ? "border-brand-violet bg-brand-bg-purple"
                : "border-brand-violet/10 bg-white"
            }`}
          >
            <span className="font-semibold text-brand-text-primary">{label}</span>
            {price !== null && (
              <span className="text-sm text-brand-text-secondary">${price.toLocaleString()}/mo</span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
