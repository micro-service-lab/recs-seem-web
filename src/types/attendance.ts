export const AttendanceTypeKeys = {
  EARLY_LEAVE: "early_leave",
  LATE_ARRIVAL: "late_arrival",
  ABSENCE: "absence",
} as const;

export type AttendanceTypeKey = (typeof AttendanceTypeKeys)[keyof typeof AttendanceTypeKeys];

