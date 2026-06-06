import db from '../config/database';
import { ExchangeItem } from '../models/exchangeItem';

export function findAll(): ExchangeItem[] {
  return db.prepare('SELECT ei.*, u.real_name as owner_name FROM exchange_items ei JOIN users u ON ei.owner_id = u.id ORDER BY ei.created_at DESC').all() as any[];
}

export function findAvailable(): ExchangeItem[] {
  return db.prepare('SELECT ei.*, u.real_name as owner_name FROM exchange_items ei JOIN users u ON ei.owner_id = u.id WHERE ei.status = ? ORDER BY ei.created_at DESC').all('available') as any[];
}

export function findById(id: number): ExchangeItem | undefined {
  return db.prepare('SELECT ei.*, u.real_name as owner_name FROM exchange_items ei JOIN users u ON ei.owner_id = u.id WHERE ei.id = ?').get(id) as any;
}

export function create(data: {
  title: string;
  description?: string;
  category: string;
  condition_level: string;
  owner_id: number;
  contact_info?: string;
  image_url?: string;
}): ExchangeItem {
  const stmt = db.prepare(
    'INSERT INTO exchange_items (title, description, category, condition_level, owner_id, contact_info, image_url) VALUES (?, ?, ?, ?, ?, ?, ?)'
  );
  const result = stmt.run(
    data.title,
    data.description || null,
    data.category,
    data.condition_level,
    data.owner_id,
    data.contact_info || null,
    data.image_url || null
  );
  return findById(result.lastInsertRowid as number)!;
}

export function updateStatus(id: number, status: string): boolean {
  const result = db.prepare('UPDATE exchange_items SET status = ? WHERE id = ?').run(status, id);
  return result.changes > 0;
}

export function findByOwnerId(ownerId: number): ExchangeItem[] {
  return db.prepare('SELECT * FROM exchange_items WHERE owner_id = ? ORDER BY created_at DESC').all(ownerId) as ExchangeItem[];
}
