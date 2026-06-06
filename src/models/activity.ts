export interface Activity {
  id: number;
  title: string;
  description: string | null;
  location: string;
  start_time: string;
  end_time: string;
  max_participants: number;
  current_participants: number;
  status: 'open' | 'closed' | 'cancelled';
  created_by: number;
  created_at: string;
}

export interface ActivityRegistration {
  id: number;
  activity_id: number;
  user_id: number;
  registered_at: string;
}
