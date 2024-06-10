import { ChatRoomActionWithActionType } from "@/types/entity/chat-room-action";
import { ChatRoomDeleteMessageActionWithDeletedBy } from "@/types/entity/chat-room-delete-message-action";
import { MessageCard } from "@/types/entity/message";
import { atom } from "recoil";

export const latestActionOnChatRoomState = atom<{
  data: {
    chatRoomId: string;
    latestMessage: MessageCard | null;
    latestAction: ChatRoomActionWithActionType;
  }[];
  dispatch: boolean;
}>({
  key: "latestActionOnChatRoom",
  default: {
    data: [],
    dispatch: false,
  },
});

export const EditMessageOnChatRoomState = atom<{
  data: {
    chatRoomId: string;
    messageId: string;
    content: string;
  }[];
  dispatch: boolean;
}>({
  key: "EditMessageOnChatRoom",
  default: {
    data: [],
    dispatch: false,
  },
});

export const DeleteMessageOnChatRoomState = atom<{
  data: {
    chatRoomId: string;
    action: ChatRoomDeleteMessageActionWithDeletedBy;
    actionTypeId: string;
  }[];
  dispatch: boolean;
}>({
  key: "DeleteMessageOnChatRoom",
  default: {
    data: [],
    dispatch: false,
  },
});
