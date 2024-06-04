import { AttachableItem, AttachableItemWithMimeType } from "./attachable-item";
import { Message } from "./message";

export interface AttachedMessage {
    attachedMessageId: string;
    messageId: string;
    attachableItemId: string|null;
}

export interface AttachedItemOnMessage {
    attachedMessageId: string;
    messageId: string;
    attachableItem: AttachableItem;
}

export interface AttachedItemOnMessageWithContent {
    attachedMessageId: string;
    messageId: string;
    attachableItem: AttachableItemWithMimeType;
}

export interface AttachedItemOnChatRoom {
    attachedMessageId: string;
    attachableItem: AttachableItem;
    message: Message;
}
