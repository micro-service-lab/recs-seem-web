export const MEMBER_ENDPOINTS = {
  member: {
    find: (id: string) => `/members/${id}`,
    get: "/members",
    create: "/members",
    update: (id: string) => `/members/${id}`,
    delete: (id: string) => `/members/${id}`,
  },
};
