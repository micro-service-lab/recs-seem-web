import { ChatRoomActionWithActionType } from "./chat-room-action";
import { ChatRoomBelongingMember, MemberOnChatRoom } from "./chat-room-belonging";
import { ImageWithAttachableItem } from "./image";
import { Member } from "./member";
import { MessageCard } from "./message";

export interface ChatRoom {
  chatRoomId: string;
  name: string | null;
  isPrivate: boolean;
  fromOrganization: boolean;
  coverImageId: string | null;
  ownerId: string | null;
}

export interface ChatRoomWithCoverImage {
  chatRoomId: string;
  name: string | null;
  isPrivate: boolean;
  fromOrganization: boolean;
  coverImage: ImageWithAttachableItem | null;
  ownerId: string | null;
}

export interface ChatRoomWithLatestAndCoverImage {
  chatRoomId: string;
  name: string | null;
  isPrivate: boolean;
  fromOrganization: boolean;
  coverImage: ImageWithAttachableItem | null;
  ownerId: string | null;
  latestMessage: MessageCard | null;
  latestAction: ChatRoomActionWithActionType | null;
}

export interface PracticalChatRoom {
  chatRoomId: string;
  name: string | null;
  isPrivate: boolean;
  fromOrganization: boolean;
  coverImage: ImageWithAttachableItem | null;
  ownerId: string | null;
  latestMessage: MessageCard | null;
  latestAction: ChatRoomActionWithActionType | null;
  companion: MemberOnChatRoom | null;
}

export interface ChatRoomWithOwner {
  chatRoomId: string;
  name: string | null;
  isPrivate: boolean;
  fromOrganization: boolean;
  coverImageId: string | null;
  owner: Member;
}

export interface ChatRoomOnPrivateWithMember {
  chatRoomId: string;
  name: string | null;
  isPrivate: boolean;
  owner: Member;
  fromOrganization: boolean;
  coverImage: ImageWithAttachableItem | null;
  partner: ChatRoomBelongingMember;
}
