export interface VolunteerShift {
  id: number;
  title: string;
  description: string | null;
  location: string;
  shift_date: string;
  start_time: string;
  end_time: string;
  max_volunteers: number;
  current_volunteers: number;
  status: 'open' | 'closed';
  created_at: string;
}

export interface VolunteerSignup {
  id: number;
  shift_id: number;
  user_id: number;
  signed_up_at: string;
}
