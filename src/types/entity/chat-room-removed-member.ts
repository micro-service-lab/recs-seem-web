import { SimpleMember } from "./member";

export interface ChatRoomRemovedMember {
  chatRoomRemoveMemberActionID: string;
  memberID: string|null;
}

export interface MemberOnChatRoomRemoveMemberAction {
    chatRoomRemoveMemberActionID: string;
    member: SimpleMember|null;
}