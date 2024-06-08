import { OnlineMembers } from "@/types/ws/online";
import { atom, selector } from "recoil";

export const onlineMembersState = atom<OnlineMembers>({
  key: "onlineMembers",
  default: {},
});

// 接続メンバー数を返すセレクター
export const onlineMembersCountState = selector<number>({
  key: "onlineMembersCount",
  get: ({ get }) => {
    const onlineMembers = get(onlineMembersState);
    return Object.keys(onlineMembers).length;
  },
});

// 接続メンバーのリストを返すセレクター
export const onlineMembersListState = selector<string[]>({
  key: "onlineMembersList",
  get: ({ get }) => {
    const onlineMembers = get(onlineMembersState);
    return Object.keys(onlineMembers);
  },
});
