import { atom } from "recoil";

type dispatchData = {
  dispatch: boolean;
  first: boolean;
};

export const chatRoomRefetchDispatchState = atom<dispatchData>({
  key: "chatRoomRefetchDispatch",
  default: { dispatch: false, first: true },
});
