import { createQueryKeyStore } from '@lukemorales/query-key-factory';

export const organizationQueryKey = createQueryKeyStore({
  list: null,
  group: {
    list: null,
  },
  grade: {
    list: null,
  },
});