import { ChatRoomActionWithActionType } from "@/types/entity/chat-room-action";
import { MessageCard } from "@/types/entity/message";
import { atom } from "recoil";

export type ChatRoomLatestAction = {
    [chatRoomId: string]: {
        latestMessage: MessageCard | null;
        latestAction: ChatRoomActionWithActionType;
    }
  };
  
  export const latestActionOnChatRoomState = atom<ChatRoomLatestAction>({
    key: "latestActionOnChatRoom",
    default: {},
  });