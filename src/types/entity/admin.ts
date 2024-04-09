import { SimpleRole } from ".";

export interface Admin {
  adminId: string;
  displayName: string;
  firstName: string;
  lastName: string;
  email: string;
  tel: string;
  permissions: SimpleRole[];
  createdBy: SimpleAdmin | null;
  createdAt: string;
  updatedAt: string;
}

export interface GrantedAdmin extends Admin {
  grantedBy: SimpleAdmin | null;
  grantedAt: string;
}

export interface SimpleAdmin {
  adminId: string;
  displayName: string;
  firstName: string;
  lastName: string;
  email: string;
  tel: string;
  createdBy: string | null;
  createdAt: string;
  updatedAt: string;
}
