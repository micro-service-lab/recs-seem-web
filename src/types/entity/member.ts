import { AttendStatus } from "./attend-status";
import { GradeWithOrganization } from "./grade";
import { GroupWithOrganization } from "./group";
import { ImageWithAttachableItem } from "./image";
import { Organization } from "./organization";
import { Professor } from "./professor";
import { Role, RoleWithPolicies } from "./role";
import { Student } from "./student";

export interface Member {
    memberId: string;
    email: string;
    name: string;
    firstName: string|null;
    lastName: string|null;
    attendStatusId: string;
    profileImageId: string|null;
    gradeId: string;
    groupId: string;
    personalOrganizationId: string;
    roleId: string|null;
}

export interface AuthMember extends Member {
    role: RoleWithPolicies|null;
}

export interface MemberWithAttendStatus{
    memberId: string;
    email: string;
    name: string;
    firstName: string|null;
    lastName: string|null;
    attendStatus: AttendStatus;
    profileImageId: string|null;
    gradeId: string;
    groupId: string;
    personalOrganizationId: string;
    roleId: string|null;
}

export interface MemberWithProfileImage{
    memberId: string;
    email: string;
    name: string;
    firstName: string|null;
    lastName: string|null;
    attendStatusId: string;
    profileImage: ImageWithAttachableItem|null;
    gradeId: string;
    groupId: string;
    personalOrganizationId: string;
    roleId: string|null;
}

export interface MemberWithDetail extends Member{
    student: Student|null;
    professor: Professor|null;
}

export interface MemberWithCrew{
    memberId: string;
    email: string;
    name: string;
    firstName: string|null;
    lastName: string|null;
    attendStatusId: string;
    profileImageId: string|null;
    grade: GradeWithOrganization;
    group: GroupWithOrganization;
    personalOrganizationId: string;
    roleId: string|null;
}

export interface MemberWithRole {
    memberId: string;
    email: string;
    name: string;
    firstName: string|null;
    lastName: string|null;
    attendStatusId: string;
    profileImageId: string|null;
    gradeId: string;
    groupId: string;
    personalOrganizationId: string;
    role: Role|null;
}

export interface MemberWithPersonalOrganization {
    memberId: string;
    email: string;
    name: string;
    firstName: string|null;
    lastName: string|null;
    attendStatusId: string;
    profileImageId: string|null;
    gradeId: string;
    groupId: string;
    personalOrganization: Organization;
    roleId: string|null;
}

export interface MemberWithCrewAndProfileImageAndAttendStatus {
    memberId: string;
    email: string;
    name: string;
    firstName: string|null;
    lastName: string|null;
    attendStatus: AttendStatus;
    profileImage: ImageWithAttachableItem|null;
    grade: GradeWithOrganization;
    group: GroupWithOrganization;
    personalOrganizationId: string;
    roleId: string|null;
}

export interface MemberCard {
    memberId: string;
    name: string;
    firstName: string|null;
    lastName: string|null;
    email: string;
    profileImage: ImageWithAttachableItem|null;
    gradeId: string;
    groupId: string;
}

export interface SimpleMember {
    memberId: string;
    name: string;
    firstName: string|null;
    lastName: string|null;
    email: string;
    profileImageId: string|null;
    gradeId: string;
    groupId: string;
}