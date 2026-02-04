export interface EmailListResponse {
  data: EmailListItem[]
  nextCursor: any
  hasMore: boolean
}

export interface EmailListItem {
  company: string
  select: any
  "Created Date": string
  number?: number
  "linkedin "?: string
  email: string
  Name?: string;
  place?:string;
}

export type EmailMessageListResponse = EmailMessageListItem[]

export interface EmailMessageListItem {
  message: string
  select: string
  subject: string
}

export type NewRecordEmailPayload = {
  createdDate: string;   // YYYY-MM-DD
  name: string;
  company: string;
  linkedin: string;      // URL string
  number: string;        // keep string if coming from form
  place: string;
  email: string;
};


