import { MemberCard } from "./member";

export interface Professor {
    professorId: string;
    memberId: string;
}

export interface ProfessorWithMember {
    professorId: string;
    member: MemberCard;
}