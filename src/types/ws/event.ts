import { ChatRoom } from "../entity/chat-room";
import { ChatRoomAddMemberActionWithAddedByAndAddMembers } from "../entity/chat-room-add-member-action";
import { ChatRoomDeleteMessageActionWithDeletedBy } from "../entity/chat-room-delete-message-action";
import { ChatRoomRemoveMemberActionWithRemovedByAndRemoveMembers } from "../entity/chat-room-remove-member-action";
import { ChatRoomUpdateNameActionWithUpdatedBy } from "../entity/chat-room-update-name-action";
import { ChatRoomWithdrawActionWithMember } from "../entity/chat-room-withdraw-action";
import { Member } from "../entity/member";
import {
  Message,
  MessageWithSenderAndReadReceiptCountAndAttachments,
} from "../entity/message";
import { WsEventType } from "./event-type";

/* eslint-disable @typescript-eslint/no-explicit-any */
export type WsEventRawPayload = {
    eventType: WsEventType;
    data: any;
};

export type WsEventPayload<T> = {
  eventType: WsEventType;
  data: T;
};

export type WsConnectingMembersEventData = {
  connectingMembers: WsConnectingMember[];
};

export type WsConnectingMembersEventPayload = WsEventPayload<WsConnectingMembersEventData>;

export type WsConnectingMember = {
  memberId: string;
  connectIds: string[];
};

export type WsConnectedEventData = {
  authMemberId: string;
  connectId: string;
};

export type WsConnectedEventPayload = WsEventPayload<WsConnectedEventData>;

export type WsDisconnectedEventData = {
  authMemberId: string;
  connectId: string;
};

export type WsDisconnectedEventPayload = WsEventPayload<WsDisconnectedEventData>;

export type WsChatRoomAddedMeEventData = {
  chatRoom: ChatRoom;
};

export type WsChatRoomAddedMeEventPayload = WsEventPayload<WsChatRoomAddedMeEventData>;

export type WsChatRoomAddedMemberEventData = {
  chatRoomId: string;
  action: ChatRoomAddMemberActionWithAddedByAndAddMembers;
  chatRoomActionId: string;
  chatRoomActionTypeId: string;
  actedAt: string;
};

export type WsChatRoomAddedMemberEventPayload = WsEventPayload<WsChatRoomAddedMemberEventData>;

export type WsChatRoomRemovedMeEventData = {
  chatRoomId: string;
  action: ChatRoomRemoveMemberActionWithRemovedByAndRemoveMembers;
  chatRoomActionId: string;
  chatRoomActionTypeId: string;
  actedAt: string;
};

export type WsChatRoomRemovedMeEventPayload = WsEventPayload<WsChatRoomRemovedMeEventData>;

export type WsChatRoomRemovedMemberEventData = {
  chatRoomId: string;
  action: ChatRoomRemoveMemberActionWithRemovedByAndRemoveMembers;
  chatRoomActionId: string;
  chatRoomActionTypeId: string;
  actedAt: string;
};

export type WsChatRoomRemovedMemberEventPayload = WsEventPayload<WsChatRoomRemovedMemberEventData>;

export type WsChatRoomWithdrawnMemberEventData = {
  chatRoomId: string;
  action: ChatRoomWithdrawActionWithMember;
  chatRoomActionId: string;
  chatRoomActionTypeId: string;
  actedAt: string;
};

export type WsChatRoomWithdrawnMemberEventPayload = WsEventPayload<WsChatRoomWithdrawnMemberEventData>;

export type WsChatRoomUpdatedNameEventData = {
  chatRoomId: string;
  action: ChatRoomUpdateNameActionWithUpdatedBy;
  chatRoomActionId: string;
  chatRoomActionTypeId: string;
  actedAt: string;
};

export type WsChatRoomUpdatedNameEventPayload = WsEventPayload<WsChatRoomUpdatedNameEventData>;

export type WsChatRoomDeletedMessageEventData = {
  chatRoomId: string;
  action: ChatRoomDeleteMessageActionWithDeletedBy;
  chatRoomActionId: string;
  chatRoomActionTypeId: string;
  actedAt: string;
};

export type WsChatRoomDeletedMessageEventPayload = WsEventPayload<WsChatRoomDeletedMessageEventData>;

export type WsChatRoomEditedMessageEventData = {
  chatRoomId: string;
  message: Message;
};

export type WsChatRoomEditedMessageEventPayload = WsEventPayload<WsChatRoomEditedMessageEventData>;

export type WsChatRoomSentMessageEventData = {
  chatRoomId: string;
  action: MessageWithSenderAndReadReceiptCountAndAttachments;
  chatRoomActionId: string;
  chatRoomActionTypeId: string;
  actedAt: string;
};

export type WsChatRoomSentMessageEventPayload = WsEventPayload<WsChatRoomSentMessageEventData>;

export type WsChatRoomReadMessageEventData = {
  chatRoomId: string;
  messageIds: string[];
};

export type WsChatRoomReadMessageEventPayload = WsEventPayload<WsChatRoomReadMessageEventData>;

export type WsChatRoomDeletedEventData = {
  chatRoom: ChatRoom;
  deletedBy: Member;
};

export type WsChatRoomDeletedEventPayload = WsEventPayload<WsChatRoomDeletedEventData>;
