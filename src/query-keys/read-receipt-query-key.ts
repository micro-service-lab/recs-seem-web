import { createQueryKeyStore } from '@lukemorales/query-key-factory';

export const readReceiptQueryKey = createQueryKeyStore({
  countUnreadOnAuth: null,
});