// // Event イベントを表す構造体。
// type Event struct {
// 	EventID            uuid.UUID `json:"event_id"`
// 	EventTypeID        uuid.UUID `json:"event_type_id"`
// 	Title              string    `json:"title"`
// 	Description        String    `json:"description"`
// 	OrganizationID     UUID      `json:"organization_id"`
// 	StartTime          time.Time `json:"start_time"`
// 	EndTime            time.Time `json:"end_time"`
// 	MailSendFlag       bool      `json:"mail_send_flag"`
// 	SendOrganizationID UUID      `json:"send_organization_id"`
// 	PostedBy           UUID      `json:"posted_by"`
// 	LastEditedBy       UUID      `json:"last_edited_by"`
// 	PostedAt           time.Time `json:"posted_at"`
// 	LastEditedAt       time.Time `json:"last_edited_at"`
// }


export interface Event {
    eventId: string;
    eventTypeId: string;
    title: string;
    description: string|null;
    organizationId: string|null;
    startTime: Date;
    endTime: Date;
    mailSendFlag: boolean;
    sendOrganizationId: string|null;
    postedBy: string|null;
    lastEditedBy: string|null;
    postedAt: Date;
    lastEditedAt: Date;
}