import { PolicyOnRole } from "./role-association";

export interface Role {
    roleId: string;
    name: string;
    description: string;
}

export interface RoleWithPolicies extends Role{
    policies: PolicyOnRole[];
}