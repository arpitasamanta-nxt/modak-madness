// Small helper for everything we keep in the browser's localStorage.
// Keeping it here means components never touch localStorage directly.

const HIGH_SCORE_KEY = "modak-catch-high-score";
const PLAYER_NAME_KEY = "modak-catch-player-name";
const SOUND_KEY = "modak-catch-sound";

function canUseStorage() {
  return typeof window !== "undefined";
}

export function getHighScore(): number {
  if (!canUseStorage()) return 0;
  const saved = window.localStorage.getItem(HIGH_SCORE_KEY);
  return saved ? Number(saved) || 0 : 0;
}

export function saveHighScore(score: number): number {
  if (!canUseStorage()) return score;
  const best = Math.max(score, getHighScore());
  window.localStorage.setItem(HIGH_SCORE_KEY, String(best));
  return best;
}

export function getPlayerName(): string {
  if (!canUseStorage()) return "";
  return window.localStorage.getItem(PLAYER_NAME_KEY) ?? "";
}

export function savePlayerName(name: string) {
  if (!canUseStorage()) return;
  window.localStorage.setItem(PLAYER_NAME_KEY, name);
}

export function getSoundEnabled(): boolean {
  if (!canUseStorage()) return true;
  return window.localStorage.getItem(SOUND_KEY) !== "off";
}

export function saveSoundEnabled(enabled: boolean) {
  if (!canUseStorage()) return;
  window.localStorage.setItem(SOUND_KEY, enabled ? "on" : "off");
}

// TODO: Send player name and score to backend
// export async function submitScore(name: string, score: number) {
//   await fetch("/api/scores", { method: "POST", body: JSON.stringify({ name, score }) });
// }
