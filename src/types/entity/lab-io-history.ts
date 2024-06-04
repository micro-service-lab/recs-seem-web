export interface LabIOHistory {
    labIoHistoryId: string;
    memberId: string;
    enteredAt: Date;
    exitedAt: Date|null;
}