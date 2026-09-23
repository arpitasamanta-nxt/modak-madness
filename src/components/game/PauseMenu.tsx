import { Home, Play, RotateCcw } from "lucide-react";

type Props = {
  onResume: () => void;
  onRestart: () => void;
  onHome: () => void;
};

// Overlay shown while the game is paused.
export default function PauseMenu({ onResume, onRestart, onHome }: Props) {
  return (
    <div className="absolute inset-0 z-20 flex items-center justify-center bg-background/75 p-4 backdrop-blur-sm">
      <div className="panel animate-pop-in w-full max-w-xs p-6 text-center">
        <h2 className="text-2xl font-bold text-secondary">Paused</h2>
        <p className="mt-1 text-sm text-muted-foreground">Take a breath, then keep catching!</p>
        <div className="mt-5 grid gap-2">
          <button
            onClick={onResume}
            className="flex items-center justify-center gap-2 rounded-full bg-primary px-5 py-3 font-bold text-primary-foreground transition-transform hover:scale-105"
          >
            <Play className="size-4" /> Resume
          </button>
          <button
            onClick={onRestart}
            className="flex items-center justify-center gap-2 rounded-full bg-accent px-5 py-3 font-bold text-accent-foreground transition-transform hover:scale-105"
          >
            <RotateCcw className="size-4" /> Restart
          </button>
          <button
            onClick={onHome}
            className="flex items-center justify-center gap-2 rounded-full border-2 border-primary/40 px-5 py-3 font-bold text-primary transition-transform hover:scale-105"
          >
            <Home className="size-4" /> Home
          </button>
        </div>
      </div>
    </div>
  );
}
