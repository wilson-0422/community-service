import { Request, Response } from 'express';
import * as activityService from '../services/activityService';

export function list(req: Request, res: Response): void {
  const activities = activityService.findAll();
  const userActivities = req.session.userId
    ? activityService.getUserRegistrations(req.session.userId)
    : [];
  const registeredIds = new Set(userActivities.map(a => a.id));
  res.render('activities/list', { activities, registeredIds });
}

export function detail(req: Request, res: Response): void {
  const id = parseInt(req.params.id);
  const activity = activityService.findById(id);
  if (!activity) {
    res.status(404).render('index', { error: '活动不存在' });
    return;
  }
  const registrations = activityService.getRegistrations(id);
  const isRegistered = req.session.userId
    ? registrations.some((r: any) => r.user_id === req.session.userId)
    : false;
  res.render('activities/detail', { activity, registrations, isRegistered });
}

export function showCreate(req: Request, res: Response): void {
  res.render('activities/create', { error: null });
}

export function create(req: Request, res: Response): void {
  const { title, description, location, start_time, end_time, max_participants } = req.body;
  if (!title || !location || !start_time || !end_time) {
    res.render('activities/create', { error: '请填写所有必填项' });
    return;
  }
  activityService.create({
    title,
    description,
    location,
    start_time,
    end_time,
    max_participants: parseInt(max_participants) || 50,
    created_by: req.session.userId!,
  });
  res.redirect('/activities');
}

export function registerActivity(req: Request, res: Response): void {
  const id = parseInt(req.params.id);
  const success = activityService.register(id, req.session.userId!);
  if (!success) {
    res.redirect('/activities/' + id);
    return;
  }
  res.redirect('/activities/' + id);
}

export function cancelRegistration(req: Request, res: Response): void {
  const id = parseInt(req.params.id);
  activityService.cancelRegistration(id, req.session.userId!);
  res.redirect('/activities/' + id);
}
