export const PermissionCategoryKeys = {
  ORGANIZATION: "organization",
  MEMBER: "member",
  WORK_POSITION: "work_position",
  EVENT: "event",
  CHAT_ROOM: "chat_room",
  RECORD: "record",
} as const;

export type PermissionCategoryKey = (typeof PermissionCategoryKeys)[keyof typeof PermissionCategoryKeys];

export const PermissionKeys = {
  ORGANIZATION_DELETE: "organization.delete",
  ORGANIZATION_SETTING: "organization.setting",
  MEMBER_INVITE: "member.invite",
  MEMBER_DELETE: "member.delete",
  WORK_POSITION_CREATE: "work_position.create",
  WORK_POSITION_DELETE: "work_position.delete",
  WORK_POSITION_UPDATE: "work_position.update",
  WORK_POSITION_ATTACH: "work_position.attach",
  WORK_POSITION_DETACH: "work_position.detach",
  EVENT_CREATE: "event.create",
  EVENT_DELETE: "event.delete",
  EVENT_UPDATE: "event.update",
  CHAT_ROOM_SETTING: "chat_room.setting",
  RECORD_CREATE: "record.create",
  RECORD_DELETE: "record.delete",
  RECORD_UPDATE: "record.update",
} as const;

export type PermissionKey = (typeof PermissionKeys)[keyof typeof PermissionKeys];
