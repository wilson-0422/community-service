export const APP_CONFIG = {
  port: process.env.PORT || 3000,
  sessionSecret: process.env.SESSION_SECRET || 'community-service-secret-key-2024',
  dbPath: process.env.DB_PATH || './data/community.db',
};
