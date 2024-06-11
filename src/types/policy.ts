export const PolicyCategoryKeys = {
  MEMBER: "member",
  ROLE: "role",
  ORGANIZATION: "organization",
  ATTENDANCE: "attendance",
  POSITION: "position",
} as const;

export type PolicyCategoryKey = (typeof PolicyCategoryKeys)[keyof typeof PolicyCategoryKeys];

export const PolicyKeys = {
  ORGANIZATION_CREATE: "organization.create",
  MEMBER_CREATE: "member.create",
  MEMBER_DELETE: "member.delete",
  ROLE_CREATE: "role.create",
  ROLE_DELETE: "role.delete",
  ROLE_UPDATE: "role.update",
  ROLE_ATTACH: "role.attach",
  ROLE_DETACH: "role.detach",
  ATTENDANCE_VIEW_LAB_IO_HISTORY: "attendance.view_lab_io_history",
  POSITION_VIEW_POSITION_HISTORY: "position.view_position_history",
} as const;

export type PolicyKey = (typeof PolicyKeys)[keyof typeof PolicyKeys];
