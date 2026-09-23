// Optional sound support. Audio files can be dropped into /public/sounds later.
//
// TODO: Add catch sound      -> /public/sounds/catch.mp3
// TODO: Add game-over sound  -> /public/sounds/game-over.mp3
// TODO: Add background music -> /public/sounds/bgm.mp3

type SoundName = "catch" | "golden" | "gameover";

const sources: Record<SoundName, string> = {
  catch: "/sounds/catch.mp3",
  golden: "/sounds/golden.mp3",
  gameover: "/sounds/game-over.mp3",
};

// Plays a sound if the file exists and sound is switched on.
// Missing files fail silently, so the game works without audio assets.
export function playSound(name: SoundName, enabled: boolean) {
  if (!enabled || typeof window === "undefined") return;
  try {
    const audio = new Audio(sources[name]);
    audio.volume = 0.5;
    void audio.play().catch(() => {});
  } catch {
    // no audio available yet — ignore
  }
}
