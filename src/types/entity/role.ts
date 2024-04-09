import { SimpleAdmin } from ".";

export interface Role {
  roleId: number;
  name: string;
  description: string;
}

export interface GrantedRole extends Role {
  grantedBy: SimpleAdmin | null;
  grantedAt: string;
}

export interface SimpleRole {
  roleId: number;
  name: string;
  description: string;
}
