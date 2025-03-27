export const ATTACHABLE_ITEM_ENDPOINTS = {
  attachableItem: {
    download: (id: string) => `/attachable_items/${id}`,
  },
  image: {
    upload: "/images",
    delete: "/images",
  },
  file: {
    upload: "/files",
    delete: "/files",
  }
};
