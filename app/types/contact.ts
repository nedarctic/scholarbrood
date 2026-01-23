export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  created_at: string;
}

export interface NewContactMessage {
  name: string;
  email: string;
  subject: string;
  message: string;
}
