import { MemberCard } from "./member";

export interface Student {
    studentId: string;
    memberId: string;
}

export interface StudentWithMember {
    studentId: string;
    member: MemberCard;
}