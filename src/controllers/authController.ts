import { Request, Response } from 'express';
import * as userService from '../services/userService';

export function showLogin(req: Request, res: Response): void {
  res.render('auth/login', { error: null });
}

export function login(req: Request, res: Response): void {
  const { username, password } = req.body;
  const user = userService.findByUsername(username);
  if (!user || !userService.verifyPassword(user, password)) {
    res.render('auth/login', { error: '用户名或密码错误' });
    return;
  }
  req.session.userId = user.id;
  req.session.username = user.username;
  req.session.role = user.role;
  req.session.realName = user.real_name;
  res.redirect('/');
}

export function showRegister(req: Request, res: Response): void {
  res.render('auth/register', { error: null });
}

export function register(req: Request, res: Response): void {
  const { username, password, confirm_password, real_name, phone, address } = req.body;
  if (password !== confirm_password) {
    res.render('auth/register', { error: '两次密码输入不一致' });
    return;
  }
  const existing = userService.findByUsername(username);
  if (existing) {
    res.render('auth/register', { error: '用户名已存在' });
    return;
  }
  const user = userService.createUser({ username, password, real_name, phone, address });
  req.session.userId = user.id;
  req.session.username = user.username;
  req.session.role = user.role;
  req.session.realName = user.real_name;
  res.redirect('/');
}

export function logout(req: Request, res: Response): void {
  req.session.destroy(() => {
    res.redirect('/auth/login');
  });
}
