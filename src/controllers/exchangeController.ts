import { Request, Response } from 'express';
import * as exchangeService from '../services/exchangeService';

export function list(req: Request, res: Response): void {
  const items = exchangeService.findAvailable();
  res.render('exchanges/list', { items });
}

export function showCreate(req: Request, res: Response): void {
  res.render('exchanges/create', { error: null });
}

export function create(req: Request, res: Response): void {
  const { title, description, category, condition_level, contact_info } = req.body;
  if (!title || !category) {
    res.render('exchanges/create', { error: '请填写所有必填项' });
    return;
  }
  exchangeService.create({
    title,
    description,
    category,
    condition_level: condition_level || 'good',
    owner_id: req.session.userId!,
    contact_info,
  });
  res.redirect('/exchanges');
}

export function detail(req: Request, res: Response): void {
  const id = parseInt(req.params.id);
  const item = exchangeService.findById(id);
  if (!item) {
    res.status(404).render('index', { error: '物品不存在' });
    return;
  }
  res.render('exchanges/detail', { item });
}

export function markExchanged(req: Request, res: Response): void {
  const id = parseInt(req.params.id);
  exchangeService.updateStatus(id, 'exchanged');
  res.redirect('/exchanges/' + id);
}

export function remove(req: Request, res: Response): void {
  const id = parseInt(req.params.id);
  exchangeService.updateStatus(id, 'removed');
  res.redirect('/exchanges');
}
