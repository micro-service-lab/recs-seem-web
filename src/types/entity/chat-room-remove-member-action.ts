import { MemberOnChatRoomRemoveMemberAction } from "./chat-room-removed-member";
import { SimpleMember } from "./member";

export interface ChatRoomRemoveMemberAction {
    chatRoomRemoveMemberActionId: string;
    chatRoomActionId: string;
    removedBy: string|null;
}

export interface ChatRoomRemoveMemberActionWithRemovedBy {
    chatRoomRemoveMemberActionId: string;
    chatRoomActionId: string;
    removedBy: SimpleMember|null;
}

export interface ChatRoomRemoveMemberActionWithRemovedByAndRemoveMembers {
    chatRoomRemoveMemberActionId: string;
    chatRoomActionId: string;
    removedBy: SimpleMember|null;
    removeMembers: MemberOnChatRoomRemoveMemberAction[];
}