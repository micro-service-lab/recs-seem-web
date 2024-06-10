import { ChatRoomActionPractical } from "@/types/entity/chat-room-action";
import { PracticalChatRoomOnMember } from "@/types/entity/chat-room-belonging";
import { ChatRoomDeleteMessageActionWithDeletedBy } from "@/types/entity/chat-room-delete-message-action";
import { atom } from "recoil";

export const openChatRoomState = atom<PracticalChatRoomOnMember|null>({
  key: "openChatRoom",
  default: null,
});

// except delete message
export const openChatRoomAdditionalActionState = atom<ChatRoomActionPractical[]>({
  key: "openChatRoomAdditionalAction",
  default: [],
});

export type MessageNumberMap = {
  [messageId: string]: number;
};

export const openChatRoomReadReceiptState = atom<MessageNumberMap>({
  key: "openChatRoomReadReceipt",
  default: {},
});

type MessageOverrideMap = {
  [messageId: string]: {
    content: string;
  };
};

export const openChatRoomMessageOverrideState = atom<MessageOverrideMap>({
  key: "openChatRoomMessageOverride",
  default: {},
});

type MessageDeleteMap = {
  [chatRoomActionId: string]: ChatRoomDeleteMessageActionWithDeletedBy;
};

export const openChatRoomMessageDeleteState = atom<MessageDeleteMap>({
  key: "openChatRoomMessageDelete",
  default: {},
});

export const mountChatRoomState = atom<boolean>({
  key: "mountChatRoom",
  default: false,
});