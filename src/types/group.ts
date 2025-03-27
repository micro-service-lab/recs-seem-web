export const GroupKeys = {
  WEB: "web",
  GRID: "grid",
  NETWORK: "network",
  PROFESSOR: "professor",
} as const;

export type GroupKey = (typeof GroupKeys)[keyof typeof GroupKeys];
