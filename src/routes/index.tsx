import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import Home from "@/components/game/Home";
import Game from "@/components/game/Game";
import GameOver from "@/components/game/GameOver";
import HowToPlay from "@/components/game/HowToPlay";
import Leaderboard from "@/components/game/Leaderboard";
import {
  getHighScore,
  getPlayerName,
  getSoundEnabled,
  saveHighScore,
  savePlayerName,
  saveSoundEnabled,
} from "@/utils/storage";

const title = "Ganpati Modak Catch — Festive Modak Catching Game";
const description =
  "Catch falling modaks in a basket, grab golden modaks for bonus points, and beat your high score in this festive Ganesh Chaturthi browser game.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: App,
});

// All possible game states
type GameStatus = "home" | "playing" | "gameover" | "leaderboard";

function App() {
  const [status, setStatus] = useState<GameStatus>("home");
  const [playerName, setPlayerName] = useState("");
  const [highScore, setHighScore] = useState(0);
  const [lastScore, setLastScore] = useState(0);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [showHowToPlay, setShowHowToPlay] = useState(false);

  // Load saved values from localStorage after the page loads
  useEffect(() => {
    setHighScore(getHighScore());
    setPlayerName(getPlayerName());
    setSoundEnabled(getSoundEnabled());
  }, []);

  function toggleSound() {
    setSoundEnabled((enabled) => {
      saveSoundEnabled(!enabled);
      return !enabled;
    });
  }

  function startGame(name: string) {
    setPlayerName(name);
    savePlayerName(name);
    setStatus("playing");
  }

  function handleGameOver(score: number) {
    setLastScore(score);
    setHighScore(saveHighScore(score));
    setStatus("gameover");
    // TODO: Send player name and score to backend (POST /api/scores)
  }

  return (
    <main className="festive-bg flex min-h-screen flex-col items-center justify-center gap-4 p-3 sm:p-6">
      {status === "home" && (
        <Home
          playerName={playerName}
          highScore={highScore}
          soundEnabled={soundEnabled}
          onToggleSound={toggleSound}
          onStart={startGame}
          onHowToPlay={() => setShowHowToPlay(true)}
          onLeaderboard={() => setStatus("leaderboard")}
        />
      )}

      {status === "playing" && (
        <Game
          playerName={playerName}
          highScore={highScore}
          soundEnabled={soundEnabled}
          onToggleSound={toggleSound}
          onGameOver={handleGameOver}
          onHome={() => setStatus("home")}
        />
      )}

      {status === "gameover" && (
        <GameOver
          score={lastScore}
          highScore={highScore}
          playerName={playerName}
          onPlayAgain={() => setStatus("playing")}
          onHome={() => setStatus("home")}
          onLeaderboard={() => setStatus("leaderboard")}
        />
      )}

      {status === "leaderboard" && (
        <Leaderboard
          highScore={highScore}
          playerName={playerName}
          onBack={() => setStatus("home")}
        />
      )}

      {showHowToPlay && <HowToPlay onClose={() => setShowHowToPlay(false)} />}
    </main>
  );
}
