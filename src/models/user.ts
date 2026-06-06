export interface User {
  id: number;
  username: string;
  password: string;
  real_name: string;
  role: 'admin' | 'resident';
  phone: string | null;
  address: string | null;
  created_at: string;
}
