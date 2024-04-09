import { SimpleAdmin } from ".";
import { LangProp } from "./_common";

export interface CompanyHistory {
  companyHistoryId: number;
  content: string;
  contents: LangProp<string>;
  eventDate: number;
  chargeAdmin:  SimpleAdmin | null;
  createdAt: string;
  updatedAt: string;
}

export interface SimpleCompanyHistory {
  companyHistoryId: number;
  content: string;
  contents: LangProp<string>;
  eventDate: number;
  chargeAdminId:  string | null;
  createdAt: string;
  updatedAt: string;
}