import { useState } from "react";
import { Play } from "lucide-react";

// Optional player name input shown before the game starts.
export default function PlayerName({ initialName, onStart }: { initialName: string; onStart: (name: string) => void }) {
  const [name, setName] = useState(initialName);
  const [error, setError] = useState("");

  function handleStart() {
    const cleanName = name.trim(); // remove unnecessary spaces
    if (cleanName.length === 0) {
      setError("Please enter your name to start.");
      return;
    }
    setError("");
    onStart(cleanName);
  }

  return (
    <div className="w-full">
      <label htmlFor="player-name" className="text-sm font-semibold">
        Enter your name
      </label>
      <input
        id="player-name"
        value={name}
        maxLength={20}
        placeholder="e.g. Aarav"
        onChange={(e) => setName(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleStart()}
        className="mt-1 w-full rounded-full border-2 border-input bg-card px-4 py-3 outline-none focus:border-primary"
      />
      {error && <p className="mt-1 text-sm font-semibold text-destructive">{error}</p>}
      <button
        onClick={handleStart}
        className="mt-3 flex w-full items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-lg font-bold text-primary-foreground shadow-festive transition-transform hover:scale-105"
      >
        <Play className="size-5" /> Start Game
      </button>
    </div>
  );
}
