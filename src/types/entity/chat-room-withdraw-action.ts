import { SimpleMember } from "./member";

export interface ChatRoomWithdrawAction {
    chatRoomWithdrawActionId: string;
    chatRoomActionId: string;
    memberId: string|null;
}

export interface ChatRoomWithdrawActionWithMember {
    chatRoomWithdrawActionId: string;
    chatRoomActionId: string;
    member: SimpleMember|null;
}