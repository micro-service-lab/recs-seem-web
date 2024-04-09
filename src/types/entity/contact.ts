import { SimpleContactCategory } from "./contact-category"

export interface Contact {
  contactId: string;
  contactCategory: SimpleContactCategory;
  company: string | null;
  companyKana: string | null;
  name: string;
  nameKana: string;
  zip: string | null;
  address: string | null;
  tel: string;
  email: string;
  content: string;
  createdAt: string;
}

export interface SimpleContact {
  contactId: string;
  contactCategoryId: string;
  company: string | null;
  companyKana: string | null;
  name: string;
  nameKana: string;
  zip: string | null;
  address: string | null;
  tel: string;
  email: string;
  content: string;
  createdAt: string;
}