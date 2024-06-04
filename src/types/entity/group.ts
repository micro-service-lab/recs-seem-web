import { Organization } from "./organization";

export interface Group {
    groupId: string;
    key: string;
    organizationId: string;
}

export interface GroupWithOrganization {
    groupId: string;
    key: string;
    organization: Organization;
}