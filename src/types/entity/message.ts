import { AttachedItemOnMessage } from "./attached-message";
import { ChatRoomWithCoverImage } from "./chat-room";
import { ChatRoomAction } from "./chat-room-action";
import { MemberCard } from "./member";

export interface Message {
    messageId: string;
    chatRoomActionId: string;
    senderId: string|null;
    body: string;
    postedAt: string;
    lastEditedAt: string;
}

export interface MessageCard {
    messageId: string;
    body: string;
    postedAt: string;
}

export interface MessageWithChatRoomAction {
    messageId: string;
    chatRoomAction: ChatRoomAction;
    senderId: string|null;
    body: string;
    postedAt: string;
    lastEditedAt: string;
}

export interface MessageWithSender {
    messageId: string;
    chatRoomActionId: string;
    sender: MemberCard|null;
    body: string;
    postedAt: string;
    lastEditedAt: string;
}

export interface MessageWithSenderAndReadReceiptCountAndAttachments {
    messageId: string;
    chatRoomActionId: string;
    sender: MemberCard|null;
    body: string;
    postedAt: string;
    lastEditedAt: string;
    readReceiptCount: number;
    attachments: AttachedItemOnMessage[];
}

export interface MessageWithChatRoom {
    messageId: string;
    chatRoom: ChatRoomWithCoverImage;
    senderId: string|null;
    body: string;
    postedAt: string;
    lastEditedAt: string;
}
