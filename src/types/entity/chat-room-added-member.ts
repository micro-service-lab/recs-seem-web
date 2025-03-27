import { SimpleMember } from "./member";

export interface ChatRoomAddedMember {
    chatRoomAddMemberActionId: string;
    memberId: string|null;
}

export interface MemberOnChatRoomAddMemberAction {
    chatRoomAddMemberActionId: string;
    member: SimpleMember|null;
}