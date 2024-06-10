import { SimpleMember } from "./member";

export interface ChatRoomDeleteMessageAction {
  chatRoomDeleteMessageActionId: string;
  chatRoomActionId: string;
  deletedBy: string | null;
}

export interface ChatRoomDeleteMessageActionWithDeletedBy {
  chatRoomDeleteMessageActionId: string;
  chatRoomActionId: string;
  deletedBy: SimpleMember | null;
}
