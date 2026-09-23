import { useEffect, useState } from "react";

// Animated 3 · 2 · 1 · GO! countdown before gameplay starts.
export default function Countdown({ onDone }: { onDone: () => void }) {
  const [step, setStep] = useState(3);

  useEffect(() => {
    if (step === 0) {
      const finish = setTimeout(onDone, 600);
      return () => clearTimeout(finish);
    }
    const timer = setTimeout(() => setStep((s) => s - 1), 800);
    return () => clearTimeout(timer);
  }, [step, onDone]);

  return (
    <div className="absolute inset-0 z-20 flex items-center justify-center bg-background/70 backdrop-blur-sm">
      <p
        key={step}
        className="animate-pop-in text-festive-gradient text-7xl font-extrabold sm:text-9xl"
      >
        {step === 0 ? "GO!" : step}
      </p>
    </div>
  );
}
