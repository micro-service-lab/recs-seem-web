export const EventTypeKeys = {
  MEETING: "meeting",
  JOURNAL_CLUB: "journal_club",
  HOLIDAY: "holiday",
  OTHER: "other",
} as const;

export type EventTypeKey = (typeof EventTypeKeys)[keyof typeof EventTypeKeys];

