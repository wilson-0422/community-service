import db from '../config/database';
import { MealOrder } from '../models/mealOrder';

const MENU_ITEMS: Record<string, string[]> = {
  breakfast: ['小米粥+鸡蛋+馒头', '豆浆+油条+咸菜', '牛奶+面包+水果', '皮蛋瘦肉粥+花卷'],
  lunch: ['红烧肉+青菜+米饭', '清蒸鱼+西红柿炒蛋+米饭', '宫保鸡丁+炒时蔬+米饭', '排骨汤+土豆丝+米饭'],
  dinner: ['鸡汤面+小菜', '饺子+凉拌黄瓜', '馄饨+茶叶蛋', '炒面+紫菜蛋花汤'],
};

export function getMenuItems(): Record<string, string[]> {
  return MENU_ITEMS;
}

export function findAll(): MealOrder[] {
  return db.prepare('SELECT mo.*, u.real_name FROM meal_orders mo JOIN users u ON mo.user_id = u.id ORDER BY mo.meal_date DESC, mo.meal_type').all() as MealOrder[];
}

export function findByUserId(userId: number): MealOrder[] {
  return db.prepare('SELECT * FROM meal_orders WHERE user_id = ? ORDER BY meal_date DESC').all(userId) as MealOrder[];
}

export function findById(id: number): MealOrder | undefined {
  return db.prepare('SELECT * FROM meal_orders WHERE id = ?').get(id) as MealOrder | undefined;
}

export function create(data: {
  user_id: number;
  meal_date: string;
  meal_type: string;
  menu_item: string;
}): MealOrder {
  const stmt = db.prepare(
    'INSERT INTO meal_orders (user_id, meal_date, meal_type, menu_item) VALUES (?, ?, ?, ?)'
  );
  const result = stmt.run(data.user_id, data.meal_date, data.meal_type, data.menu_item);
  return findById(result.lastInsertRowid as number)!;
}

export function updateStatus(id: number, status: string): boolean {
  const result = db.prepare('UPDATE meal_orders SET status = ? WHERE id = ?').run(status, id);
  return result.changes > 0;
}

export function cancelOrder(id: number, userId: number): boolean {
  const result = db.prepare('UPDATE meal_orders SET status = ? WHERE id = ? AND user_id = ? AND status = ?').run('cancelled', id, userId, 'pending');
  return result.changes > 0;
}
