import { Policy } from "./policy";
import { Role } from "./role";

export interface RoleAssociation {
    roleId: string;
    policyId: string;
}

export interface RoleOnPolicy {
    role: Role;
}

export interface PolicyOnRole {
    policy: Policy;
}