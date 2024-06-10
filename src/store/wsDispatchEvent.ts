import { WsChatRoomAddedMeEventData, WsChatRoomAddedMemberEventData, WsChatRoomDeletedEventData, WsChatRoomDeletedMessageEventData, WsChatRoomEditedMessageEventData, WsChatRoomReadMessageEventData, WsChatRoomRemovedMeEventData, WsChatRoomRemovedMemberEventData, WsChatRoomSentMessageEventData, WsChatRoomUpdatedNameEventData, WsChatRoomWithdrawnMeEventData, WsChatRoomWithdrawnMemberEventData, WsConnectedEventData, WsConnectingMembersEventData, WsDisconnectedEventData } from "@/types/ws/event";
import { atom } from "recoil";

export const wsConnectingMembersEventDispatchState = atom<boolean>({
  key: "wsConnectingMembersEventDispatch",
  default: false,
});

export const wsDispatchConnectingMembersEventState = atom<WsConnectingMembersEventData[]>({
  key: "wsDispatchConnectingMembersEvent",
  default: [],
});

export const wsConnectedEventDispatchState = atom<boolean>({
  key: "wsConnectedEventDispatch",
  default: false,
});

export const wsDispatchConnectedEventState = atom<WsConnectedEventData[]>({
  key: "wsDispatchConnectedEvent",
  default: [],
});

export const wsDisconnectedEventDispatchState = atom<boolean>({
  key: "wsDisconnectedEventDispatch",
  default: false,
});

export const wsDispatchDisconnectedEventState = atom<WsDisconnectedEventData[]>({
  key: "wsDispatchDisconnectedEvent",
  default: [],
});

export const wsChatRoomUpdatedNameEventDispatchState = atom<boolean>({
  key: "wsEventDispatch",
  default: false,
});

export const wsDispatchChatRoomUpdatedNameEventState = atom<WsChatRoomUpdatedNameEventData[]>({
  key: "wsDispatchChatRoomUpdatedNameEvent",
  default: [],
});

export const wsChatRoomAddedMemberEventDispatchState = atom<boolean>({
  key: "wsChatRoomAddedMemberEventDispatch",
  default: false,
});

export const wsDispatchChatRoomAddedMemberEventState = atom<WsChatRoomAddedMemberEventData[]>({
  key: "wsDispatchChatRoomAddedMemberEvent",
  default: [],
});

export const wsChatRoomAddedMeEventDispatchState = atom<boolean>({
  key: "wsChatRoomAddedMeEventDispatch",
  default: false,
});

export const wsDispatchChatRoomAddedMeEventState = atom<WsChatRoomAddedMeEventData[]>({
  key: "wsDispatchChatRoomAddedMeEvent",
  default: [],
});

export const wsChatRoomRemovedMemberEventDispatchState = atom<boolean>({
  key: "wsChatRoomRemovedMemberEventDispatch",
  default: false,
});

export const wsDispatchChatRoomRemovedMemberEventState = atom<WsChatRoomRemovedMemberEventData[]>({
  key: "wsDispatchChatRoomRemovedMemberEvent",
  default: [],
});

export const wsChatRoomRemovedMeEventDispatchState = atom<boolean>({
  key: "wsChatRoomRemovedMeEventDispatch",
  default: false,
});

export const wsDispatchChatRoomRemovedMeEventState = atom<WsChatRoomRemovedMeEventData[]>({
  key: "wsDispatchChatRoomRemovedMeEvent",
  default: [],
});

export const wsChatRoomWithdrawnMemberEventDispatchState = atom<boolean>({
  key: "wsChatRoomWithdrawnMemberEventDispatch",
  default: false,
});

export const wsDispatchChatRoomWithdrawnMemberEventState = atom<WsChatRoomWithdrawnMemberEventData[]>({
  key: "wsDispatchChatRoomWithdrawnMemberEvent",
  default: [],
});

export const wsChatRoomWithdrawnMeEventDispatchState = atom<boolean>({
  key: "wsChatRoomWithdrawnMeEventDispatch",
  default: false,
});

export const wsDispatchChatRoomWithdrawnMeEventState = atom<WsChatRoomWithdrawnMeEventData[]>({
  key: "wsDispatchChatRoomWithdrawnMeEvent",
  default: [],
});

export const wsChatRoomSentMessageEventDispatchState = atom<boolean>({
  key: "wsChatRoomSentMessageEventDispatch",
  default: false,
});

export const wsDispatchChatRoomSentMessageEventState = atom<WsChatRoomSentMessageEventData[]>({
  key: "wsDispatchChatRoomSentMessageEvent",
  default: [],
});

export const wsChatRoomDeletedMessageEventDispatchState = atom<boolean>({
  key: "wsChatRoomDeletedMessageEventDispatch",
  default: false,
});

export const wsDispatchChatRoomDeletedMessageEventState = atom<WsChatRoomDeletedMessageEventData[]>({
  key: "wsDispatchChatRoomDeletedMessageEvent",
  default: [],
});

export const wsChatRoomEditedMessageEventDispatchState = atom<boolean>({
  key: "wsChatRoomEditedMessageEventDispatch",
  default: false,
});

export const wsDispatchChatRoomEditedMessageEventState = atom<WsChatRoomEditedMessageEventData[]>({
  key: "wsDispatchChatRoomEditedMessageEvent",
  default: [],
});

export const wsChatRoomReadMessageEventDispatchState = atom<boolean>({
  key: "wsChatRoomReadMessageEventDispatch",
  default: false,
});

export const wsDispatchChatRoomReadMessageEventState = atom<WsChatRoomReadMessageEventData[]>({
  key: "wsDispatchChatRoomReadMessageEvent",
  default: [],
});

export const wsChatRoomDeletedEventDispatchState = atom<boolean>({
  key: "wsChatRoomDeletedEventDispatch",
  default: false,
});

export const wsDispatchChatRoomDeletedEventState = atom<WsChatRoomDeletedEventData[]>({
  key: "wsDispatchChatRoomDeletedEvent",
  default: [],
});


