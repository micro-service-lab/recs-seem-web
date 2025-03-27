import { File } from "./file";
import { Image } from "./image";
import { MimeType } from "./mime-type";

export interface AttachableItem {
    attachableItemId: string;
    ownerId: string|null;
    fromOuter: boolean;
    url: string;
    alias: string;
    size: number|null;
    mimeTypeId: string;
    imageId: string|null;
    fileId: string|null;
}

export interface AttachableItemWithContent {
    attachableItemId: string;
    ownerId: string|null;
    fromOuter: boolean;
    url: string;
    alias: string;
    size: number|null;
    mimeTypeId: string;
    image: Image|null;
    file: File|null;
}

export interface AttachableItemWithMimeType {
    attachableItemId: string;
    ownerId: string|null;
    fromOuter: boolean;
    url: string;
    alias: string;
    size: number|null;
    mimeType: MimeType|null;
    image: Image|null;
    file: File|null;
}