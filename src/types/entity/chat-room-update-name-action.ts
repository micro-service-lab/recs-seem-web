import { SimpleMember } from "./member";

export interface ChatRoomUpdateNameAction {
    chatRoomUpdateNameActionId: string;
    chatRoomActionId: string;
    name: string;
    updatedBy: string|null;
}

export interface ChatRoomUpdateNameActionWithUpdatedBy {
    chatRoomUpdateNameActionId: string;
    chatRoomActionId: string;
    name: string;
    updatedBy: SimpleMember|null;
}