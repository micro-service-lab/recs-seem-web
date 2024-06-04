import { MemberCard } from "./member";
import { Organization } from "./organization";

export interface Membership {
    memberId: string;
    organizationId: string;
    workPositionId: string|null;
    addedAt: Date;
}

export interface MembershipMember {
    member: MemberCard;
    workPositionId: string|null;
    addedAt: Date;
}

export interface MemberOnOrganization {
    member: MemberCard;
    workPositionId: string|null;
    addedAt: Date;
}

export interface OrganizationOnMember {
    organization: Organization;
    workPositionId: string|null;
    addedAt: Date;
}