import { SimpleMember } from "./member";

export interface ChatRoomCreateAction {
    chatRoomCreateActionId: string;
    chatRoomActionId: string;
    name: string|null;
    createdBy: string|null;
}

export interface ChatRoomCreateActionWithCreatedBy {
    chatRoomCreateActionId: string;
    chatRoomActionId: string;
    name: string|null;
    createdBy: SimpleMember|null;
}