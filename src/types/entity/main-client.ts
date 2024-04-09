import { SimpleAdmin } from ".";
import { LangProp } from "./_common";

export interface MainClient {
  mainClientId: number;
  displayLavel: number;
  clientName: string;
  clientNames: LangProp<string>;
  chargeAdmin:  SimpleAdmin | null;
  createdAt: string;
  updatedAt: string;
}

export interface SimpleMainClient {
  mainClientId: number;
  displayLavel: number;
  clientName: string;
  clientNames: LangProp<string>;
  chargeAdminId:  string | null;
  createdAt: string;
  updatedAt: string;
}