import { ChatRoomWithCoverImage } from "./chat-room";
import { Grade } from "./grade";
import { Group } from "./group";

export interface Organization {
    organizationId: string;
    name: string;
    color: string|null;
    description: string|null;
    isPersonal: boolean;
    isWhole: boolean;
    chatRoomId: string|null;
}

export interface OrganizationWithDetail {
    organizationId: string;
    name: string;
    color: string|null;
    description: string|null;
    isPersonal: boolean;
    isWhole: boolean;
    chatRoomId: string|null;
    group: Group|null;
    grade: Grade|null;
}

export interface OrganizationWithChatRoom {
    organizationId: string;
    name: string;
    color: string|null;
    description: string|null;
    isPersonal: boolean;
    isWhole: boolean;
    chatRoom: ChatRoomWithCoverImage|null;
}

export interface OrganizationWithChatRoomAndDetail {
    organizationId: string;
    name: string;
    color: string|null;
    description: string|null;
    isPersonal: boolean;
    isWhole: boolean;
    chatRoom: ChatRoomWithCoverImage|null;
    group: Group|null;
    grade: Grade|null;
}