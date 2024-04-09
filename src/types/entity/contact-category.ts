import { SimpleAdmin } from ".";
import { LangProp } from "./_common";

export interface ContactCategory {
  contactCategoryId: number;
  displayLavel: number;
  name: string;
  names: LangProp<string>;
  chargeAdmin:  SimpleAdmin | null;
  createdAt: string;
  updatedAt: string;
}

export interface SimpleContactCategory {
  contactCategoryId: number;
  displayLavel: number;
  name: string;
  names: LangProp<string>;
  chargeAdminId:  string | null;
  createdAt: string;
  updatedAt: string;
}