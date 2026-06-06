export interface MealOrder {
  id: number;
  user_id: number;
  meal_date: string;
  meal_type: 'breakfast' | 'lunch' | 'dinner';
  menu_item: string;
  status: 'pending' | 'confirmed' | 'cancelled';
  created_at: string;
}
