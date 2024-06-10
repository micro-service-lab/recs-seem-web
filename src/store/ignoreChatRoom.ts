import { atom } from "recoil";

export type ChatRoomMap = {
    [chatRoomId: string]: boolean;
  };
  
  export const ignoreChatRoomState = atom<ChatRoomMap>({
    key: "ignoreChatRoom",
    default: {},
  });