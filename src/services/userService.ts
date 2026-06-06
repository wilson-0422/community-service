import bcrypt from 'bcryptjs';
import db from '../config/database';
import { User } from '../models/user';

export function findByUsername(username: string): User | undefined {
  return db.prepare('SELECT * FROM users WHERE username = ?').get(username) as User | undefined;
}

export function findById(id: number): User | undefined {
  return db.prepare('SELECT * FROM users WHERE id = ?').get(id) as User | undefined;
}

export function createUser(data: {
  username: string;
  password: string;
  real_name: string;
  role?: string;
  phone?: string;
  address?: string;
}): User {
  const hashed = bcrypt.hashSync(data.password, 10);
  const stmt = db.prepare(
    'INSERT INTO users (username, password, real_name, role, phone, address) VALUES (?, ?, ?, ?, ?, ?)'
  );
  const result = stmt.run(
    data.username,
    hashed,
    data.real_name,
    data.role || 'resident',
    data.phone || null,
    data.address || null
  );
  return findById(result.lastInsertRowid as number)!;
}

export function verifyPassword(user: User, password: string): boolean {
  return bcrypt.compareSync(password, user.password);
}

export function findAll(): User[] {
  return db.prepare('SELECT * FROM users ORDER BY created_at DESC').all() as User[];
}
