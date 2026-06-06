import { Request, Response } from 'express';
import * as mealService from '../services/mealService';

export function list(req: Request, res: Response): void {
  const menuItems = mealService.getMenuItems();
  res.render('meals/list', { menuItems });
}

export function showOrder(req: Request, res: Response): void {
  const menuItems = mealService.getMenuItems();
  res.render('meals/order', { menuItems, error: null });
}

export function createOrder(req: Request, res: Response): void {
  const { meal_date, meal_type, menu_item } = req.body;
  if (!meal_date || !meal_type || !menu_item) {
    const menuItems = mealService.getMenuItems();
    res.render('meals/order', { menuItems, error: '请填写所有必填项' });
    return;
  }
  mealService.create({
    user_id: req.session.userId!,
    meal_date,
    meal_type,
    menu_item,
  });
  res.redirect('/meals/orders');
}

export function myOrders(req: Request, res: Response): void {
  const orders = mealService.findByUserId(req.session.userId!);
  res.render('meals/orders', { orders });
}

export function allOrders(req: Request, res: Response): void {
  const orders = mealService.findAll();
  res.render('meals/orders', { orders });
}

export function cancelOrder(req: Request, res: Response): void {
  const id = parseInt(req.params.id);
  mealService.cancelOrder(id, req.session.userId!);
  res.redirect('/meals/orders');
}

export function updateStatus(req: Request, res: Response): void {
  const id = parseInt(req.params.id);
  const { status } = req.body;
  mealService.updateStatus(id, status);
  res.redirect('/meals/orders');
}
