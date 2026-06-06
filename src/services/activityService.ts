import db from '../config/database';
import { Activity, ActivityRegistration } from '../models/activity';

export function findAll(): Activity[] {
  return db.prepare('SELECT * FROM activities ORDER BY start_time DESC').all() as Activity[];
}

export function findById(id: number): Activity | undefined {
  return db.prepare('SELECT * FROM activities WHERE id = ?').get(id) as Activity | undefined;
}

export function create(data: {
  title: string;
  description?: string;
  location: string;
  start_time: string;
  end_time: string;
  max_participants: number;
  created_by: number;
}): Activity {
  const stmt = db.prepare(
    'INSERT INTO activities (title, description, location, start_time, end_time, max_participants, created_by) VALUES (?, ?, ?, ?, ?, ?, ?)'
  );
  const result = stmt.run(
    data.title,
    data.description || null,
    data.location,
    data.start_time,
    data.end_time,
    data.max_participants,
    data.created_by
  );
  return findById(result.lastInsertRowid as number)!;
}

export function register(activityId: number, userId: number): boolean {
  const activity = findById(activityId);
  if (!activity || activity.status !== 'open') return false;
  if (activity.current_participants >= activity.max_participants) return false;

  const existing = db.prepare(
    'SELECT id FROM activity_registrations WHERE activity_id = ? AND user_id = ?'
  ).get(activityId, userId);
  if (existing) return false;

  const transaction = db.transaction(() => {
    db.prepare('INSERT INTO activity_registrations (activity_id, user_id) VALUES (?, ?)').run(activityId, userId);
    db.prepare('UPDATE activities SET current_participants = current_participants + 1 WHERE id = ?').run(activityId);
    if (activity.current_participants + 1 >= activity.max_participants) {
      db.prepare('UPDATE activities SET status = ? WHERE id = ?').run('closed', activityId);
    }
  });
  transaction();
  return true;
}

export function cancelRegistration(activityId: number, userId: number): boolean {
  const existing = db.prepare(
    'SELECT id FROM activity_registrations WHERE activity_id = ? AND user_id = ?'
  ).get(activityId, userId);
  if (!existing) return false;

  const transaction = db.transaction(() => {
    db.prepare('DELETE FROM activity_registrations WHERE activity_id = ? AND user_id = ?').run(activityId, userId);
    db.prepare('UPDATE activities SET current_participants = current_participants - 1 WHERE id = ?').run(activityId);
    db.prepare('UPDATE activities SET status = ? WHERE id = ? AND status = ?').run('open', activityId, 'closed');
  });
  transaction();
  return true;
}

export function getRegistrations(activityId: number): ActivityRegistration[] {
  return db.prepare(
    'SELECT ar.*, u.real_name FROM activity_registrations ar JOIN users u ON ar.user_id = u.id WHERE ar.activity_id = ? ORDER BY ar.registered_at'
  ).all(activityId) as ActivityRegistration[];
}

export function getUserRegistrations(userId: number): Activity[] {
  return db.prepare(
    'SELECT a.* FROM activities a JOIN activity_registrations ar ON a.id = ar.activity_id WHERE ar.user_id = ? ORDER BY a.start_time DESC'
  ).all(userId) as Activity[];
}
