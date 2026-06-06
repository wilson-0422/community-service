import Database from 'better-sqlite3';
import path from 'path';
import fs from 'fs';
import { APP_CONFIG } from './app';

const dbDir = path.dirname(APP_CONFIG.dbPath);
if (!fs.existsSync(dbDir)) {
  fs.mkdirSync(dbDir, { recursive: true });
}

const db = new Database(APP_CONFIG.dbPath);

db.pragma('journal_mode = WAL');
db.pragma('foreign_keys = ON');

export function initDatabase(): void {
  db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT NOT NULL UNIQUE,
      password TEXT NOT NULL,
      real_name TEXT NOT NULL,
      role TEXT NOT NULL DEFAULT 'resident',
      phone TEXT,
      address TEXT,
      created_at TEXT DEFAULT (datetime('now', 'localtime'))
    );

    CREATE TABLE IF NOT EXISTS activities (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      description TEXT,
      location TEXT NOT NULL,
      start_time TEXT NOT NULL,
      end_time TEXT NOT NULL,
      max_participants INTEGER NOT NULL DEFAULT 50,
      current_participants INTEGER NOT NULL DEFAULT 0,
      status TEXT NOT NULL DEFAULT 'open',
      created_by INTEGER NOT NULL,
      created_at TEXT DEFAULT (datetime('now', 'localtime')),
      FOREIGN KEY (created_by) REFERENCES users(id)
    );

    CREATE TABLE IF NOT EXISTS activity_registrations (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      activity_id INTEGER NOT NULL,
      user_id INTEGER NOT NULL,
      registered_at TEXT DEFAULT (datetime('now', 'localtime')),
      FOREIGN KEY (activity_id) REFERENCES activities(id),
      FOREIGN KEY (user_id) REFERENCES users(id),
      UNIQUE(activity_id, user_id)
    );

    CREATE TABLE IF NOT EXISTS meal_orders (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL,
      meal_date TEXT NOT NULL,
      meal_type TEXT NOT NULL,
      menu_item TEXT NOT NULL,
      status TEXT NOT NULL DEFAULT 'pending',
      created_at TEXT DEFAULT (datetime('now', 'localtime')),
      FOREIGN KEY (user_id) REFERENCES users(id)
    );

    CREATE TABLE IF NOT EXISTS exchange_items (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      description TEXT,
      category TEXT NOT NULL,
      condition_level TEXT NOT NULL DEFAULT 'good',
      owner_id INTEGER NOT NULL,
      contact_info TEXT,
      status TEXT NOT NULL DEFAULT 'available',
      image_url TEXT,
      created_at TEXT DEFAULT (datetime('now', 'localtime')),
      FOREIGN KEY (owner_id) REFERENCES users(id)
    );

    CREATE TABLE IF NOT EXISTS volunteer_shifts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      description TEXT,
      location TEXT NOT NULL,
      shift_date TEXT NOT NULL,
      start_time TEXT NOT NULL,
      end_time TEXT NOT NULL,
      max_volunteers INTEGER NOT NULL DEFAULT 5,
      current_volunteers INTEGER NOT NULL DEFAULT 0,
      status TEXT NOT NULL DEFAULT 'open',
      created_at TEXT DEFAULT (datetime('now', 'localtime'))
    );

    CREATE TABLE IF NOT EXISTS volunteer_signups (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      shift_id INTEGER NOT NULL,
      user_id INTEGER NOT NULL,
      signed_up_at TEXT DEFAULT (datetime('now', 'localtime')),
      FOREIGN KEY (shift_id) REFERENCES volunteer_shifts(id),
      FOREIGN KEY (user_id) REFERENCES users(id),
      UNIQUE(shift_id, user_id)
    );

    CREATE TABLE IF NOT EXISTS complaints (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      content TEXT NOT NULL,
      category TEXT NOT NULL,
      priority TEXT NOT NULL DEFAULT 'normal',
      status TEXT NOT NULL DEFAULT 'pending',
      submitter_id INTEGER NOT NULL,
      handler_id INTEGER,
      reply TEXT,
      created_at TEXT DEFAULT (datetime('now', 'localtime')),
      updated_at TEXT DEFAULT (datetime('now', 'localtime')),
      FOREIGN KEY (submitter_id) REFERENCES users(id),
      FOREIGN KEY (handler_id) REFERENCES users(id)
    );
  `);
}

export default db;
