export const GradeKeys = {
  BACHELOR1: "bachelor1",
  BACHELOR2: "bachelor2",
  BACHELOR3: "bachelor3",
  BACHELOR4: "bachelor4",
  MASTER1: "master1",
  MASTER2: "master2",
  DOCTOR: "doctor",
  PROFESSOR: "professor",
} as const;

export type GradeKey = (typeof GradeKeys)[keyof typeof GradeKeys];
