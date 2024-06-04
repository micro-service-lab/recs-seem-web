import { AttachableItem } from "./attachable-item";

export interface File {
    fileId: string;
    attachableItemId: string;
}

export interface FileWithAttachableItem {
    fileId: string;
    attachableItem: AttachableItem;
}