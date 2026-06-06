import express from 'express';
import session from 'express-session';
import path from 'path';
import { APP_CONFIG } from './config/app';
import { initDatabase } from './config/database';
import routes from './routes';

const app = express();

initDatabase();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '..', 'views'));

app.use(express.static(path.join(__dirname, '..', 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(session({
  secret: APP_CONFIG.sessionSecret,
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 24 * 60 * 60 * 1000 },
}));

app.use((req, res, next) => {
  res.locals.userId = req.session.userId || null;
  res.locals.username = req.session.username || null;
  res.locals.role = req.session.role || null;
  res.locals.realName = req.session.realName || null;
  next();
});

app.use('/', routes);

app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).render('index', { error: '服务器内部错误' });
});

const PORT = APP_CONFIG.port;
app.listen(PORT, () => {
  console.log(`社区邻里综合服务平台已启动：http://localhost:${PORT}`);
});

export default app;
