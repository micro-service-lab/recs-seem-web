export const ChatRoomActionTypeKeys = {
  CREATE: "create",
  UPDATE_NAME: "update_name",
  ADD_MEMBER: "add_member",
  REMOVE_MEMBER: "remove_member",
  WITHDRAW: "withdraw",
  MESSAGE: "message",
  DELETE_MESSAGE: "delete_message",
} as const;

export type ChatRoomActionKeyType = typeof ChatRoomActionTypeKeys[keyof typeof ChatRoomActionTypeKeys];
