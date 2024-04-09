export const ADMINS_ENDPOINTS = {
  admins: {
    find: (id: string) => `/admins/${id}`,
    get: '/admins',
    create: '/admins',
    update: '/admins',
    delete: '/admins',
    forceDelete: (id: string) => `/admins/${id}`,
    permissions: {
      grant: (id: string) => `/admins/${id}/permissions`,
      revoke: (id: string) => `/admins/${id}/permissions`,
      revokeAll: (id: string) => `/admins/${id}/permissions/all`,
    },
  },
};
