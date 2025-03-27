import { ChatRoomActionType } from "./chat-room-action-type";
import { ChatRoomAddMemberActionWithAddedBy, ChatRoomAddMemberActionWithAddedByAndAddMembers } from "./chat-room-add-member-action";
import { ChatRoomCreateActionWithCreatedBy } from "./chat-room-create-action";
import { ChatRoomDeleteMessageActionWithDeletedBy } from "./chat-room-delete-message-action";
import { ChatRoomRemoveMemberActionWithRemovedBy, ChatRoomRemoveMemberActionWithRemovedByAndRemoveMembers } from "./chat-room-remove-member-action";
import { ChatRoomUpdateNameActionWithUpdatedBy } from "./chat-room-update-name-action";
import { ChatRoomWithdrawActionWithMember } from "./chat-room-withdraw-action";
import { MessageWithSender, MessageWithSenderAndReadReceiptCountAndAttachments } from "./message";

export interface ChatRoomAction {
    chatRoomActionId: string;
    chatRoomId: string;
    chatRoomActionTypeId: string;
    actedAt: string;
}

export interface ChatRoomActionWithActionType {
    chatRoomActionId: string;
    chatRoomId: string;
    actedAt: string;
    chatRoomActionType: ChatRoomActionType;
}

export interface ChatRoomActionWithDetail {
    chatRoomActionId: string;
    chatRoomId: string;
    chatRoomActionTypeId: string;
    actedAt: string;
    chatRoomCreateAction: ChatRoomCreateActionWithCreatedBy;
    chatRoomUpdateNameAction: ChatRoomUpdateNameActionWithUpdatedBy;
    chatRoomAddMemberAction: ChatRoomAddMemberActionWithAddedBy;
    chatRoomRemoveMemberAction: ChatRoomRemoveMemberActionWithRemovedBy;
    chatRoomWithdrawAction: ChatRoomWithdrawActionWithMember;
    chatRoomDeleteMessageAction: ChatRoomDeleteMessageActionWithDeletedBy;
    message: MessageWithSender;
}

export interface ChatRoomActionPractical {
    chatRoomActionId: string;
    chatRoomId: string;
    chatRoomActionTypeId: string;
    actedAt: string;
    chatRoomCreateAction: ChatRoomCreateActionWithCreatedBy|null;
    chatRoomUpdateNameAction: ChatRoomUpdateNameActionWithUpdatedBy|null;
    chatRoomAddMemberAction: ChatRoomAddMemberActionWithAddedByAndAddMembers|null;
    chatRoomRemoveMemberAction: ChatRoomRemoveMemberActionWithRemovedByAndRemoveMembers|null;
    chatRoomWithdrawAction: ChatRoomWithdrawActionWithMember|null;
    chatRoomDeleteMessageAction: ChatRoomDeleteMessageActionWithDeletedBy|null;
    message: MessageWithSenderAndReadReceiptCountAndAttachments|null;
}