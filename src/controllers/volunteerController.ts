import { Request, Response } from 'express';
import * as volunteerService from '../services/volunteerService';

export function schedule(req: Request, res: Response): void {
  const shifts = volunteerService.findAllShifts();
  const userShifts = req.session.userId
    ? volunteerService.getUserSignups(req.session.userId)
    : [];
  const signedUpIds = new Set(userShifts.map(s => s.id));
  res.render('volunteers/schedule', { shifts, signedUpIds });
}

export function showSignup(req: Request, res: Response): void {
  const id = parseInt(req.params.id);
  const shift = volunteerService.findShiftById(id);
  if (!shift) {
    res.redirect('/volunteers');
    return;
  }
  const signups = volunteerService.getShiftSignups(id);
  res.render('volunteers/signup', { shift, signups });
}

export function signup(req: Request, res: Response): void {
  const id = parseInt(req.params.id);
  const success = volunteerService.signup(id, req.session.userId!);
  res.redirect('/volunteers');
}

export function cancelSignup(req: Request, res: Response): void {
  const id = parseInt(req.params.id);
  volunteerService.cancelSignup(id, req.session.userId!);
  res.redirect('/volunteers');
}

export function createShift(req: Request, res: Response): void {
  const { title, description, location, shift_date, start_time, end_time, max_volunteers } = req.body;
  if (!title || !location || !shift_date || !start_time || !end_time) {
    res.redirect('/volunteers');
    return;
  }
  volunteerService.createShift({
    title,
    description,
    location,
    shift_date,
    start_time,
    end_time,
    max_volunteers: parseInt(max_volunteers) || 5,
  });
  res.redirect('/volunteers');
}
