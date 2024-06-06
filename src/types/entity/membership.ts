import { MemberCard } from "./member";
import { Organization } from "./organization";

export interface Membership {
    memberId: string;
    organizationId: string;
    workPositionId: string|null;
    addedAt: string;
}

export interface MembershipMember {
    member: MemberCard;
    workPositionId: string|null;
    addedAt: string;
}

export interface MemberOnOrganization {
    member: MemberCard;
    workPositionId: string|null;
    addedAt: string;
}

export interface OrganizationOnMember {
    organization: Organization;
    workPositionId: string|null;
    addedAt: string;
}