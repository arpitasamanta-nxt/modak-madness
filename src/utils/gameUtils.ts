// Core game rules. All values are in percentages of the play area,
// so the game works on any screen size.

export const BASKET_WIDTH = 18; // % of play area width
export const BASKET_STEP = 6; // how far the basket moves per key press / tick
export const BASKET_TOP = 82; // basket's vertical position in %
export const MODAK_SIZE = 8; // % of width
export const NORMAL_POINTS = 10;
export const GOLDEN_POINTS = 50;
export const START_LIVES = 3;

export type Modak = {
  id: number;
  x: number; // horizontal position in %
  y: number; // vertical position in %
  isGolden: boolean;
};

// Generate a random horizontal position for the modak
export function randomModakX(): number {
  return Math.random() * (100 - MODAK_SIZE);
}

// 1 in 10 modaks is a special golden modak
export function rollGolden(): boolean {
  return Math.random() < 0.1;
}

// The game becomes faster as the score increases (but never impossible)
export function getFallSpeed(score: number): number {
  if (score >= 50) return 1.5;
  if (score >= 25) return 1.15;
  if (score >= 10) return 0.9;
  return 0.7;
}

// How often a new modak appears (milliseconds)
export function getSpawnDelay(score: number): number {
  if (score >= 50) return 600;
  if (score >= 25) return 750;
  if (score >= 10) return 900;
  return 1100;
}

// Check whether the falling modak touches the basket
export function checkCollision(modak: Modak, basketX: number): boolean {
  const touchesVertically = modak.y + MODAK_SIZE >= BASKET_TOP && modak.y <= BASKET_TOP + 10;
  const touchesHorizontally =
    modak.x + MODAK_SIZE >= basketX && modak.x <= basketX + BASKET_WIDTH;
  return touchesVertically && touchesHorizontally;
}

// Keep the basket inside the game boundaries
export function clampBasket(x: number): number {
  return Math.min(Math.max(x, 0), 100 - BASKET_WIDTH);
}

// Friendly message shown on the Game Over screen
export function getScoreMessage(score: number): string {
  if (score >= 300) return "Amazing! You are a Modak Master! 🥳";
  if (score >= 150) return "Wonderful catching! Ganpati Bappa Morya! 🎉";
  if (score >= 50) return "Great job! 🙏";
  return "Nice start! Bappa loves your effort. 😊";
}
