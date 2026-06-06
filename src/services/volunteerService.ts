import db from '../config/database';
import { VolunteerShift, VolunteerSignup } from '../models/volunteerShift';

export function findAllShifts(): VolunteerShift[] {
  return db.prepare('SELECT * FROM volunteer_shifts ORDER BY shift_date DESC, start_time').all() as VolunteerShift[];
}

export function findShiftById(id: number): VolunteerShift | undefined {
  return db.prepare('SELECT * FROM volunteer_shifts WHERE id = ?').get(id) as VolunteerShift | undefined;
}

export function createShift(data: {
  title: string;
  description?: string;
  location: string;
  shift_date: string;
  start_time: string;
  end_time: string;
  max_volunteers: number;
}): VolunteerShift {
  const stmt = db.prepare(
    'INSERT INTO volunteer_shifts (title, description, location, shift_date, start_time, end_time, max_volunteers) VALUES (?, ?, ?, ?, ?, ?, ?)'
  );
  const result = stmt.run(
    data.title,
    data.description || null,
    data.location,
    data.shift_date,
    data.start_time,
    data.end_time,
    data.max_volunteers
  );
  return findShiftById(result.lastInsertRowid as number)!;
}

export function signup(shiftId: number, userId: number): boolean {
  const shift = findShiftById(shiftId);
  if (!shift || shift.status !== 'open') return false;
  if (shift.current_volunteers >= shift.max_volunteers) return false;

  const existing = db.prepare(
    'SELECT id FROM volunteer_signups WHERE shift_id = ? AND user_id = ?'
  ).get(shiftId, userId);
  if (existing) return false;

  const transaction = db.transaction(() => {
    db.prepare('INSERT INTO volunteer_signups (shift_id, user_id) VALUES (?, ?)').run(shiftId, userId);
    db.prepare('UPDATE volunteer_shifts SET current_volunteers = current_volunteers + 1 WHERE id = ?').run(shiftId);
    if (shift.current_volunteers + 1 >= shift.max_volunteers) {
      db.prepare('UPDATE volunteer_shifts SET status = ? WHERE id = ?').run('closed', shiftId);
    }
  });
  transaction();
  return true;
}

export function cancelSignup(shiftId: number, userId: number): boolean {
  const existing = db.prepare(
    'SELECT id FROM volunteer_signups WHERE shift_id = ? AND user_id = ?'
  ).get(shiftId, userId);
  if (!existing) return false;

  const transaction = db.transaction(() => {
    db.prepare('DELETE FROM volunteer_signups WHERE shift_id = ? AND user_id = ?').run(shiftId, userId);
    db.prepare('UPDATE volunteer_shifts SET current_volunteers = current_volunteers - 1 WHERE id = ?').run(shiftId);
    db.prepare('UPDATE volunteer_shifts SET status = ? WHERE id = ? AND status = ?').run('open', shiftId, 'closed');
  });
  transaction();
  return true;
}

export function getShiftSignups(shiftId: number): VolunteerSignup[] {
  return db.prepare(
    'SELECT vs.*, u.real_name FROM volunteer_signups vs JOIN users u ON vs.user_id = u.id WHERE vs.shift_id = ? ORDER BY vs.signed_up_at'
  ).all(shiftId) as VolunteerSignup[];
}

export function getUserSignups(userId: number): VolunteerShift[] {
  return db.prepare(
    'SELECT vs.* FROM volunteer_shifts vs JOIN volunteer_signups vsg ON vs.id = vsg.shift_id WHERE vsg.user_id = ? ORDER BY vs.shift_date DESC'
  ).all(userId) as VolunteerShift[];
}
