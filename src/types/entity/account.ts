import { Admin } from ".";

export interface Account {
  accountId: number;
  admin: Admin | null;
  createdAt: string;
  updatedAt: string;
}


export interface SimpleAccount {
  accountId: number;
  admin: string | null;
  createdAt: string;
  updatedAt: string;
}
