import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Basket from "./Basket";
import FallingModak from "./FallingModak";
import GameHeader from "./GameHeader";
import Countdown from "./Countdown";
import PauseMenu from "./PauseMenu";
import {
  BASKET_STEP,
  BASKET_WIDTH,
  GOLDEN_POINTS,
  MODAK_SIZE,
  NORMAL_POINTS,
  START_LIVES,
  checkCollision,
  clampBasket,
  getFallSpeed,
  getSpawnDelay,
  randomModakX,
  rollGolden,
  type Modak,
} from "@/utils/gameUtils";
import { playSound } from "@/utils/sound";

type CatchEffect = { id: number; x: number; text: string };

type Props = {
  playerName: string;
  highScore: number;
  soundEnabled: boolean;
  onToggleSound: () => void;
  onGameOver: (score: number) => void;
  onHome: () => void;
};

const TICK_MS = 40; // game loop speed

export default function Game({
  playerName,
  highScore,
  soundEnabled,
  onToggleSound,
  onGameOver,
  onHome,
}: Props) {
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(START_LIVES);
  const [basketX, setBasketX] = useState(50 - BASKET_WIDTH / 2);
  const [modaks, setModaks] = useState<Modak[]>([]);
  const [effects, setEffects] = useState<CatchEffect[]>([]);
  const [isCountingDown, setIsCountingDown] = useState(true);
  const [isPaused, setIsPaused] = useState(false);

  // Refs hold values the game loop needs without restarting the loop.
  const basketRef = useRef(basketX);
  const scoreRef = useRef(0);
  const directionRef = useRef(0); // -1 left, 1 right, 0 still
  const nextId = useRef(1);

  basketRef.current = basketX;
  scoreRef.current = score;

  const isRunning = !isCountingDown && !isPaused;

  // Keyboard controls (arrows + A/D)
  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      const key = e.key.toLowerCase();
      if (key === "arrowleft" || key === "a") directionRef.current = -1;
      if (key === "arrowright" || key === "d") directionRef.current = 1;
      if (key === "escape" || key === "p") setIsPaused((p) => !p);
    }
    function onKeyUp(e: KeyboardEvent) {
      const key = e.key.toLowerCase();
      if (["arrowleft", "a", "arrowright", "d"].includes(key)) directionRef.current = 0;
    }
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("keyup", onKeyUp);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("keyup", onKeyUp);
    };
  }, []);

  // Show a small floating "+10" / "+50 ✨" effect that disappears shortly after
  const addEffect = useCallback((x: number, text: string) => {
    const id = nextId.current++;
    setEffects((old) => [...old, { id, x, text }]);
    setTimeout(() => setEffects((old) => old.filter((effect) => effect.id !== id)), 900);
  }, []);

  // Spawn new modaks at random horizontal positions
  useEffect(() => {
    if (!isRunning) return;
    const timer = setInterval(
      () => {
        setModaks((old) => [
          ...old,
          { id: nextId.current++, x: randomModakX(), y: -MODAK_SIZE, isGolden: rollGolden() },
        ]);
      },
      getSpawnDelay(score),
    );
    return () => clearInterval(timer);
  }, [isRunning, score]);

  // The game loop: move the basket, move the modaks, check collisions
  useEffect(() => {
    if (!isRunning) return;
    const loop = setInterval(() => {
      if (directionRef.current !== 0) {
        setBasketX((x) => clampBasket(x + directionRef.current * BASKET_STEP));
      }

      const speed = getFallSpeed(scoreRef.current);
      let gained = 0;
      let missed = 0;

      setModaks((old) => {
        const next: Modak[] = [];
        for (const modak of old) {
          const moved = { ...modak, y: modak.y + speed };

          if (checkCollision(moved, basketRef.current)) {
            // Caught! Award points and show the floating effect.
            gained += moved.isGolden ? GOLDEN_POINTS : NORMAL_POINTS;
            addEffect(moved.x, moved.isGolden ? `+${GOLDEN_POINTS} ✨` : `+${NORMAL_POINTS}`);
            playSound(moved.isGolden ? "golden" : "catch", soundEnabled);
            continue;
          }

          if (moved.y > 100) {
            // Missed: golden modaks are a bonus, so only normal ones cost a life.
            if (!moved.isGolden) missed += 1;
            continue;
          }

          next.push(moved);
        }
        return next;
      });

      if (gained > 0) setScore((s) => s + gained);
      if (missed > 0) setLives((l) => l - missed);
    }, TICK_MS);

    return () => clearInterval(loop);
  }, [isRunning, soundEnabled, addEffect]);

  // End the game when lives run out
  useEffect(() => {
    if (lives <= 0) {
      playSound("gameover", soundEnabled);
      onGameOver(scoreRef.current);
    }
  }, [lives, onGameOver, soundEnabled]);

  function restart() {
    setScore(0);
    setLives(START_LIVES);
    setModaks([]);
    setEffects([]);
    setBasketX(50 - BASKET_WIDTH / 2);
    setIsPaused(false);
    setIsCountingDown(true);
  }

  function nudge(direction: number) {
    setBasketX((x) => clampBasket(x + direction * BASKET_STEP));
  }

  return (
    <div className="w-full max-w-2xl">
      <GameHeader
        score={score}
        lives={lives}
        highScore={Math.max(highScore, score)}
        soundEnabled={soundEnabled}
        onToggleSound={onToggleSound}
        onPause={() => setIsPaused(true)}
      />

      {/* Play area */}
      <div className="panel relative mt-3 h-[58vh] min-h-[320px] overflow-hidden festive-bg">
        {/* festive lights across the top */}
        <div className="pointer-events-none absolute inset-x-0 top-0 flex justify-around px-2">
          {Array.from({ length: 9 }).map((_, i) => (
            <span
              key={i}
              className="animate-twinkle mt-1 size-2 rounded-full bg-gold"
              style={{ animationDelay: `${i * 0.2}s` }}
            />
          ))}
        </div>

        {modaks.map((modak) => (
          <FallingModak key={modak.id} modak={modak} />
        ))}

        <Basket x={basketX} />

        {effects.map((effect) => (
          <span
            key={effect.id}
            className="animate-float-up pointer-events-none absolute text-lg font-extrabold text-secondary"
            style={{ left: `${effect.x + MODAK_SIZE / 2}%`, top: "72%" }}
          >
            {effect.text}
          </span>
        ))}

        {/* ground / rangoli strip */}
        <div className="absolute inset-x-0 bottom-0 h-3 bg-leaf/60" />

        {isCountingDown && <Countdown onDone={() => setIsCountingDown(false)} />}
        {isPaused && (
          <PauseMenu
            onResume={() => setIsPaused(false)}
            onRestart={restart}
            onHome={onHome}
          />
        )}
      </div>

      {/* Touch friendly controls */}
      <div className="mt-3 flex items-center justify-between gap-3">
        <button
          aria-label="Move left"
          onPointerDown={() => (directionRef.current = -1)}
          onPointerUp={() => (directionRef.current = 0)}
          onPointerLeave={() => (directionRef.current = 0)}
          onClick={() => nudge(-1)}
          className="flex h-16 flex-1 items-center justify-center rounded-2xl bg-secondary text-secondary-foreground shadow-festive transition-transform active:scale-95"
        >
          <ChevronLeft className="size-8" />
        </button>
        <p className="hidden shrink-0 text-center text-xs text-muted-foreground sm:block">
          {playerName ? `Go ${playerName}!` : "Use ← →"}
        </p>
        <button
          aria-label="Move right"
          onPointerDown={() => (directionRef.current = 1)}
          onPointerUp={() => (directionRef.current = 0)}
          onPointerLeave={() => (directionRef.current = 0)}
          onClick={() => nudge(1)}
          className="flex h-16 flex-1 items-center justify-center rounded-2xl bg-secondary text-secondary-foreground shadow-festive transition-transform active:scale-95"
        >
          <ChevronRight className="size-8" />
        </button>
      </div>
    </div>
  );
}
