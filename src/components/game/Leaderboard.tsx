import { ArrowLeft, Trophy } from "lucide-react";
import { mockLeaderboard } from "@/data/mockLeaderboard";

const medals = ["🥇", "🥈", "🥉"];

// TODO: Replace mock leaderboard data with backend API (GET /api/leaderboard)
export default function Leaderboard({
  onBack,
  highScore,
  playerName,
}: {
  onBack: () => void;
  highScore: number;
  playerName: string;
}) {
  return (
    <div className="panel w-full max-w-md p-6">
      <div className="flex items-center gap-2 text-secondary">
        <Trophy className="size-6 text-gold" />
        <h2 className="text-2xl font-bold">Leaderboard</h2>
      </div>
      <p className="mt-1 text-sm text-muted-foreground">Top modak catchers of the festival</p>

      <div className="mt-4 overflow-hidden rounded-xl border-2 border-accent">
        <table className="w-full text-sm">
          <thead className="bg-accent/60 text-left">
            <tr>
              <th className="px-3 py-2">Rank</th>
              <th className="px-3 py-2">Player</th>
              <th className="px-3 py-2 text-right">Score</th>
            </tr>
          </thead>
          <tbody>
            {mockLeaderboard.map((entry) => (
              <tr key={entry.rank} className="border-t border-accent/60">
                <td className="px-3 py-2 font-bold">{medals[entry.rank - 1] ?? entry.rank}</td>
                <td className="px-3 py-2">{entry.player}</td>
                <td className="px-3 py-2 text-right font-bold text-secondary">{entry.score}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-4 rounded-xl bg-muted px-4 py-3 text-sm">
        <span className="font-semibold">{playerName || "You"}</span> — best score{" "}
        <span className="font-bold text-secondary">{highScore}</span>
      </div>

      <button
        onClick={onBack}
        className="mt-5 flex w-full items-center justify-center gap-2 rounded-full bg-primary px-5 py-3 font-bold text-primary-foreground transition-transform hover:scale-[1.02]"
      >
        <ArrowLeft className="size-4" /> Back
      </button>
    </div>
  );
}
