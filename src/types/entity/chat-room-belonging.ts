import { ChatRoomWithLatestAndCoverImage, PracticalChatRoom } from "./chat-room";
import { MemberCard } from "./member";

export interface ChatRoomBelonging {
    memberId: string;
    chatRoomId: string;
    addedAt: string;
}

export interface PrivateChatRoomCompanions {
    member: MemberCard;
    chatRoomId: string;
    addedAt: string;
}

export interface ChatRoomBelongingMember {
    member: MemberCard;
    addedAt: string;
}

export interface MemberOnChatRoom {
    member: MemberCard;
    addedAt: string;
}

export interface PracticalChatRoomOnMember {
    chatRoom: PracticalChatRoom;
    addedAt: string;
    unreadCount: number;
}

export interface ChatRoomOnMember {
    chatRoom: ChatRoomWithLatestAndCoverImage
    addedAt: string;
}
