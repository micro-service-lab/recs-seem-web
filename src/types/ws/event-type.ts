export const WsEventTypes = {
  CONNECTION_MEMBERS: "connecting_members",
  CONNECTED: "connected",
  DISCONNECTED: "disconnected",
  CHAT_ROOM_ADDED_ME: "chat_room:added:me",
  CHAT_ROOM_ADDED_MEMBER: "chat_room:added:member",
  CHAT_ROOM_REMOVED_ME: "chat_room:removed:me",
  CHAT_ROOM_REMOVED_MEMBER: "chat_room:removed:member",
  CHAT_ROOM_WITHDRAWN_MEMBER: "chat_room:withdrawn:member",
  CHAT_ROOM_UPDATED_NAME: "chat_room:updated:name",
  CHAT_ROOM_DELETED_MESSAGE: "chat_room:deleted:message",
  CHAT_ROOM_EDITED_MESSAGE: "chat_room:edited:message",
  CHAT_ROOM_SENT_MESSAGE: "chat_room:sent:message",
  CHAT_ROOM_READ_MESSAGE: "chat_room:read:message",
  CHAT_ROOM_DELETED: "chat_room:deleted",
} as const;

export type WsEventType = (typeof WsEventTypes)[keyof typeof WsEventTypes];
