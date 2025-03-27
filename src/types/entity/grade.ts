import { Organization } from "./organization";

export interface Grade {
    gradeId: string;
    key: string;
    organizationId: string;
}

export interface GradeWithOrganization {
    gradeId: string;
    key: string;
    organization: Organization;
}