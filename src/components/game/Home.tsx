import { BookOpen, Trophy, Volume2, VolumeX } from "lucide-react";
import heroImage from "@/assets/ganesh-hero.jpg";
import PlayerName from "./PlayerName";
import { ModakShape } from "./FallingModak";

type Props = {
  playerName: string;
  highScore: number;
  soundEnabled: boolean;
  onToggleSound: () => void;
  onStart: (name: string) => void;
  onHowToPlay: () => void;
  onLeaderboard: () => void;
};

export default function Home({
  playerName,
  highScore,
  soundEnabled,
  onToggleSound,
  onStart,
  onHowToPlay,
  onLeaderboard,
}: Props) {
  return (
    <div className="panel w-full max-w-3xl overflow-hidden">
      <div className="grid gap-6 p-6 sm:grid-cols-2 sm:p-8">
        <div className="order-2 sm:order-1">
          <h1 className="text-festive-gradient text-4xl font-extrabold leading-tight sm:text-5xl">
            Ganpati Modak Catch
          </h1>
          <p className="mt-3 text-sm text-muted-foreground sm:text-base">
            Catch the falling modaks and score as many points as you can!
          </p>

          <div className="mt-5">
            <PlayerName initialName={playerName} onStart={onStart} />
          </div>

          <div className="mt-3 grid gap-2 sm:grid-cols-2">
            <button
              onClick={onHowToPlay}
              className="flex items-center justify-center gap-2 rounded-full bg-accent px-4 py-3 font-bold text-accent-foreground transition-transform hover:scale-105"
            >
              <BookOpen className="size-4" /> How to Play
            </button>
            <button
              onClick={onLeaderboard}
              className="flex items-center justify-center gap-2 rounded-full border-2 border-primary/40 px-4 py-3 font-bold text-primary transition-transform hover:scale-105"
            >
              <Trophy className="size-4" /> Leaderboard
            </button>
          </div>

          <div className="mt-4 flex items-center justify-between rounded-xl bg-muted px-4 py-3 text-sm">
            <span>
              High Score: <strong className="text-secondary">{highScore}</strong>
            </span>
            <button
              onClick={onToggleSound}
              className="flex items-center gap-1 font-semibold text-primary"
            >
              {soundEnabled ? <Volume2 className="size-4" /> : <VolumeX className="size-4" />}
              Sound {soundEnabled ? "ON" : "OFF"}
            </button>
          </div>
        </div>

        <div className="order-1 sm:order-2">
          <div className="relative rounded-2xl festive-bg p-3">
            <img
              src={heroImage}
              alt="Cheerful Ganesha with a plate of modaks, diyas and marigold flowers"
              width={1024}
              height={1024}
              className="w-full rounded-xl"
            />
            <div className="absolute -left-2 -top-2 w-10 animate-sway">
              <ModakShape isGolden />
            </div>
            <div className="absolute -bottom-3 -right-2 w-9 animate-sway">
              <ModakShape />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
