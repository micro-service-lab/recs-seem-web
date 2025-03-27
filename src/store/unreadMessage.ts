import { atom } from "recoil";

export const unreadMessageCountState = atom<number>({
  key: "unreadMessageCount",
  default: 0,
});

export type UnreadMessageCountOnChatRoom = {
  [chatRoomId: string]: number;
};

export const unreadMessageCountOnChatRoomState = atom<UnreadMessageCountOnChatRoom>({
  key: "unreadMessageCountOnChatRoom",
  default: {},
});
