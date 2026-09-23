import { Heart, Pause, Trophy, Volume2, VolumeX } from "lucide-react";
import { START_LIVES } from "@/utils/gameUtils";

type Props = {
  score: number;
  lives: number;
  highScore: number;
  soundEnabled: boolean;
  onToggleSound: () => void;
  onPause: () => void;
};

// Top bar of the game screen: score, lives and high score.
export default function GameHeader({
  score,
  lives,
  highScore,
  soundEnabled,
  onToggleSound,
  onPause,
}: Props) {
  return (
    <div className="panel flex flex-wrap items-center justify-between gap-3 px-4 py-3">
      <div>
        <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Score</p>
        <p key={score} className="animate-pop-in text-2xl font-bold text-secondary">
          {score}
        </p>
      </div>

      <div className="flex items-center gap-1">
        {Array.from({ length: START_LIVES }).map((_, i) => (
          <Heart
            key={i}
            className={
              i < lives ? "size-6 fill-secondary text-secondary" : "size-6 text-muted-foreground/40"
            }
          />
        ))}
      </div>

      <div className="flex items-center gap-1 text-gold-foreground">
        <Trophy className="size-5 text-gold" />
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            Best
          </p>
          <p className="text-lg font-bold">{highScore}</p>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={onToggleSound}
          aria-label={soundEnabled ? "Turn sound off" : "Turn sound on"}
          className="rounded-full border-2 border-primary/40 p-2 text-primary transition-transform hover:scale-110"
        >
          {soundEnabled ? <Volume2 className="size-5" /> : <VolumeX className="size-5" />}
        </button>
        <button
          onClick={onPause}
          className="flex items-center gap-1 rounded-full bg-secondary px-4 py-2 text-sm font-bold text-secondary-foreground transition-transform hover:scale-105"
        >
          <Pause className="size-4" /> Pause
        </button>
      </div>
    </div>
  );
}
