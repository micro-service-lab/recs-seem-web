import { ChatRoomActionPractical } from "@/types/entity/chat-room-action";
import { PracticalChatRoomOnMember } from "@/types/entity/chat-room-belonging";
import { atom } from "recoil";

export const openChatRoomState = atom<PracticalChatRoomOnMember|null>({
  key: "openChatRoom",
  default: null,
});

export type AdditionalAction = {
  [chatRoomId: string]: ChatRoomActionPractical[];
};

export const chatRoomAdditionalActionState = atom<AdditionalAction>({
  key: "chatRoomAdditionalAction",
  default: {},
});

// except delete message
export const openChatRoomAdditionalActionState = atom<ChatRoomActionPractical[]>({
  key: "openChatRoomAdditionalAction",
  default: [],
});

