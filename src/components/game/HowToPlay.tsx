import { ArrowLeft, ArrowRight, X } from "lucide-react";

// Modal that explains the rules and the controls.
export default function HowToPlay({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-30 flex items-center justify-center bg-foreground/50 p-4 backdrop-blur-sm">
      <div className="panel animate-pop-in max-h-[90vh] w-full max-w-md overflow-y-auto p-6">
        <div className="flex items-start justify-between gap-4">
          <h2 className="text-2xl font-bold text-secondary">How to Play</h2>
          <button
            onClick={onClose}
            aria-label="Close"
            className="rounded-full p-1 text-muted-foreground hover:text-secondary"
          >
            <X className="size-5" />
          </button>
        </div>

        <ul className="mt-4 space-y-2 text-sm leading-relaxed">
          <li>• Move the basket left and right.</li>
          <li>• Catch the falling modaks.</li>
          <li>• Each modak gives points (golden modaks give +50!).</li>
          <li>• Missing a modak reduces a life.</li>
          <li>• The game becomes faster as the score increases.</li>
          <li>• Try to get the highest score!</li>
        </ul>

        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          <div className="rounded-xl bg-muted p-3">
            <p className="text-xs font-bold uppercase tracking-wide text-muted-foreground">
              Desktop
            </p>
            <p className="mt-2 flex items-center gap-2 text-sm">
              <ArrowLeft className="size-4" /> Left Arrow / A
            </p>
            <p className="mt-1 flex items-center gap-2 text-sm">
              <ArrowRight className="size-4" /> Right Arrow / D
            </p>
          </div>
          <div className="rounded-xl bg-muted p-3">
            <p className="text-xs font-bold uppercase tracking-wide text-muted-foreground">
              Mobile
            </p>
            <p className="mt-2 text-sm">Use the big ◀ and ▶ buttons below the game area.</p>
          </div>
        </div>

        <button
          onClick={onClose}
          className="mt-6 w-full rounded-full bg-primary px-5 py-3 font-bold text-primary-foreground transition-transform hover:scale-[1.02]"
        >
          Got it
        </button>
      </div>
    </div>
  );
}
