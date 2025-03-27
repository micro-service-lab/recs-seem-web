import { ChatRoomActionKeyType } from "../chat-room-action";

export interface ChatRoomActionType {
    chatRoomActionTypeId: string;
    name: string;
    key: ChatRoomActionKeyType;
}