import { Request, Response } from 'express';
import * as complaintService from '../services/complaintService';

export function list(req: Request, res: Response): void {
  const complaints = req.session.role === 'admin'
    ? complaintService.findAll()
    : complaintService.findBySubmitterId(req.session.userId!);
  res.render('complaints/list', { complaints });
}

export function showCreate(req: Request, res: Response): void {
  res.render('complaints/create', { error: null });
}

export function create(req: Request, res: Response): void {
  const { title, content, category, priority } = req.body;
  if (!title || !content || !category) {
    res.render('complaints/create', { error: '请填写所有必填项' });
    return;
  }
  complaintService.create({
    title,
    content,
    category,
    priority: priority || 'normal',
    submitter_id: req.session.userId!,
  });
  res.redirect('/complaints');
}

export function detail(req: Request, res: Response): void {
  const id = parseInt(req.params.id);
  const complaint = complaintService.findById(id);
  if (!complaint) {
    res.status(404).render('index', { error: '诉求不存在' });
    return;
  }
  res.render('complaints/detail', { complaint });
}

export function updateStatus(req: Request, res: Response): void {
  const id = parseInt(req.params.id);
  const { status } = req.body;
  complaintService.updateStatus(id, status, req.session.userId!);
  res.redirect('/complaints/' + id);
}

export function reply(req: Request, res: Response): void {
  const id = parseInt(req.params.id);
  const { reply } = req.body;
  if (!reply) {
    res.redirect('/complaints/' + id);
    return;
  }
  complaintService.reply(id, reply, req.session.userId!);
  res.redirect('/complaints/' + id);
}
