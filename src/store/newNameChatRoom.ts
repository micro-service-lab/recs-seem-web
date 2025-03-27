import { atom } from "recoil";

export type ChatRoomMap = {
  [chatRoomId: string]: string;
};

export const newNameChatRoomState = atom<ChatRoomMap>({
  key: "newNameChatRoom",
  default: {},
});
