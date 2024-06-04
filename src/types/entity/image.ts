import { AttachableItem } from "./attachable-item";

export interface Image {
    imageId: string;
    height: number|null;
    width: number|null;
    attachableItemId: string;
}

export interface ImageWithAttachableItem {
    imageId: string;
    height: number|null;
    width: number|null;
    attachableItem: AttachableItem;
}