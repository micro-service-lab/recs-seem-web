export const RecordTypeKeys = {
  MEETING: "meeting",
} as const;

export type RecordTypeKey = (typeof RecordTypeKeys)[keyof typeof RecordTypeKeys];
