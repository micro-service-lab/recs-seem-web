export interface Record {
    recordId: string;
    recordTypeId: string;
    title: string;
    body: string|null;
    organizationId: string|null;
    postedBy: string|null;
    lastEditedBy: string|null;
    postedAt: string|null;
    lastEditedAt: string|null;
}