export const CHAT_ROOM_ENDPOINTS = {
  chatRoom: {
    find: (id: string) => `/chat_rooms/${id}`,
    get: "/chat_rooms",
    create: "/chat_rooms",
    update: (id: string) => `/chat_rooms/${id}`,
    delete: (id: string) => `/chat_rooms/${id}`,
    message: {
      get: (chatRoomId: string) => `/chat_rooms/${chatRoomId}/messages`,
      create: (chatRoomId: string) => `/chat_rooms/${chatRoomId}/messages`,
      delete: (chatRoomId: string, chatId: string) => `/chat_rooms/${chatRoomId}/messages/${chatId}`,
    },
    member: {
      get: (chatRoomId: string) => `/chat_rooms/${chatRoomId}/members`,
      create: (chatRoomId: string) => `/chat_rooms/${chatRoomId}/members`,
      delete: (chatRoomId: string, memberId: string) => `/chat_rooms/${chatRoomId}/members/${memberId}`,
    },
    action: {
      get: (chatRoomId: string) => `/chat_rooms/${chatRoomId}/chat_room_actions`,
    },
  },
};
