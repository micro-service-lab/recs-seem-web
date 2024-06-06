import { createQueryKeyStore } from '@lukemorales/query-key-factory';
import { group } from 'console';

export const organizationQueryKey = createQueryKeyStore({
  list: null,
  group: {
    list: null,
  },
  grade: {
    list: null,
  },
});