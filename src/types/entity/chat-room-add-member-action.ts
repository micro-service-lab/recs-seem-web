import { MemberOnChatRoomAddMemberAction } from "./chat-room-added-member";
import { SimpleMember } from "./member";

export interface ChatRoomAddMemberAction {
    chatRoomAddMemberActionId: string;
    chatRoomActionId: string;
    addedBy: string|null;
}

export interface ChatRoomAddMemberActionWithAddedBy {
    chatRoomAddMemberActionId: string;
    chatRoomActionId: string;
    addedBy: SimpleMember|null;
}

export interface ChatRoomAddMemberActionWithAddedByAndAddMembers {
    chatRoomAddMemberActionId: string;
    chatRoomActionId: string;
    addedBy: SimpleMember|null;
    addMembers: MemberOnChatRoomAddMemberAction[];
}