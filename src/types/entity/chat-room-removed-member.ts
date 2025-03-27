import { SimpleMember } from "./member";

export interface ChatRoomRemovedMember {
  chatRoomRemoveMemberActionId: string;
  memberID: string|null;
}

export interface MemberOnChatRoomRemoveMemberAction {
    chatRoomRemoveMemberActionId: string;
    member: SimpleMember|null;
}