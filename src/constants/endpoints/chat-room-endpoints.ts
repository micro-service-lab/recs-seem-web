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
      edit: (chatRoomId: string, messageId: string) => `/chat_rooms/${chatRoomId}/messages/${messageId}`,
      read: (chatRoomId: string) => `/chat_rooms/${chatRoomId}/messages/read`,
      readReceipt: {
        read: (chatRoomId: string, messageId: string) => `/chat_rooms/${chatRoomId}/messages/${messageId}/read`,
      },
    },
    member: {
      get: (chatRoomId: string) => `/chat_rooms/${chatRoomId}/members`,
      add: (chatRoomId: string) => `/chat_rooms/${chatRoomId}/members`,
      remove: (chatRoomId: string) => `/chat_rooms/${chatRoomId}/members`,
      withdraw: (chatRoomId: string) => `/chat_rooms/${chatRoomId}/members/withdraw`,
    },
    action: {
      get: (chatRoomId: string) => `/chat_rooms/${chatRoomId}/chat_room_actions`,
    },
  },
};
