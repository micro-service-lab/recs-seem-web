import { SimpleAdmin } from ".";
import { LangProp } from "./_common";
import { SimpleInformationCategory } from "./information-category";

export interface Information {
  informationId: string;
  informationCategory: SimpleInformationCategory;
  title: string;
  titles: LangProp<string>;
  content: string;
  contents: LangProp<string>;
  chargeAdmin:  SimpleAdmin | null;
  createdAt: string;
  updatedAt: string;
}

export interface SimpleInformation {
  informationId: string;
  informationCategoryId: number;
  title: string;
  titles: LangProp<string>;
  content: string;
  contents: LangProp<string>;
  chargeAdminId:  number | null;
  createdAt: string;
  updatedAt: string;
}

export interface NoTextInformation {
  informationId: string;
  informationCategory: SimpleInformationCategory;
  title: string;
  titles: LangProp<string>;
  chargeAdmin:  SimpleAdmin | null;
  createdAt: string;
  updatedAt: string;
}

