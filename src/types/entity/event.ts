export interface Event {
    eventId: string;
    eventTypeId: string;
    title: string;
    description: string|null;
    organizationId: string|null;
    startTime: string;
    endTime: string;
    mailSendFlag: boolean;
    sendOrganizationId: string|null;
    postedBy: string|null;
    lastEditedBy: string|null;
    postedAt: string;
    lastEditedAt: string;
}