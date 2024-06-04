export interface Attendance {
    attendanceId: string;
    attendanceTypeId: string;
    memberId: string;
    description: string;
    date: Date|null;
    mailSendFlag: boolean;
    sendOrganizationId: string|null;
    postedAt: Date;
    lastEditedAt: Date;
}