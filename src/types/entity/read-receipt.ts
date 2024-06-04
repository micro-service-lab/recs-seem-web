import { MemberCard } from "./member";
import { Message } from "./message";

export interface ReadReceipt {
    memberId: string;
    messageId: string;
    readAt: Date|null;
}

export interface ReadReceiptGroupByMessage {
    messageId: string;
    count: number;
}

export interface ReadReceiptGroupByChatRoom {
    chatRoomId: string;
    count: number;
}

export interface ReadableMemberOnMessage {
    member: MemberCard;
    readAt: Date|null;
}

export interface ReadableMessageOnMember {
    message: Message;
    readAt: Date|null;
}