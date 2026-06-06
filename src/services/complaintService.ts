import db from '../config/database';
import { Complaint } from '../models/complaint';

export function findAll(): Complaint[] {
  return db.prepare('SELECT c.*, u.real_name as submitter_name, h.real_name as handler_name FROM complaints c LEFT JOIN users u ON c.submitter_id = u.id LEFT JOIN users h ON c.handler_id = h.id ORDER BY c.created_at DESC').all() as any[];
}

export function findById(id: number): Complaint | undefined {
  return db.prepare('SELECT c.*, u.real_name as submitter_name, h.real_name as handler_name FROM complaints c LEFT JOIN users u ON c.submitter_id = u.id LEFT JOIN users h ON c.handler_id = h.id WHERE c.id = ?').get(id) as any;
}

export function findBySubmitterId(submitterId: number): Complaint[] {
  return db.prepare('SELECT * FROM complaints WHERE submitter_id = ? ORDER BY created_at DESC').all(submitterId) as Complaint[];
}

export function create(data: {
  title: string;
  content: string;
  category: string;
  priority?: string;
  submitter_id: number;
}): Complaint {
  const stmt = db.prepare(
    'INSERT INTO complaints (title, content, category, priority, submitter_id) VALUES (?, ?, ?, ?, ?)'
  );
  const result = stmt.run(
    data.title,
    data.content,
    data.category,
    data.priority || 'normal',
    data.submitter_id
  );
  return findById(result.lastInsertRowid as number)!;
}

export function updateStatus(id: number, status: string, handlerId: number): boolean {
  const result = db.prepare(
    'UPDATE complaints SET status = ?, handler_id = ?, updated_at = datetime(\'now\', \'localtime\') WHERE id = ?'
  ).run(status, handlerId, id);
  return result.changes > 0;
}

export function reply(id: number, replyContent: string, handlerId: number): boolean {
  const result = db.prepare(
    'UPDATE complaints SET reply = ?, handler_id = ?, status = ?, updated_at = datetime(\'now\', \'localtime\') WHERE id = ?'
  ).run(replyContent, handlerId, 'resolved', id);
  return result.changes > 0;
}

export function getStats(): { total: number; pending: number; processing: number; resolved: number } {
  const total = (db.prepare('SELECT COUNT(*) as count FROM complaints').get() as any).count;
  const pending = (db.prepare('SELECT COUNT(*) as count FROM complaints WHERE status = ?').get('pending') as any).count;
  const processing = (db.prepare('SELECT COUNT(*) as count FROM complaints WHERE status = ?').get('processing') as any).count;
  const resolved = (db.prepare('SELECT COUNT(*) as count FROM complaints WHERE status = ?').get('resolved') as any).count;
  return { total, pending, processing, resolved };
}
