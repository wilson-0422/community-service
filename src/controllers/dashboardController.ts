import { Request, Response } from 'express';
import db from '../config/database';
import * as complaintService from '../services/complaintService';
import * as activityService from '../services/activityService';
import * as mealService from '../services/mealService';
import * as exchangeService from '../services/exchangeService';
import * as volunteerService from '../services/volunteerService';

export function overview(req: Request, res: Response): void {
  const activityCount = (db.prepare('SELECT COUNT(*) as count FROM activities').get() as any).count;
  const mealOrderCount = (db.prepare('SELECT COUNT(*) as count FROM meal_orders').get() as any).count;
  const exchangeItemCount = (db.prepare('SELECT COUNT(*) as count FROM exchange_items WHERE status = ?').get('available') as any).count;
  const volunteerShiftCount = (db.prepare('SELECT COUNT(*) as count FROM volunteer_shifts').get() as any).count;
  const complaintStats = complaintService.getStats();
  const userCount = (db.prepare('SELECT COUNT(*) as count FROM users').get() as any).count;

  const recentActivities = activityService.findAll().slice(0, 5);
  const recentComplaints = complaintService.findAll().slice(0, 5);

  res.render('dashboard/overview', {
    stats: {
      activityCount,
      mealOrderCount,
      exchangeItemCount,
      volunteerShiftCount,
      userCount,
      ...complaintStats,
    },
    recentActivities,
    recentComplaints,
  });
}
