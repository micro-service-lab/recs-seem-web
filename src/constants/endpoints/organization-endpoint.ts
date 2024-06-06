export const ORGANIZATION_ENDPOINTS = {
  organization: {
    find: (id: string) => `/organizations/${id}`,
    get: "/organizations",
    create: "/organizations",
    update: (id: string) => `/organizations/${id}`,
    delete: (id: string) => `/organizations/${id}`,
  },
  group: {
    get: "/groups",
  },
  grade: {
    get: "/grades",
  },
};
