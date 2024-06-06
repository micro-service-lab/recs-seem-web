import { createQueryKeyStore } from '@lukemorales/query-key-factory';

export const chatRoomQueryKey = createQueryKeyStore({
  list: null,
  action: {
    list: (chatRoomId: string) => [chatRoomId],
  },
  onAuth: {
    list: null,
  },
});