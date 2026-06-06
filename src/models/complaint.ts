export interface Complaint {
  id: number;
  title: string;
  content: string;
  category: string;
  priority: 'low' | 'normal' | 'high' | 'urgent';
  status: 'pending' | 'processing' | 'resolved' | 'closed';
  submitter_id: number;
  handler_id: number | null;
  reply: string | null;
  created_at: string;
  updated_at: string;
}
