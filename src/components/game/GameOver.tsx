import { Home, RotateCcw, Trophy } from "lucide-react";
import { getScoreMessage } from "@/utils/gameUtils";

type Props = {
  score: number;
  highScore: number;
  playerName: string;
  onPlayAgain: () => void;
  onHome: () => void;
  onLeaderboard: () => void;
};

export default function GameOver({
  score,
  highScore,
  playerName,
  onPlayAgain,
  onHome,
  onLeaderboard,
}: Props) {
  // TODO: Send player name and score to backend (POST /api/scores)
  return (
    <div className="panel animate-pop-in w-full max-w-sm p-6 text-center">
      <h2 className="text-3xl font-bold text-festive-gradient">Game Over 🎉</h2>
      {playerName && <p className="mt-1 text-sm text-muted-foreground">Well played, {playerName}!</p>}

      <div className="mt-5 grid grid-cols-2 gap-3">
        <div className="rounded-xl bg-muted p-4">
          <p className="text-xs font-bold uppercase tracking-wide text-muted-foreground">
            Your Score
          </p>
          <p className="text-3xl font-extrabold text-secondary">{score}</p>
        </div>
        <div className="rounded-xl bg-accent/60 p-4">
          <p className="text-xs font-bold uppercase tracking-wide text-muted-foreground">
            High Score
          </p>
          <p className="text-3xl font-extrabold text-gold-foreground">{highScore}</p>
        </div>
      </div>

      <p className="mt-4 text-base font-semibold">{getScoreMessage(score)}</p>

      <div className="mt-6 grid gap-2">
        <button
          onClick={onPlayAgain}
          className="flex items-center justify-center gap-2 rounded-full bg-primary px-5 py-3 font-bold text-primary-foreground transition-transform hover:scale-105"
        >
          <RotateCcw className="size-4" /> Play Again
        </button>
        <button
          onClick={onHome}
          className="flex items-center justify-center gap-2 rounded-full bg-accent px-5 py-3 font-bold text-accent-foreground transition-transform hover:scale-105"
        >
          <Home className="size-4" /> Home
        </button>
        <button
          onClick={onLeaderboard}
          className="flex items-center justify-center gap-2 rounded-full border-2 border-primary/40 px-5 py-3 font-bold text-primary transition-transform hover:scale-105"
        >
          <Trophy className="size-4" /> Leaderboard
        </button>
      </div>
    </div>
  );
}
