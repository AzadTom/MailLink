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
  Name?: string
}

export type EmailMessageListResponse = EmailMessageListItem[]

export interface EmailMessageListItem {
  message: string
  select: string
  subject: string
}

