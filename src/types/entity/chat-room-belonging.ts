import { MemberCard } from "./member";

export interface ChatRoomBelonging {
    memberId: string;
    chatRoomId: string;
    addedAt: Date;
}

export interface PrivateChatRoomCompanions {
    member: MemberCard;
    chatRoomId: string;
    addedAt: Date;
}

export interface ChatRoomBelongingMember {
    member: MemberCard;
    addedAt: Date;
}

export interface MemberOnChatRoom {
    member: MemberCard;
    addedAt: Date;
}

// // PracticalChatRoomOnMember メンバー上の実用的なチャットルームを表す構造体。
// type PracticalChatRoomOnMember struct {
// 	ChatRoom PracticalChatRoom `json:"chat_room"`
// 	AddedAt  time.Time         `json:"added_at"`
// }

// export interface PracticalChatRoomOnMember {
//     chatRoom: PracticalChatRoom;
//     addedAt: Date;
// }

// // ChatRoomOnMember メンバー上のチャットルームを表す構造体。
// type ChatRoomOnMember struct {
// 	ChatRoom ChatRoomWithLatestAndCoverImage `json:"chat_room"`
// 	AddedAt  time.Time                       `json:"added_at"`
// }
