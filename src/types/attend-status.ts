export const AttendStatusKeys = {
  PRESENT: "present",
  ABSENT: "absent",
  TEMPORARILY_ABSENT: "temporarily_absent",
  GO_HOME: "go_home",
  NOT_ATTEND: "not_attend",
} as const;

export type AttendStatusKey = (typeof AttendStatusKeys)[keyof typeof AttendStatusKeys];
