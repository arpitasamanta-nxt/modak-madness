// TODO: Replace mock leaderboard data with backend API (GET /api/leaderboard)

export type LeaderboardEntry = {
  rank: number;
  player: string;
  score: number;
};

export const mockLeaderboard: LeaderboardEntry[] = [
  { rank: 1, player: "Aarav", score: 450 },
  { rank: 2, player: "Ananya", score: 390 },
  { rank: 3, player: "Rahul", score: 320 },
  { rank: 4, player: "Priya", score: 280 },
  { rank: 5, player: "Arjun", score: 250 },
];
