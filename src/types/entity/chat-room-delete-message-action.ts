import { SimpleMember } from "./member";

export interface ChatRoomDeleteMessageAction {
  chatRoomDeleteMessageActionID: string;
  chatRoomActionID: string;
  deletedBy: string | null;
}

export interface ChatRoomDeleteMessageActionWithDeletedBy {
  chatRoomDeleteMessageActionID: string;
  chatRoomActionID: string;
  deletedBy: SimpleMember | null;
}
