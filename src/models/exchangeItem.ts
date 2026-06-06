export interface ExchangeItem {
  id: number;
  title: string;
  description: string | null;
  category: string;
  condition_level: 'new' | 'good' | 'fair';
  owner_id: number;
  contact_info: string | null;
  status: 'available' | 'exchanged' | 'removed';
  image_url: string | null;
  created_at: string;
}
