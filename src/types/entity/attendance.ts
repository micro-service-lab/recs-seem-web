export interface Attendance {
    attendanceId: string;
    attendanceTypeId: string;
    memberId: string;
    description: string;
    date: string|null;
    mailSendFlag: boolean;
    sendOrganizationId: string|null;
    postedAt: string;
    lastEditedAt: string;
}