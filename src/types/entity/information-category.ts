import { SimpleAdmin } from ".";
import { LangProp } from "./_common";

export interface InformationCategory {
  informationId: number;
  displayLavel: number;
  name: string;
  names: LangProp<string>;
  chargeAdmin:  SimpleAdmin | null;
  createdAt: string;
  updatedAt: string;
}

export interface SimpleInformationCategory {
  informationId: number;
  displayLavel: number;
  name: string;
  names: LangProp<string>;
  chargeAdminId:  string | null;
  createdAt: string;
  updatedAt: string;
}